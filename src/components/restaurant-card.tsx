import Link from "next/link";
import type { Restaurant } from "@/types";
import { formatSom } from "@/lib/money";
import { Clock, Star } from "lucide-react";
import { DELIVERY_FEE_TIYIN } from "@/lib/data";

export function RestaurantCard({
  restaurant,
  compact = false,
}: {
  restaurant: Restaurant;
  compact?: boolean;
}) {
  const cuisine = restaurant.categories.slice(0, 2).join(" · ");

  return (
    <Link
      href={`/restaurant/${restaurant.slug}`}
      className={`group flex overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition hover:border-neutral-200 hover:shadow-md ${
        compact ? "flex-col" : "flex-col sm:flex-row sm:items-stretch"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-neutral-100 ${
          compact
            ? "aspect-[16/10] w-full"
            : "aspect-[16/10] w-full sm:aspect-auto sm:h-auto sm:w-36 md:w-40"
        }`}
      >
        {restaurant.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={restaurant.imageUrl}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full min-h-[100px] items-center justify-center text-sm text-neutral-400">
            Rasm yo‘q
          </div>
        )}
        {!restaurant.isOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink">
              Yopiq
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-[15px] font-semibold leading-snug text-ink">
            {restaurant.name}
          </h3>
          {restaurant.rating > 0 && (
            <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-ink">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {restaurant.rating.toFixed(1)}
            </span>
          )}
        </div>
        {cuisine && (
          <p className="truncate text-xs text-neutral-500">{cuisine}</p>
        )}
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-neutral-500">
          <span className="flex items-center gap-0.5">
            <Clock className="h-3 w-3" aria-hidden />
            {restaurant.avgPrepMinutes}–{restaurant.avgPrepMinutes + 15} daq
          </span>
          <span>·</span>
          <span>Yetkazish {formatSom(DELIVERY_FEE_TIYIN)}</span>
          {restaurant.minOrderTiyin > 0 && (
            <>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">
                Min. {formatSom(restaurant.minOrderTiyin)}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
