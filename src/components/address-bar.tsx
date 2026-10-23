"use client";

import { useState } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { useAddress } from "@/lib/address-store";

const SUGGESTIONS = [
  "Sariosiyo markaz",
  "Mustaqillik ko‘chasi",
  "Navoiy ko‘chasi",
  "Bozor yonida",
  "Yangiyo‘l mahallasi",
];

export function AddressBar({ compact = false }: { compact?: boolean }) {
  const address = useAddress((s) => s.address);
  const setAddress = useAddress((s) => s.setAddress);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(address);

  function apply(value: string) {
    const v = value.trim() || "Sariosiyo markaz";
    setAddress(v);
    setDraft(v);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setDraft(address);
          setOpen((o) => !o);
        }}
        className={`flex items-center gap-1.5 rounded-lg text-left transition hover:bg-neutral-100 ${
          compact ? "max-w-[200px] px-1.5 py-1" : "w-full px-2 py-1.5"
        }`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <MapPin className="h-4 w-4 shrink-0 text-paprika" aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-medium uppercase tracking-wide text-neutral-500">
            Yetkazish
          </span>
          <span className="block truncate text-sm font-semibold text-ink">
            {address}
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-neutral-400 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-label="Yetkazish manzili"
            className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-elevated sm:left-auto sm:right-auto sm:w-80"
          >
            <div className="border-b border-neutral-100 p-3">
              <label className="mb-1 block text-xs font-medium text-neutral-500">
                Manzil
              </label>
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    apply(draft);
                  }
                }}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-paprika"
                placeholder="Ko‘cha, uy..."
                autoFocus
              />
              <button
                type="button"
                onClick={() => apply(draft)}
                className="mt-2 w-full rounded-lg bg-paprika py-2 text-sm font-semibold text-white"
              >
                Saqlash
              </button>
            </div>
            <ul className="max-h-48 overflow-y-auto py-1">
              {SUGGESTIONS.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => apply(s)}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-neutral-50"
                  >
                    <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                    <span className="flex-1">{s}</span>
                    {address === s && (
                      <Check className="h-4 w-4 text-paprika" aria-hidden />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
