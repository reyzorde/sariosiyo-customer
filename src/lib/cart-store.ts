"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (menuItemId: string) => void;
  setQuantity: (menuItemId: string, quantity: number) => void;
  clear: () => void;
  subtotalTiyin: () => number;
  itemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,

      addItem: (item, qty = 1) => {
        const state = get();
        if (state.restaurantId && state.restaurantId !== item.restaurantId) {
          set({
            items: [{ ...item, quantity: qty }],
            restaurantId: item.restaurantId,
          });
          return;
        }
        const existing = state.items.find((i) => i.menuItemId === item.menuItemId);
        if (existing) {
          set({
            items: state.items.map((i) =>
              i.menuItemId === item.menuItemId
                ? { ...i, quantity: i.quantity + qty }
                : i
            ),
            restaurantId: item.restaurantId,
          });
        } else {
          set({
            items: [...state.items, { ...item, quantity: qty }],
            restaurantId: item.restaurantId,
          });
        }
      },

      removeItem: (menuItemId) => {
        const items = get().items.filter((i) => i.menuItemId !== menuItemId);
        set({
          items,
          restaurantId: items.length ? get().restaurantId : null,
        });
      },

      setQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.menuItemId === menuItemId ? { ...i, quantity } : i
          ),
        });
      },

      clear: () => set({ items: [], restaurantId: null }),

      subtotalTiyin: () =>
        get().items.reduce((sum, i) => sum + i.unitPriceTiyin * i.quantity, 0),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "sariosiyo-cart" }
  )
);
