"use client";

import Link from "next/link";
import { useOrders } from "@/lib/orders-store";
import { formatSom } from "@/lib/money";
import { statusLabel } from "@/lib/order-status";
import { ChevronRight } from "lucide-react";

export default function OrdersPage() {
  const orders = useOrders((s) => s.orders);

  if (orders.length === 0) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="text-lg font-medium text-ink">Buyurtmalar yo‘q</p>
        <p className="mt-1 text-sm text-ink-muted">
          Birinchi buyurtmangizni bering
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-paprika px-6 py-2.5 text-sm font-medium text-white"
        >
          Restoranlarni ko‘rish
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 font-display text-xl font-bold">Buyurtmalarim</h1>
      <ul className="space-y-3">
        {orders.map((order) => (
          <li key={order.id}>
            <Link
              href={`/orders/${order.id}`}
              className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card transition hover:shadow-elevated"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink">{order.restaurantName}</p>
                <p className="mt-0.5 text-sm text-ink-muted">
                  {statusLabel(order.status)} · {formatSom(order.totalTiyin)}
                </p>
                <p className="mt-0.5 text-xs text-ink-faint">
                  {new Date(order.placedAt).toLocaleString("uz-UZ", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-ink-faint" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
