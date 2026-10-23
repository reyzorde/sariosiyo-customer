"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ClipboardList, User } from "lucide-react";
import clsx from "clsx";

const items = [
  { href: "/", label: "Bosh", icon: Home },
  { href: "/search", label: "Qidiruv", icon: Search },
  { href: "/orders", label: "Buyurtmalar", icon: ClipboardList },
  { href: "/profile", label: "Profil", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="Asosiy navigatsiya"
    >
      <div className="mx-auto flex h-14 max-w-lg items-stretch justify-around">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex min-w-[64px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition",
                active ? "text-paprika" : "text-neutral-500 hover:text-ink"
              )}
            >
              <Icon
                className={clsx("h-5 w-5", active && "stroke-[2.25]")}
                aria-hidden
              />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
