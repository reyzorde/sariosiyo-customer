"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { restaurants } from "@/lib/data";
import { FOOD_CATEGORIES } from "@/lib/categories";
import { RestaurantCard } from "@/components/restaurant-card";
import { formatSom } from "@/lib/money";
import Link from "next/link";
import clsx from "clsx";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const { matchedRestaurants, matchedDishes } = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = [...restaurants];
    if (category !== "all") {
      list = list.filter((r) => r.categories.includes(category));
    }

    if (!q) {
      return {
        matchedRestaurants: list,
        matchedDishes: [] as {
          id: string;
          name: string;
          priceTiyin: number;
          restaurantName: string;
          restaurantSlug: string;
          imageUrl?: string;
        }[],
      };
    }

    const rest = list.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );

    const dishes = list.flatMap((r) =>
      r.menu
        .filter((m) => m.isAvailable && m.name.toLowerCase().includes(q))
        .map((m) => ({
          id: m.id,
          name: m.name,
          priceTiyin: m.priceTiyin,
          restaurantName: r.name,
          restaurantSlug: r.slug,
          imageUrl: m.imageUrl,
        }))
    );

    return { matchedRestaurants: rest, matchedDishes: dishes };
  }, [query, category]);

  return (
    <div className="mx-auto max-w-6xl px-3 py-4 md:px-4 md:py-6">
      <h1 className="mb-4 text-lg font-bold text-ink">Qidiruv</h1>

      <div className="relative mb-4">
        <SearchIcon
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Taom yoki restoran qidiring"
          className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-11 pr-10 text-sm outline-none focus:border-paprika focus:ring-2 focus:ring-paprika/15"
          autoFocus
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-ink"
            aria-label="Tozalash"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="-mx-3 mb-5 overflow-x-auto px-3 scrollbar-none">
        <div className="flex gap-2">
          {FOOD_CATEGORIES.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={clsx(
                  "shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium",
                  active
                    ? "border-paprika bg-paprika text-white"
                    : "border-neutral-200 bg-white text-ink"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {matchedDishes.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-semibold text-neutral-500">
            Taomlar
          </h2>
          <ul className="divide-y divide-neutral-100 overflow-hidden rounded-2xl border border-neutral-100 bg-white">
            {matchedDishes.map((d) => (
              <li key={d.id}>
                <Link
                  href={`/restaurant/${d.restaurantSlug}`}
                  className="flex items-center gap-3 px-3 py-3 hover:bg-neutral-50"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    {d.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={d.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">
                      {d.name}
                    </p>
                    <p className="truncate text-xs text-neutral-500">
                      {d.restaurantName}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-paprika">
                    {formatSom(d.priceTiyin)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-2 text-sm font-semibold text-neutral-500">
          Restoranlar
        </h2>
        {matchedRestaurants.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-200 bg-white py-12 text-center text-sm text-neutral-500">
            Natija yo‘q
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {matchedRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
