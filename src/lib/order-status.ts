import type { OrderStatus } from "@/types";

const LABELS: Record<OrderStatus, string> = {
  pending: "Kutilmoqda",
  confirmed: "Tasdiqlandi",
  preparing: "Tayyorlanmoqda",
  ready: "Tayyor",
  picked_up: "Olib ketildi",
  delivered: "Yetkazildi",
  rejected: "Rad etildi",
  cancelled: "Bekor qilindi",
  failed: "Muvaffaqiyatsiz",
};

const STEPS: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "picked_up",
  "delivered",
];

export function statusLabel(status: OrderStatus): string {
  return LABELS[status] ?? status;
}

export function statusStepIndex(status: OrderStatus): number {
  const i = STEPS.indexOf(status);
  return i >= 0 ? i : -1;
}

export function isTerminal(status: OrderStatus): boolean {
  return ["delivered", "rejected", "cancelled", "failed"].includes(status);
}
