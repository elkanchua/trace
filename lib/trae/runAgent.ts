import { spawn } from "node:child_process";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { Product } from "@/lib/data";

// Where Trae Agent lives. Defaults to the sibling clone created during setup,
// overridable via env for other machines / deployments.
const TRAE_AGENT_DIR =
  process.env.TRAE_AGENT_DIR ??
  path.join(process.cwd(), "..", "trae-agent");

const TRAE_CLI =
  process.env.TRAE_CLI_PATH ??
  path.join(TRAE_AGENT_DIR, ".venv", "bin", "trae-cli");

const CONFIG_FILE =
  process.env.TRAE_CONFIG_FILE ??
  path.join(process.cwd(), "lib", "trae", "config.yaml");

const MODEL = "claude-sonnet-4-20250514";
const RUN_TIMEOUT_MS = Number(process.env.TRAE_TIMEOUT_MS ?? 180_000);

export interface TraeResult {
  gaps: unknown[];
  steps: number;
  durationMs: number;
}

export class TraeAgentError extends Error {
  constructor(message: string, public detail?: string) {
    super(message);
    this.name = "TraeAgentError";
  }
}

function safeName(name: string): string {
  return name.replace(/[\/\\]/g, "-").replace(/\s+/g, "_");
}

// Lay the product's artifacts out as real files so the agent can explore them
// with its own tools, plus a TASK describing the deliverable.
async function stageWorkspace(product: Product): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), `trae-${product.id}-`));
  const artifactsDir = path.join(dir, "artifacts");
  await writeFile(path.join(dir, ".keep"), "");

  const { mkdir } = await import("node:fs/promises");
  await mkdir(artifactsDir, { recursive: true });

  const index: string[] = [];
  for (const file of product.files) {
    const fname = safeName(file.name);
    const header = `<!-- type: ${file.type} | owner: ${file.owner} -->\n`;
    await writeFile(path.join(artifactsDir, fname), header + file.content, "utf8");
    index.push(`- artifacts/${fname}  (type: ${file.type}, owner: ${file.owner})`);
  }

  const task = `You are a PM's context agent embedded in a product workspace. You can see all artifacts (PRDs, Figma specs, code, Slack) for one product, authored by different people in different tools.

Product: ${product.name} (status: ${product.status})

The artifacts are real files in the ./artifacts directory of your working directory:
${index.join("\n")}

Steps:
1. Read every file in ./artifacts.
2. Find places where intent and implementation have diverged across surfaces, or where context is missing for one team but present for another.
3. Write your findings to a file named gaps.json in the working directory (NOT inside artifacts/). The file must contain ONLY a JSON object, no prose, no markdown fences, in exactly this shape:
{ "gaps": [ { "severity": "High|Medium|Low", "surfaces_involved": ["file or surface names"], "the_gap": "what diverged and why it matters", "who_to_ask": "person best placed to resolve it", "drafted_message": "a short concrete message the PM could send that person" } ] }
4. Verify gaps.json is valid JSON, then call task_done.

Return nothing else; the gaps.json file is the deliverable.`;

  await writeFile(path.join(dir, "TASK.txt"), task, "utf8");
  return dir;
}

export async function isInstalled(): Promise<boolean> {
  try {
    const { access } = await import("node:fs/promises");
    await access(TRAE_CLI);
    return true;
  } catch {
    return false;
  }
}

export async function runTraeAgent(
  product: Product,
  apiKey: string
): Promise<TraeResult> {
  if (!(await isInstalled())) {
    throw new TraeAgentError(
      "Trae Agent is not installed.",
      `Expected the trae-cli at ${TRAE_CLI}. Clone bytedance/trae-agent and run \`uv sync\`, or set TRAE_CLI_PATH.`
    );
  }

  const dir = await stageWorkspace(product);
  const trajectory = path.join(dir, "trajectory.json");
  const started = Date.now();

  const args = [
    "run",
    "-f",
    path.join(dir, "TASK.txt"),
    "-p",
    "anthropic",
    "-m",
    MODEL,
    "-w",
    dir,
    "--config-file",
    CONFIG_FILE,
    "-ct",
    "simple",
    "-t",
    trajectory,
  ];

  try {
    const { stdout, stderr, code } = await execTrae(args, apiKey);

    let gaps: unknown[] | null = null;
    try {
      const raw = await readFile(path.join(dir, "gaps.json"), "utf8");
      gaps = parseGaps(raw);
    } catch {
      // Fall back to scraping the JSON out of stdout if the file wasn't written.
      gaps = parseGaps(stdout);
    }

    if (!gaps) {
      throw new TraeAgentError(
        "Trae Agent finished but produced no valid gaps JSON.",
        (stderr || stdout || `exit code ${code}`).slice(-1500)
      );
    }

    const steps = countSteps(stdout);
    return { gaps, steps, durationMs: Date.now() - started };
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

function execTrae(
  args: string[],
  apiKey: string
): Promise<{ stdout: string; stderr: string; code: number | null }> {
  return new Promise((resolve, reject) => {
    const child = spawn(TRAE_CLI, args, {
      cwd: TRAE_AGENT_DIR,
      env: {
        ...process.env,
        ANTHROPIC_API_KEY: apiKey,
        // Keep the agent non-interactive and quiet about telemetry/color.
        NO_COLOR: "1",
        PYTHONUNBUFFERED: "1",
      },
    });

    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(
        new TraeAgentError(
          `Trae Agent timed out after ${RUN_TIMEOUT_MS / 1000}s.`,
          stderr.slice(-1000)
        )
      );
    }, RUN_TIMEOUT_MS);

    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));
    child.on("error", (err) => {
      clearTimeout(timer);
      reject(new TraeAgentError("Failed to launch Trae Agent.", String(err)));
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ stdout, stderr, code });
    });
  });
}

function parseGaps(text: string): unknown[] | null {
  if (!text) return null;
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  const tryParse = (s: string): unknown[] | null => {
    try {
      const obj = JSON.parse(s);
      if (Array.isArray(obj?.gaps)) return obj.gaps;
      if (Array.isArray(obj)) return obj;
      return null;
    } catch {
      return null;
    }
  };

  const direct = tryParse(cleaned);
  if (direct) return direct;

  // Find the last balanced {...} that contains "gaps".
  const idx = cleaned.lastIndexOf('"gaps"');
  if (idx !== -1) {
    const start = cleaned.lastIndexOf("{", idx);
    const end = cleaned.indexOf("}", cleaned.lastIndexOf("]")) + 1;
    if (start !== -1 && end > start) {
      const sliced = tryParse(cleaned.slice(start, end));
      if (sliced) return sliced;
    }
  }
  return null;
}

function countSteps(stdout: string): number {
  const matches = stdout.match(/step\s+\d+/gi);
  if (!matches) return 0;
  const nums = matches
    .map((m) => parseInt(m.replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  return nums.length ? Math.max(...nums) : 0;
}
