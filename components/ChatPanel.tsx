"use client";

import { useEffect, useRef, useState } from "react";
import { SparkIcon } from "./icons";

interface Msg {
  role: "user" | "assistant";
  text: string;
}

const GREETING: Msg = {
  role: "assistant",
  text: "Hi Elkan 👋 I'm Trace. I can see every artifact across your products — ask me what's drifted out of sync, who owns what, or what needs you next.",
};

const SUGGESTIONS = [
  "What's blocking Shop from launching?",
  "Summarize the open conflicts",
  "Who owns the live gift leaderboard?",
];

// Lightweight canned responses so the interface is demoable without a model backend.
function cannedReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("shop") || q.includes("block") || q.includes("launch") || q.includes("age")) {
    return "Shop has 1 high-severity blocker: Legal's Age & Restricted Goods review requires verified-age checkout, but neither `PaymentIntent.ts` nor the Figma checkout flow has an age gate. There's also a medium issue — refund terms aren't surfaced at checkout, which Seller Compliance requires. I'd get Raj to add the age gate and Devon to add refund terms before launch.";
  }
  if (q.includes("conflict")) {
    return "There are 5 open conflicts across your products:\n• High — Checkout skips age verification (Shop)\n• High — Leaderboard events not emitted (Live Gifts)\n• Medium — Refund terms not at checkout (Shop)\n• Medium — Android drops combo gift animations (Live Gifts)\n• Low — Voice notes specced but not designed (DM 2.0)";
  }
  if (q.includes("who") || q.includes("own") || q.includes("leaderboard") || q.includes("gift")) {
    return "The live top-gifter leaderboard sits with Marcus Liu — his `GiftStream.ts` streams individual gift events but doesn't emit the aggregated leaderboard updates the PRD (Hannah Weiss) requires. Devon Clarke already designed the overlay, so it's blocked on the backend, not design.";
  }
  return "Based on the artifacts across this product's surfaces, the biggest risk right now is the age-verification gap on Shop (Legal vs. Engineering & Design). Want me to draft a message to the owner, or summarize a specific surface?";
}

export function ChatPanel({
  open,
  onOpen,
  onClose,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: cannedReply(trimmed) }]);
      setTyping(false);
    }, 700);
  }

  if (!open) {
    return (
      <button
        onClick={onOpen}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white shadow-lift transition-transform hover:scale-105"
      >
        <SparkIcon className="h-4 w-4" />
        Ask Trace
      </button>
    );
  }

  return (
    <aside className="flex h-full w-[360px] flex-shrink-0 flex-col border-l border-white/50 bg-white/40 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-3.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-white">
          <SparkIcon className="h-4 w-4" />
        </div>
        <div className="flex-1 leading-tight">
          <div className="text-sm font-semibold text-ink">Trace Agent</div>
          <div className="text-[11px] text-subtle">Context across every surface</div>
        </div>
        <button
          onClick={onClose}
          title="Collapse panel"
          className="rounded-md p-1 text-subtle hover:bg-ink/[0.04] hover:text-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-md bg-ink text-white"
                  : "rounded-bl-md bg-canvas text-ink"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl rounded-bl-md bg-canvas px-3.5 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-subtle/60"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="space-y-1.5 pt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="block w-full rounded-lg border border-line bg-white px-3 py-2 text-left text-[12.5px] text-ink transition-colors hover:border-brand-300 hover:bg-brand-50/40"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-line p-3"
      >
        <div className="flex items-end gap-2 rounded-xl border border-line bg-canvas px-3 py-2 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this product…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-subtle/60"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-white disabled:opacity-30"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </form>
    </aside>
  );
}
