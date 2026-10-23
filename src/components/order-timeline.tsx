import type { OrderStatus } from "@/types";
import { statusLabel, statusStepIndex } from "@/lib/order-status";
import { Check } from "lucide-react";
import clsx from "clsx";

const STEPS: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "picked_up",
  "delivered",
];

export function OrderTimeline({ status }: { status: OrderStatus }) {
  const current = statusStepIndex(status);
  const failed = ["rejected", "cancelled", "failed"].includes(status);

  if (failed) {
    return (
      <div className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
        {statusLabel(status)}
      </div>
    );
  }

  return (
    <ol className="space-y-0">
      {STEPS.map((step, i) => {
        const done = current > i;
        const active = current === i;
        return (
          <li key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  done && "bg-paprika text-white",
                  active && "bg-paprika text-white ring-4 ring-paprika/20",
                  !done && !active && "bg-cream-200 text-ink-faint"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={clsx(
                    "my-0.5 w-0.5 flex-1 min-h-[20px]",
                    done ? "bg-paprika" : "bg-cream-200"
                  )}
                />
              )}
            </div>
            <div className={clsx("pb-4 pt-1", active && "font-semibold")}>
              <p
                className={clsx(
                  "text-sm",
                  active ? "text-paprika" : done ? "text-ink" : "text-ink-faint"
                )}
              >
                {statusLabel(step)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
