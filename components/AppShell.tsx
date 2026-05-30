"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ChatPanel } from "./ChatPanel";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="h-screen w-screen p-2.5 sm:p-4">
      <div className="flex h-full overflow-hidden rounded-[26px] border border-white/60 bg-white/55 shadow-glass backdrop-blur-2xl">
        <Sidebar collapsed={leftCollapsed} onToggle={() => setLeftCollapsed((v) => !v)} />
        <main className="relative flex-1 overflow-y-auto">{children}</main>
        <ChatPanel
          open={chatOpen}
          onOpen={() => setChatOpen(true)}
          onClose={() => setChatOpen(false)}
        />
      </div>
    </div>
  );
}
