import Link from "next/link";
import type { Restaurant } from "@/types";
import { formatSom } from "@/lib/money";
import { Clock, MapPin, Star } from "lucide-react";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      href={`/restaurant/${restaurant.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-elevated"
    >
      <div className="relative aspect-[16/9] bg-cream-200">
        {restaurant.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-faint">
            Rasm yo‘q
          </div>
        )}
        {!restaurant.isOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/50">
            <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-ink">
              Hozir yopiq
            </span>
          </div>
        )}
      </div>
      <div className="space-y-1.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-display text-lg font-semibold leading-tight text-ink">
            {restaurant.name}
          </h2>
          <span className="flex shrink-0 items-center gap-0.5 text-sm font-medium text-ink">
            <Star className="h-3.5 w-3.5 fill-paprika text-paprika" />
            {restaurant.rating.toFixed(1)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-ink-muted">
          {restaurant.description}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-ink-faint">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            ~{restaurant.avgPrepMinutes} daq
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {restaurant.address.split(",")[0]}
          </span>
          <span>Min. {formatSom(restaurant.minOrderTiyin)}</span>
        </div>
      </div>
    </Link>
  );
}
