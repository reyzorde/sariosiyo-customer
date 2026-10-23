"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { useOrders } from "@/lib/orders-store";
import { formatSom } from "@/lib/money";
import { isValidUzPhone, normalizePhone } from "@/lib/phone";
import { DELIVERY_FEE_TIYIN, getRestaurantById } from "@/lib/data";
import { ChevronLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const restaurantId = useCart((s) => s.restaurantId);
  const subtotal = useCart((s) => s.subtotalTiyin());
  const clear = useCart((s) => s.clear);
  const placeOrder = useOrders((s) => s.placeOrder);
  const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const total = subtotal + DELIVERY_FEE_TIYIN;

  if (items.length === 0 || !restaurant) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="text-ink-muted">Savat bo‘sh</p>
        <Link href="/" className="mt-4 inline-block text-paprika underline">
          Bosh sahifa
        </Link>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Ismni kiriting");
      return;
    }
    if (!isValidUzPhone(phone)) {
      setError("Telefon raqam noto‘g‘ri (+998XXXXXXXXX)");
      return;
    }
    if (!address.trim() || address.trim().length < 8) {
      setError("Manzilni to‘liqroq yozing");
      return;
    }

    setSubmitting(true);
    const order = placeOrder({
      restaurantId: restaurant!.id,
      restaurantName: restaurant!.name,
      items: items.map((i) => ({
        name: i.name,
        unitPriceTiyin: i.unitPriceTiyin,
        quantity: i.quantity,
        lineTotalTiyin: i.unitPriceTiyin * i.quantity,
      })),
      subtotalTiyin: subtotal,
      deliveryFeeTiyin: DELIVERY_FEE_TIYIN,
      totalTiyin: total,
      deliveryAddress: address.trim(),
      deliveryPhone: normalizePhone(phone)!,
      deliveryNotes: notes.trim(),
    });
    clear();
    router.push(`/orders/${order.id}`);
  }

  return (
    <div className="px-4 py-4">
      <div className="mb-4 flex items-center gap-2">
        <Link href="/cart" className="rounded-full p-1.5 hover:bg-cream-200">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-display text-xl font-bold">Buyurtma</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Ism familiya
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-sm outline-none focus:border-paprika"
            placeholder="Ali Valiyev"
            autoComplete="name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Telefon
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-sm outline-none focus:border-paprika"
            placeholder="+998 90 123 45 67"
            autoComplete="tel"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Yetkazish manzili
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
            className="w-full resize-none rounded-xl border border-cream-300 bg-white px-4 py-3 text-sm outline-none focus:border-paprika"
            placeholder="Sariosiyo, ko‘cha, uy, xonadon"
            autoComplete="street-address"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Izoh (ixtiyoriy)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-sm outline-none focus:border-paprika"
            placeholder="Domofon kodi, qavat..."
          />
        </div>

        <div className="rounded-xl bg-white p-4 shadow-card text-sm">
          <p className="mb-2 font-medium text-ink">{restaurant.name}</p>
          <ul className="space-y-1 text-ink-muted">
            {items.map((i) => (
              <li key={i.menuItemId} className="flex justify-between">
                <span>
                  {i.quantity}× {i.name}
                </span>
                <span>{formatSom(i.unitPriceTiyin * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-cream-200 pt-2 font-semibold">
            <span>Jami</span>
            <span className="text-paprika">{formatSom(total)}</span>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center rounded-full bg-paprika py-3.5 text-sm font-semibold text-white transition hover:bg-paprika-600 disabled:opacity-60"
        >
          {submitting ? "Yuborilmoqda..." : `Tasdiqlash · ${formatSom(total)}`}
        </button>
      </form>
    </div>
  );
}
