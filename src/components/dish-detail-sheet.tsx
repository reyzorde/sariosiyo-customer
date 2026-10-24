"use client";

import { useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import { formatSom } from "@/lib/money";
import { useCart } from "@/lib/cart-store";

export type DishDetailData = {
  id: string;
  name: string;
  description?: string;
  priceTiyin: number;
  imageUrl?: string;
  isAvailable?: boolean;
  restaurantId: string;
  restaurantName?: string;
};

export function DishDetailSheet({
  dish,
  onClose,
}: {
  dish: DishDetailData | null;
  onClose: () => void;
}) {
  const items = useCart((s) => s.items);
  const addItem = useCart((s) => s.addItem);
  const setQuantity = useCart((s) => s.setQuantity);

  useEffect(() => {
    if (!dish) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [dish]);

  useEffect(() => {
    if (!dish) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dish, onClose]);

  if (!dish) return null;

  const qty = items.find((i) => i.menuItemId === dish.id)?.quantity ?? 0;
  const available = dish.isAvailable !== false;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Yopish"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-detail-title"
        className="relative z-10 flex max-h-[90dvh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-white shadow-elevated sm:rounded-2xl"
      >
        <div className="relative aspect-[16/10] shrink-0 bg-neutral-100">
          {dish.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dish.imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              Rasm yo‘q
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink shadow"
            aria-label="Yopish"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-4 pb-6 pt-4">
          {dish.restaurantName && (
            <p className="mb-1 text-xs font-medium text-neutral-500">
              {dish.restaurantName}
            </p>
          )}
          <h2
            id="dish-detail-title"
            className="text-xl font-bold leading-snug text-ink"
          >
            {dish.name}
          </h2>
          <p className="mt-2 text-lg font-bold text-paprika">
            {formatSom(dish.priceTiyin)}
          </p>
          {dish.description ? (
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {dish.description}
            </p>
          ) : (
            <p className="mt-3 text-sm text-neutral-400">
              Qo‘shimcha tavsif kiritilmagan.
            </p>
          )}
          {!available && (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Hozir mavjud emas
            </p>
          )}
        </div>

        <div className="border-t border-neutral-100 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {!available ? (
            <button
              type="button"
              disabled
              className="w-full rounded-full bg-neutral-200 py-3 text-sm font-semibold text-neutral-500"
            >
              Mavjud emas
            </button>
          ) : qty === 0 ? (
            <button
              type="button"
              onClick={() => {
                addItem({
                  menuItemId: dish.id,
                  restaurantId: dish.restaurantId,
                  name: dish.name,
                  unitPriceTiyin: dish.priceTiyin,
                  imageUrl: dish.imageUrl,
                });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-paprika py-3 text-sm font-semibold text-white hover:bg-paprika-600"
            >
              <Plus className="h-4 w-4" />
              Savatga qo‘shish · {formatSom(dish.priceTiyin)}
            </button>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(dish.id, qty - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100"
                  aria-label="Kamaytirish"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center text-base font-bold">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(dish.id, qty + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-paprika text-white"
                  aria-label="Ko‘paytirish"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-paprika px-5 py-2.5 text-sm font-semibold text-white"
              >
                Tayyor
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
