"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useOrders } from "@/lib/orders-store";
import { formatSom } from "@/lib/money";
import { statusLabel } from "@/lib/order-status";
import { OrderTimeline } from "@/components/order-timeline";
import { ChevronLeft } from "lucide-react";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const getById = useOrders((s) => s.getById);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const order = getById(id);
  void tick;

  if (!order) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="text-ink-muted">Buyurtma topilmadi</p>
        <Link href="/orders" className="mt-4 inline-block text-paprika underline">
          Barcha buyurtmalar
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="mb-4 flex items-center gap-2">
        <Link href="/orders" className="rounded-full p-1.5 hover:bg-cream-200">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-display text-xl font-bold">Buyurtma</h1>
          <p className="text-xs text-ink-faint">{order.id}</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-white p-4 shadow-card">
        <p className="mb-3 text-sm font-medium text-ink">
          Holat:{" "}
          <span className="text-paprika">{statusLabel(order.status)}</span>
        </p>
        <OrderTimeline status={order.status} />
      </div>

      <div className="mb-4 rounded-xl bg-white p-4 shadow-card">
        <p className="font-medium text-ink">{order.restaurantName}</p>
        <ul className="mt-2 space-y-1 text-sm text-ink-muted">
          {order.items.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>
                {item.quantity}× {item.name}
              </span>
              <span>{formatSom(item.lineTotalTiyin)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 space-y-1 border-t border-cream-200 pt-2 text-sm">
          <div className="flex justify-between text-ink-muted">
            <span>Yetkazib berish</span>
            <span>{formatSom(order.deliveryFeeTiyin)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Jami</span>
            <span className="text-paprika">{formatSom(order.totalTiyin)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-card text-sm">
        <p className="font-medium text-ink">Yetkazish</p>
        <p className="mt-1 text-ink-muted">{order.deliveryAddress}</p>
        <p className="text-ink-muted">{order.deliveryPhone}</p>
        {order.deliveryNotes && (
          <p className="mt-1 text-ink-faint">Izoh: {order.deliveryNotes}</p>
        )}
      </div>
    </div>
  );
}
