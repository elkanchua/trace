"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ChatPanel } from "./ChatPanel";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar collapsed={leftCollapsed} onToggle={() => setLeftCollapsed((v) => !v)} />
      <main className="relative flex-1 overflow-y-auto">{children}</main>
      <ChatPanel
        open={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
      />
    </div>
  );
}
