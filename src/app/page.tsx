import { restaurants } from "@/lib/data";
import { RestaurantCard } from "@/components/restaurant-card";

export default function HomePage() {
  const open = restaurants.filter((r) => r.isOpen);
  const closed = restaurants.filter((r) => !r.isOpen);

  return (
    <div className="px-4 py-6">
      <section className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
          Sariosiyoda yetkazib berish
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Mahalliy restoranlardan issiq taom — eshigingizgacha.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
          Ochiq restoranlar
        </h2>
        {open.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </section>

      {closed.length > 0 && (
        <section className="mt-8 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
            Hozir yopiq
          </h2>
          {closed.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </section>
      )}
    </div>
  );
}
