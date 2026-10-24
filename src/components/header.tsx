"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Heart, User } from "lucide-react";
import { Logo } from "@/components/logo";
import { AddressBar } from "@/components/address-bar";
import { useCart } from "@/lib/cart-store";
import { useHydrated } from "@/lib/use-hydrated";
import clsx from "clsx";

const desktopNav = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/search", label: "Restoranlar" },
  { href: "/favorites", label: "Sevimlilar" },
  { href: "/orders", label: "Buyurtmalarim" },
];

export function Header() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const count = useCart((s) => s.itemCount());
  const showCount = hydrated && count > 0;

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-2 px-3 md:hidden">
        <Logo showText />
        <div className="flex items-center gap-0.5">
          <Link
            href="/profile"
            className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100"
            aria-label="Profil"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full p-2 text-neutral-600 hover:bg-neutral-100"
            aria-label="Savat"
          >
            <ShoppingBag className="h-5 w-5" />
            {showCount && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-paprika px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="mx-auto hidden h-14 max-w-6xl items-center gap-6 px-4 md:flex">
        <Logo />
        <div className="min-w-0 shrink">
          <AddressBar compact />
        </div>
        <nav className="ml-auto flex items-center gap-1" aria-label="Asosiy">
          {desktopNav.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                  active
                    ? "bg-paprika/10 text-paprika"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100"
            aria-label="Qidiruv"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/favorites"
            className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100"
            aria-label="Sevimlilar"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <Link
            href="/profile"
            className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100"
            aria-label="Profil"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="relative ml-1 flex items-center gap-2 rounded-full bg-paprika px-3 py-1.5 text-sm font-semibold text-white hover:bg-paprika-600"
          >
            <ShoppingBag className="h-4 w-4" />
            Savat
            {showCount && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/25 px-1 text-xs">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
