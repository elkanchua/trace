"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { products, currentUser } from "@/lib/data";
import { SparkIcon, NavIcon } from "./icons";
import { Avatar } from "./ui";

export function Sidebar() {
  const pathname = usePathname();
  const onProducts = pathname.startsWith("/products");
  const [expanded, setExpanded] = useState(onProducts);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navClass = (active: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active ? "bg-ink/[0.05] text-ink" : "text-subtle hover:bg-ink/[0.03] hover:text-ink"
    }`;

  return (
    <aside className="flex h-full w-60 flex-shrink-0 flex-col border-r border-line bg-white">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-white">
          <SparkIcon className="h-4 w-4" />
        </div>
        <span className="text-[15px] font-semibold tracking-tight">Trace</span>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
        <Link href="/" className={navClass(isActive("/"))}>
          <NavIcon name="role" />
          <span className="flex-1">My Role</span>
        </Link>

        {/* Products — expandable, with the product breakdown nested */}
        <div>
          <div className={navClass(pathname === "/products")}>
            <NavIcon name="products" />
            <Link href="/products" className="flex-1">
              Products
            </Link>
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? "Collapse" : "Expand"}
              className="-mr-1 rounded p-0.5 text-subtle hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`}
              >
                <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {expanded && (
            <div className="mb-1 ml-4 mt-0.5 space-y-0.5 border-l border-line pl-3">
              {products.map((p) => {
                const active = pathname === `/products/${p.id}`;
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors ${
                      active ? "bg-ink/[0.05] text-ink" : "text-subtle hover:bg-ink/[0.03] hover:text-ink"
                    }`}
                  >
                    <span className="flex-1 truncate">{p.name.split(" — ")[0]}</span>
                    {p.conflicts > 0 && (
                      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-100 px-1 text-[10px] font-semibold text-rose-700">
                        {p.conflicts}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <Link href="/activity" className={navClass(isActive("/activity"))}>
          <NavIcon name="activity" />
          <span className="flex-1">Activity</span>
        </Link>

        <Link href="/integrations" className={navClass(isActive("/integrations"))}>
          <NavIcon name="integrations" />
          <span className="flex-1">Integrations</span>
        </Link>
      </nav>

      {/* Bottom: Settings + user */}
      <div className="space-y-1 border-t border-line px-3 py-3">
        <Link href="/settings" className={navClass(isActive("/settings"))}>
          <NavIcon name="settings" />
          <span className="flex-1">Settings</span>
        </Link>
        <div className="flex items-center gap-2.5 px-2 pt-1">
          <Avatar name={currentUser.name} color="bg-brand-600" />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-medium text-ink">{currentUser.name}</div>
            <div className="text-xs text-subtle">{currentUser.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
