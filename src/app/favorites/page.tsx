import Link from "next/link";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
        <Heart className="h-7 w-7 text-neutral-400" />
      </div>
      <h1 className="text-lg font-bold text-ink">Sevimlilar bo‘sh</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Restoranlarni sevimlilarga qo‘shish keyingi yangilanishda.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-paprika px-6 py-2.5 text-sm font-semibold text-white"
      >
        Restoranlarni ko‘rish
      </Link>
    </div>
  );
}
