"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { products, currentUser, ROLE_LABEL } from "@/lib/data";
import { NavIcon } from "./icons";
import { Avatar } from "./ui";

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // ---- Collapsed: icon rail ----
  if (collapsed) {
    const items = [
      { href: "/", icon: "role" as const },
      { href: "/products", icon: "products" as const },
      { href: "/integrations", icon: "integrations" as const },
    ];
    return (
      <aside className="flex h-full w-[60px] flex-shrink-0 flex-col items-center border-r border-white/50 bg-white/30 py-4 backdrop-blur-xl">
        <button
          onClick={onToggle}
          title="Expand sidebar"
          className="h-8 w-8 overflow-hidden rounded-lg"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/trace-logo.jpeg" alt="Trace" className="h-full w-full object-cover" />
        </button>
        <nav className="mt-4 flex flex-1 flex-col items-center gap-1">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              title={it.icon}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                isActive(it.href) ? "bg-ink/[0.06] text-ink" : "text-subtle hover:bg-ink/[0.03] hover:text-ink"
              }`}
            >
              <NavIcon name={it.icon} />
            </Link>
          ))}
        </nav>
        <Link
          href="/settings"
          title="Settings"
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            isActive("/settings") ? "bg-ink/[0.06] text-ink" : "text-subtle hover:bg-ink/[0.03] hover:text-ink"
          }`}
        >
          <NavIcon name="settings" />
        </Link>
        <div className="mt-2">
          <Avatar name={currentUser.name} color="bg-brand-600" />
        </div>
      </aside>
    );
  }

  // ---- Expanded ----
  const navClass = (active: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active ? "bg-ink/[0.05] text-ink" : "text-subtle hover:bg-ink/[0.03] hover:text-ink"
    }`;

  return (
    <aside className="flex h-full w-60 flex-shrink-0 flex-col border-r border-white/50 bg-white/30 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 px-5 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/trace-logo.jpeg" alt="Trace" className="h-7 w-7 rounded-lg object-cover" />
        <span className="flex-1 text-[15px] font-semibold tracking-tight">Trace</span>
        <button
          onClick={onToggle}
          title="Collapse sidebar"
          className="-mr-1 rounded-md p-1 text-subtle hover:bg-ink/[0.04] hover:text-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <line x1="9" y1="4" x2="9" y2="20" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
        <Link href="/" className={navClass(isActive("/"))}>
          <NavIcon name="role" />
          <span className="flex-1">My Role</span>
        </Link>

        <div>
          <Link href="/products" className={navClass(pathname === "/products")}>
            <NavIcon name="products" />
            <span className="flex-1">Products</span>
          </Link>

          {/* Product list — always open */}
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
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d94e2b]/15 px-1 text-[10px] font-semibold text-[#b23a1c]">
                      {p.conflicts}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <Link href="/integrations" className={navClass(isActive("/integrations"))}>
          <NavIcon name="integrations" />
          <span className="flex-1">Integrations</span>
        </Link>
      </nav>

      <div className="space-y-1 border-t border-line px-3 py-3">
        <Link href="/settings" className={navClass(isActive("/settings"))}>
          <NavIcon name="settings" />
          <span className="flex-1">Settings</span>
        </Link>
        <div className="flex items-center gap-2.5 px-2 pt-1">
          <Avatar name={currentUser.name} color="bg-brand-600" />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-medium text-ink">{currentUser.name}</div>
            <div className="text-xs text-subtle">{ROLE_LABEL[currentUser.role]}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
