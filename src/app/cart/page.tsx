"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { formatSom } from "@/lib/money";
import { DELIVERY_FEE_TIYIN, getRestaurantById } from "@/lib/data";
import { Minus, Plus, Trash2, ChevronLeft } from "lucide-react";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const restaurantId = useCart((s) => s.restaurantId);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart((s) => s.subtotalTiyin());
  const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;
  const total = subtotal + (items.length ? DELIVERY_FEE_TIYIN : 0);
  const belowMin =
    restaurant && subtotal > 0 && subtotal < restaurant.minOrderTiyin;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center px-4 py-16 text-center">
        <p className="text-lg font-medium text-ink">Savat bo‘sh</p>
        <p className="mt-1 text-sm text-ink-muted">
          Restorandan taom qo‘shing
        </p>
        <Link
          href="/"
          className="mt-6 rounded-full bg-paprika px-6 py-2.5 text-sm font-medium text-white"
        >
          Restoranlarni ko‘rish
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="mb-4 flex items-center gap-2">
        <Link
          href={restaurant ? `/restaurant/${restaurant.slug}` : "/"}
          className="rounded-full p-1.5 hover:bg-cream-200"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-display text-xl font-bold">Savat</h1>
      </div>

      {restaurant && (
        <p className="mb-4 text-sm text-ink-muted">{restaurant.name}</p>
      )}

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.menuItemId}
            className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-card"
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium text-ink">{item.name}</p>
              <p className="text-sm text-paprika">
                {formatSom(item.unitPriceTiyin)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity(item.menuItemId, item.quantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-200"
                aria-label="Kamaytirish"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-5 text-center text-sm font-semibold">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(item.menuItemId, item.quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-paprika text-white"
                aria-label="Ko‘paytirish"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => removeItem(item.menuItemId)}
                className="ml-1 rounded-full p-1.5 text-ink-faint hover:bg-red-50 hover:text-red-600"
                aria-label="O‘chirish"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-2 rounded-xl bg-white p-4 shadow-card text-sm">
        <div className="flex justify-between">
          <span className="text-ink-muted">Oraliq summa</span>
          <span>{formatSom(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-muted">Yetkazib berish</span>
          <span>{formatSom(DELIVERY_FEE_TIYIN)}</span>
        </div>
        <div className="flex justify-between border-t border-cream-200 pt-2 text-base font-semibold">
          <span>Jami</span>
          <span className="text-paprika">{formatSom(total)}</span>
        </div>
      </div>

      {belowMin && restaurant && (
        <p className="mt-3 text-sm text-amber-700">
          Minimal buyurtma: {formatSom(restaurant.minOrderTiyin)}. Yana{" "}
          {formatSom(restaurant.minOrderTiyin - subtotal)} qo‘shing.
        </p>
      )}

      <Link
        href={belowMin ? "#" : "/checkout"}
        aria-disabled={!!belowMin}
        className={`mt-6 flex w-full items-center justify-center rounded-full py-3.5 text-sm font-semibold text-white transition ${
          belowMin
            ? "cursor-not-allowed bg-ink-faint"
            : "bg-paprika hover:bg-paprika-600 active:scale-[0.98]"
        }`}
        onClick={(e) => belowMin && e.preventDefault()}
      >
        Buyurtma berish · {formatSom(total)}
      </Link>
    </div>
  );
}
