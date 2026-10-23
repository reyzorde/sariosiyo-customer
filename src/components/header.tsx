"use client";

import Link from "next/link";
import { ShoppingBag, ClipboardList } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useOrders } from "@/lib/orders-store";

export function Header() {
  const count = useCart((s) => s.itemCount());
  const orders = useOrders((s) => s.orders);
  const activeOrders = orders.filter(
    (o) => !["delivered", "rejected", "cancelled", "failed"].includes(o.status)
  ).length;

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paprika text-sm font-bold text-white">
            SD
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Sariosiyo Dostavka
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/orders"
            className="relative rounded-full p-2 text-ink-muted transition hover:bg-cream-200 hover:text-ink"
            aria-label="Buyurtmalarim"
          >
            <ClipboardList className="h-5 w-5" />
            {activeOrders > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-paprika px-1 text-[10px] font-bold text-white">
                {activeOrders}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full p-2 text-ink-muted transition hover:bg-cream-200 hover:text-ink"
            aria-label="Savat"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-paprika px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
