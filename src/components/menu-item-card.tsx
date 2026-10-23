"use client";

import { Plus, Minus } from "lucide-react";
import type { MenuItem } from "@/types";
import { formatSom } from "@/lib/money";
import { useCart } from "@/lib/cart-store";

interface Props {
  item: MenuItem;
  restaurantId: string;
}

export function MenuItemCard({ item, restaurantId }: Props) {
  const items = useCart((s) => s.items);
  const addItem = useCart((s) => s.addItem);
  const setQuantity = useCart((s) => s.setQuantity);
  const cartItem = items.find((i) => i.menuItemId === item.id);
  const qty = cartItem?.quantity ?? 0;

  return (
    <div className="flex gap-3 rounded-xl bg-white p-3 shadow-card">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-cream-200">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-ink-faint">
            —
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-medium leading-snug text-ink">{item.name}</h3>
        {item.description && (
          <p className="mt-0.5 line-clamp-2 text-xs text-ink-muted">
            {item.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-semibold text-paprika">
            {formatSom(item.priceTiyin)}
          </span>
          {!item.isAvailable ? (
            <span className="text-xs text-ink-faint">Mavjud emas</span>
          ) : qty === 0 ? (
            <button
              type="button"
              onClick={() =>
                addItem({
                  menuItemId: item.id,
                  restaurantId,
                  name: item.name,
                  unitPriceTiyin: item.priceTiyin,
                  imageUrl: item.imageUrl,
                })
              }
              className="flex h-8 items-center gap-1 rounded-full bg-paprika px-3 text-sm font-medium text-white transition hover:bg-paprika-600 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Qo‘shish
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity(item.id, qty - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-200 text-ink transition hover:bg-cream-300"
                aria-label="Kamaytirish"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-5 text-center text-sm font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQuantity(item.id, qty + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-paprika text-white transition hover:bg-paprika-600"
                aria-label="Ko‘paytirish"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
