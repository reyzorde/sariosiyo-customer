"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, OrderStatus } from "@/types";

interface OrdersState {
  orders: Order[];
  placeOrder: (order: Omit<Order, "id" | "placedAt" | "updatedAt" | "status">) => Order;
  updateStatus: (id: string, status: OrderStatus) => void;
  getById: (id: string) => Order | undefined;
}

function uid(): string {
  return `ord_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      placeOrder: (data) => {
        const now = new Date().toISOString();
        const order: Order = {
          ...data,
          id: uid(),
          status: "pending",
          placedAt: now,
          updatedAt: now,
        };
        set({ orders: [order, ...get().orders] });

        if (typeof window !== "undefined") {
          setTimeout(() => {
            get().updateStatus(order.id, "confirmed");
          }, 4000);
          setTimeout(() => {
            get().updateStatus(order.id, "preparing");
          }, 9000);
        }

        return order;
      },

      updateStatus: (id, status) => {
        set({
          orders: get().orders.map((o) =>
            o.id === id
              ? { ...o, status, updatedAt: new Date().toISOString() }
              : o
          ),
        });
      },

      getById: (id) => get().orders.find((o) => o.id === id),
    }),
    { name: "sariosiyo-orders" }
  )
);
