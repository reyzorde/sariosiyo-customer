"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatSom } from "@/lib/money";
import { useHydrated } from "@/lib/use-hydrated";

export function CartBar() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const count = useCart((s) => s.itemCount());
  const subtotal = useCart((s) => s.subtotalTiyin());

  if (!hydrated || count === 0) return null;
  if (pathname.startsWith("/cart") || pathname.startsWith("/checkout")) {
    return null;
  }

  return (
    <div className="fixed bottom-[3.5rem] left-0 right-0 z-40 px-3 pb-[env(safe-area-inset-bottom)] md:bottom-4 md:left-auto md:right-4 md:w-auto md:max-w-sm md:px-0">
      <Link
        href="/cart"
        className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-2xl bg-paprika px-4 py-3 text-white shadow-elevated transition active:scale-[0.98] md:mx-0"
      >
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
            {count}
          </span>
          <span className="text-sm font-semibold">Savat</span>
        </span>
        <span className="flex items-center gap-2 text-sm font-bold">
          {formatSom(subtotal)}
          <ShoppingBag className="h-4 w-4 opacity-90" aria-hidden />
        </span>
      </Link>
    </div>
  );
}
