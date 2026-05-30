"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileTypeIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui";

const BUILD_STEPS = [
  "Reading Notion PRD",
  "Creating ERD",
  "Creating design file",
  "Creating GitHub workspace",
  "Updating knowledge base",
];

const STARTER_ARTIFACTS = [
  { label: "Notion PRD", type: "notion" as const, detail: "Linked source document" },
  { label: "ERD draft", type: "pdf" as const, detail: "Data model generated from the PRD" },
  { label: "GitHub repo", type: "github" as const, detail: "Empty starter workspace" },
  { label: "Figma file", type: "figma" as const, detail: "Empty starter design file" },
];

function buildNotionUrl(productName: string) {
  const title = encodeURIComponent(`${productName || "Untitled Product"} PRD`);
  return `https://www.notion.so/new?title=${title}`;
}

export default function NewProductPage() {
  const router = useRouter();
  const [productName, setProductName] = useState("Nova Portal - Vendor Onboarding");
  const [notionUrl, setNotionUrl] = useState("");
  const [stage, setStage] = useState<"setup" | "creating">("setup");
  const [activeStep, setActiveStep] = useState(0);

  const trimmedName = productName.trim();
  const generatedNotionUrl = useMemo(() => buildNotionUrl(trimmedName), [trimmedName]);
  const prdLinked = Boolean(notionUrl);

  useEffect(() => {
    if (stage !== "creating") return;

    const timer = window.setInterval(() => {
      setActiveStep((current) => {
        if (current >= BUILD_STEPS.length - 1) {
          window.clearInterval(timer);
          const params = new URLSearchParams({
            name: trimmedName || "Untitled Product",
            notion: notionUrl || generatedNotionUrl,
          });

          window.setTimeout(() => {
            router.push(`/products/generated-product?${params.toString()}`);
          }, 650);

          return current;
        }

        return current + 1;
      });
    }, 700);

    return () => window.clearInterval(timer);
  }, [generatedNotionUrl, notionUrl, router, stage, trimmedName]);

  const generateNotionPrd = () => {
    // Mark the PRD as generated without opening a Notion tab.
    setNotionUrl(generatedNotionUrl);
  };

  const createProduct = () => {
    setActiveStep(0);
    setStage("creating");
  };

  if (stage === "creating") {
    return (
      <div className="mx-auto max-w-[980px] px-8 py-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-xs font-medium text-subtle hover:text-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
            <path d="m14 7-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Products
        </Link>

        <div className="mt-3">
          <PageHeader
            title="Creating product workspace"
            subtitle={trimmedName || "Untitled Product"}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-2xl border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
              <div>
                <h2 className="text-sm font-semibold text-ink">Workspace generation</h2>
                <p className="mt-1 text-xs text-subtle">Trace is turning the PRD into connected product artifacts.</p>
              </div>
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">
                In progress
              </span>
            </div>

            <ol className="mt-5 space-y-3">
              {BUILD_STEPS.map((step, index) => {
                const complete = index < activeStep;
                const current = index === activeStep;

                return (
                  <li key={step} className="flex min-h-12 items-center gap-3">
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        complete
                          ? "bg-emerald-500 text-white"
                          : current
                            ? "bg-ink text-white"
                            : "bg-canvas text-subtle ring-1 ring-inset ring-line"
                      }`}
                    >
                      {complete ? (
                        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                          <path d="m6 12.4 3.5 3.4L18 7.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium ${current || complete ? "text-ink" : "text-subtle"}`}>{step}</p>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${complete ? "w-full bg-emerald-500" : current ? "w-2/3 bg-brand-500 shimmer" : "w-0 bg-brand-500"}`}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <aside className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <h2 className="text-sm font-semibold text-ink">Artifacts being added</h2>
            <div className="mt-4 space-y-3">
              {STARTER_ARTIFACTS.map((artifact) => (
                <div key={artifact.label} className="flex items-start gap-3 rounded-xl border border-line bg-canvas/50 p-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-line bg-white">
                    <FileTypeIcon type={artifact.type} className="h-5 w-5 text-ink" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{artifact.label}</p>
                    <p className="mt-0.5 text-xs text-subtle">{artifact.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[980px] px-8 py-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-xs font-medium text-subtle hover:text-ink"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path d="m14 7-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Products
      </Link>

      <div className="mt-3">
        <PageHeader
          title="Create a new product"
          subtitle="Start with a Notion PRD, then let Trace assemble the product workspace."
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-2xl border border-line bg-white p-6 shadow-card">
          <div>
            <label htmlFor="productName" className="text-sm font-medium text-ink">
              Product name
            </label>
            <input
              id="productName"
              value={productName}
              onChange={(event) => {
                setProductName(event.target.value);
                setNotionUrl("");
              }}
              placeholder="e.g. Atlas Mobile - Offline Mode"
              className="mt-1.5 w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm outline-none placeholder:text-subtle/60 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="mt-5 rounded-xl border border-line bg-canvas/60 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-line bg-white">
                <FileTypeIcon type="notion" className="h-5 w-5 text-ink" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-semibold text-ink">Notion PRD</h2>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
                      prdLinked ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-slate-100 text-slate-600 ring-slate-200"
                    }`}
                  >
                    {prdLinked ? "Linked" : "Required"}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-subtle">
                  Create the PRD in Notion first, then return here to generate the rest of the workspace.
                </p>

                {prdLinked && (
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 flex-shrink-0">
                      <path d="m6 12.4 3.5 3.4L18 7.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    PRD generated
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={generateNotionPrd}
                disabled={prdLinked}
                className="rounded-lg border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:bg-canvas disabled:cursor-default disabled:opacity-60"
              >
                {prdLinked ? "PRD generated" : "Generate Notion PRD"}
              </button>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Connected tools</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {["Notion", "GitHub", "Figma", "Slack"].map((tool) => (
                <span key={tool} className="rounded-lg border border-line bg-canvas px-3 py-2 text-center text-xs font-medium text-ink">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <Link href="/products" className="rounded-lg px-4 py-2 text-sm font-medium text-subtle hover:text-ink">
              Cancel
            </Link>
            <button
              type="button"
              onClick={createProduct}
              disabled={!prdLinked}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Create product
            </button>
          </div>
        </section>

        <aside className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <h2 className="text-sm font-semibold text-ink">Workspace preview</h2>
          <p className="mt-1 text-xs leading-relaxed text-subtle">
            Trace will create the starter knowledge base from the PRD and connect the expected product, engineering, and design files.
          </p>

          <div className="mt-4 space-y-3">
            {STARTER_ARTIFACTS.map((artifact) => (
              <div key={artifact.label} className="flex items-center gap-3 rounded-xl border border-line bg-canvas/50 p-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-line bg-white">
                  <FileTypeIcon type={artifact.type} className="h-5 w-5 text-ink" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{artifact.label}</p>
                  <p className="truncate text-xs text-subtle">{artifact.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
