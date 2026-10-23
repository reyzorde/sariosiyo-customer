"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { restaurants } from "@/lib/data";
import { FOOD_CATEGORIES } from "@/lib/categories";
import { RestaurantCard } from "@/components/restaurant-card";
import { AddressBar } from "@/components/address-bar";
import { formatSom } from "@/lib/money";
import { useCart } from "@/lib/cart-store";
import clsx from "clsx";

export default function HomePage() {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const addItem = useCart((s) => s.addItem);

  const filtered = useMemo(() => {
    let list = [...restaurants];
    if (category !== "all") {
      list = list.filter((r) => r.categories.includes(category));
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.menu.some((m) => m.name.toLowerCase().includes(q))
      );
    }
    return list;
  }, [category, query]);

  const open = filtered.filter((r) => r.isOpen);
  const closed = filtered.filter((r) => !r.isOpen);
  const popular = restaurants.filter((r) => r.isOpen).slice(0, 4);

  const popularDishes = restaurants
    .filter((r) => r.isOpen)
    .flatMap((r) =>
      r.menu
        .filter((m) => m.isAvailable)
        .slice(0, 2)
        .map((m) => ({
          ...m,
          restaurantId: r.id,
          restaurantName: r.name,
          restaurantSlug: r.slug,
        }))
    )
    .slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="border-b border-neutral-100 bg-white px-3 py-2 md:hidden">
        <AddressBar />
      </div>

      <div className="px-3 py-4 md:px-4 md:py-6">
        <div className="relative mb-4">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Taom yoki restoran qidiring"
            className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-paprika focus:ring-2 focus:ring-paprika/15"
            aria-label="Taom yoki restoran qidiring"
          />
        </div>

        <div className="-mx-3 mb-6 overflow-x-auto px-3 scrollbar-none md:mx-0 md:px-0">
          <div className="flex gap-2 pb-1">
            {FOOD_CATEGORIES.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={clsx(
                    "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition",
                    active
                      ? "border-paprika bg-paprika text-white"
                      : "border-neutral-200 bg-white text-ink hover:border-neutral-300"
                  )}
                >
                  <span aria-hidden>{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {!query && category === "all" && (
          <section className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-ink">Mashhur restoranlar</h2>
              <Link
                href="/search"
                className="flex items-center gap-0.5 text-sm font-medium text-paprika"
              >
                Barchasi
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {popular.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} compact />
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="mb-3 text-base font-bold text-ink">
            {query || category !== "all"
              ? "Natijalar"
              : "Yaqin atrofdagi restoranlar"}
          </h2>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-200 bg-white px-4 py-12 text-center">
              <p className="font-medium text-ink">Hech narsa topilmadi</p>
              <p className="mt-1 text-sm text-neutral-500">
                Boshqa so‘z yoki kategoriya sinab ko‘ring
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
                className="mt-4 text-sm font-semibold text-paprika"
              >
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {open.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
              {closed.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          )}
        </section>

        {!query && category === "all" && popularDishes.length > 0 && (
          <section className="mb-4">
            <h2 className="mb-3 text-base font-bold text-ink">Siz uchun</h2>
            <div className="-mx-3 flex gap-3 overflow-x-auto px-3 pb-2 scrollbar-none md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
              {popularDishes.map((dish) => (
                <div
                  key={`${dish.restaurantId}-${dish.id}`}
                  className="flex w-[160px] shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm md:w-auto"
                >
                  <div className="aspect-square bg-neutral-100">
                    {dish.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={dish.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-2.5">
                    <p className="line-clamp-2 text-sm font-semibold text-ink">
                      {dish.name}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-neutral-500">
                      {dish.restaurantName}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-1 pt-2">
                      <span className="text-sm font-bold text-paprika">
                        {formatSom(dish.priceTiyin)}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          addItem({
                            menuItemId: dish.id,
                            restaurantId: dish.restaurantId,
                            name: dish.name,
                            unitPriceTiyin: dish.priceTiyin,
                            imageUrl: dish.imageUrl,
                          })
                        }
                        className="rounded-full bg-paprika px-2.5 py-1 text-xs font-semibold text-white hover:bg-paprika-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
