import { NextResponse } from "next/server";
import { getProduct } from "@/lib/data";
import { runTraeAgent, TraeAgentError } from "@/lib/trae/runAgent";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set in the environment." },
      { status: 500 }
    );
  }

  let productId: string | undefined;
  try {
    const body = await req.json();
    productId = body?.productId;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!productId) {
    return NextResponse.json({ error: "Missing productId." }, { status: 400 });
  }

  const product = getProduct(productId);
  if (!product) {
    return NextResponse.json({ error: "Unknown productId." }, { status: 404 });
  }

  // Trae Agent (ByteDance's open-source SWE agent) is the orchestrator: it gets
  // the product's artifacts staged as files and autonomously reads + reasons over
  // them, then writes the gaps JSON we return.
  try {
    const result = await runTraeAgent(product, apiKey);
    return NextResponse.json({
      gaps: result.gaps,
      orchestrator: "trae-agent",
      meta: { steps: result.steps, durationMs: result.durationMs },
    });
  } catch (err) {
    if (err instanceof TraeAgentError) {
      return NextResponse.json(
        { error: err.message, detail: err.detail },
        { status: 502 }
      );
    }
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
