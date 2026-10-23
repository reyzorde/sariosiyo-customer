"use client";

import Link from "next/link";
import { MapPin, ClipboardList, Heart, ChevronRight, User } from "lucide-react";
import { useAddress } from "@/lib/address-store";
import { Logo } from "@/components/logo";

export default function ProfilePage() {
  const address = useAddress((s) => s.address);

  return (
    <div className="mx-auto max-w-lg px-3 py-6 md:px-4">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
          <User className="h-7 w-7 text-neutral-400" />
        </div>
        <div>
          <p className="font-bold text-ink">Mehmon</p>
          <p className="text-sm text-neutral-500">
            Kirish keyinroq qo‘shiladi (Supabase Auth)
          </p>
        </div>
      </div>

      <ul className="overflow-hidden rounded-2xl border border-neutral-100 bg-white">
        <li>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <MapPin className="h-5 w-5 text-paprika" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink">Yetkazish manzili</p>
              <p className="truncate text-xs text-neutral-500">{address}</p>
            </div>
          </div>
        </li>
        <li className="border-t border-neutral-100">
          <Link
            href="/orders"
            className="flex items-center gap-3 px-4 py-3.5 hover:bg-neutral-50"
          >
            <ClipboardList className="h-5 w-5 text-neutral-500" />
            <span className="flex-1 text-sm font-medium text-ink">
              Buyurtmalarim
            </span>
            <ChevronRight className="h-4 w-4 text-neutral-400" />
          </Link>
        </li>
        <li className="border-t border-neutral-100">
          <Link
            href="/favorites"
            className="flex items-center gap-3 px-4 py-3.5 hover:bg-neutral-50"
          >
            <Heart className="h-5 w-5 text-neutral-500" />
            <span className="flex-1 text-sm font-medium text-ink">Sevimlilar</span>
            <ChevronRight className="h-4 w-4 text-neutral-400" />
          </Link>
        </li>
      </ul>

      <div className="mt-8 flex flex-col items-center gap-2 text-center">
        <Logo showText />
        <p className="text-xs text-neutral-400">Sariosiyo · demo ma’lumotlar</p>
      </div>
    </div>
  );
}
