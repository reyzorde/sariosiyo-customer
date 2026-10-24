"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { MenuItem } from "@/types";
import { formatSom } from "@/lib/money";
import { useCart } from "@/lib/cart-store";
import {
  DishDetailSheet,
  type DishDetailData,
} from "@/components/dish-detail-sheet";

interface Props {
  item: MenuItem;
  restaurantId: string;
  restaurantName?: string;
}

export function MenuItemCard({ item, restaurantId, restaurantName }: Props) {
  const items = useCart((s) => s.items);
  const addItem = useCart((s) => s.addItem);
  const setQuantity = useCart((s) => s.setQuantity);
  const cartItem = items.find((i) => i.menuItemId === item.id);
  const qty = cartItem?.quantity ?? 0;
  const [detail, setDetail] = useState<DishDetailData | null>(null);

  function openDetail() {
    setDetail({
      id: item.id,
      name: item.name,
      description: item.description,
      priceTiyin: item.priceTiyin,
      imageUrl: item.imageUrl,
      isAvailable: item.isAvailable,
      restaurantId,
      restaurantName,
    });
  }

  return (
    <>
      <div className="flex gap-3 rounded-xl border border-neutral-100 bg-white p-3 shadow-sm">
        <button
          type="button"
          onClick={openDetail}
          className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100 text-left"
          aria-label={`${item.name} haqida`}
        >
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-neutral-400">
              —
            </div>
          )}
        </button>
        <div className="flex min-w-0 flex-1 flex-col">
          <button type="button" onClick={openDetail} className="text-left">
            <h3 className="font-medium leading-snug text-ink">{item.name}</h3>
            {item.description && (
              <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500">
                {item.description}
              </p>
            )}
          </button>
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="font-semibold text-paprika">
              {formatSom(item.priceTiyin)}
            </span>
            {!item.isAvailable ? (
              <span className="text-xs text-neutral-400">Mavjud emas</span>
            ) : qty === 0 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  addItem({
                    menuItemId: item.id,
                    restaurantId,
                    name: item.name,
                    unitPriceTiyin: item.priceTiyin,
                    imageUrl: item.imageUrl,
                  });
                }}
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
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-ink"
                  aria-label="Kamaytirish"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-5 text-center text-sm font-semibold">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(item.id, qty + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-paprika text-white"
                  aria-label="Ko‘paytirish"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <DishDetailSheet dish={detail} onClose={() => setDetail(null)} />
    </>
  );
}
