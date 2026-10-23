import { notFound } from "next/navigation";
import Link from "next/link";
import { getRestaurantBySlug } from "@/lib/data";
import { formatSom } from "@/lib/money";
import { MenuItemCard } from "@/components/menu-item-card";
import { Clock, MapPin, Star, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = getRestaurantBySlug(slug);
  return { title: r?.name ?? "Restoran" };
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;
  const restaurant = getRestaurantBySlug(slug);
  if (!restaurant) notFound();

  const byCategory = restaurant.categories.map((cat) => ({
    category: cat,
    items: restaurant.menu.filter((m) => m.category === cat),
  }));

  return (
    <div>
      <div className="relative aspect-[2/1] bg-cream-200">
        {restaurant.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
        )}
        <Link
          href="/"
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur"
          aria-label="Orqaga"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      </div>

      <div className="space-y-1 px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <h1 className="font-display text-2xl font-bold text-ink">
            {restaurant.name}
          </h1>
          <span className="flex items-center gap-0.5 text-sm font-medium">
            <Star className="h-4 w-4 fill-paprika text-paprika" />
            {restaurant.rating.toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-ink-muted">{restaurant.description}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-xs text-ink-faint">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />~{restaurant.avgPrepMinutes} daq
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {restaurant.address}
          </span>
          <span>Min. {formatSom(restaurant.minOrderTiyin)}</span>
        </div>
        {!restaurant.isOpen && (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Restoran hozir yopiq. Keyinroq qayta urinib ko‘ring.
          </p>
        )}
      </div>

      <div className="space-y-6 px-4 pb-6">
        {byCategory.map(
          ({ category, items }) =>
            items.length > 0 && (
              <section key={category}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-faint">
                  {category}
                </h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      restaurantId={restaurant.id}
                    />
                  ))}
                </div>
              </section>
            )
        )}
      </div>
    </div>
  );
}
