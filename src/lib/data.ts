import type { Restaurant } from "@/types";

/** Demo seed data — Sariosiyo local restaurants (replace with Supabase later). */

export const DELIVERY_FEE_TIYIN = 1_500_000; // 15 000 so'm

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    slug: "sariosiyo-oshxona",
    name: "Sariosiyo Oshxonasi",
    description:
      "An'anaviy o‘zbek taomlari — palov, manti, somsa. Sariosiyo markazida.",
    address: "Sariosiyo shahar, Mustaqillik ko‘chasi 12",
    phone: "+998901234567",
    imageUrl: "/food/palov.svg",
    isOpen: true,
    avgPrepMinutes: 35,
    minOrderTiyin: 3_000_000,
    rating: 4.8,
    categories: ["Palov", "Ichimliklar", "Salatlar"],
    menu: [
      {
        id: "m1",
        name: "Palov (1 porsiya)",
        description: "Qo‘y go‘shti, sabzi, ziravorlar bilan",
        priceTiyin: 4_500_000,
        imageUrl: "/food/palov.svg",
        isAvailable: true,
        category: "Palov",
      },
      {
        id: "m2",
        name: "Manti (6 dona)",
        description: "Qo‘y go‘shtli manti, qatiq bilan",
        priceTiyin: 3_500_000,
        imageUrl: "/food/manti.svg",
        isAvailable: true,
        category: "Palov",
      },
      {
        id: "m3",
        name: "Somsa (3 dona)",
        description: "Tandir somsa, go‘shtli",
        priceTiyin: 2_400_000,
        imageUrl: "/food/somsa.svg",
        isAvailable: true,
        category: "Palov",
      },
      {
        id: "m4",
        name: "Achchiq-chuchuk",
        description: "Pomidor, piyoz, ko‘kat",
        priceTiyin: 1_200_000,
        isAvailable: true,
        category: "Salatlar",
      },
      {
        id: "m5",
        name: "Choy (qora)",
        description: "Issiq choy, 0.5 l",
        priceTiyin: 500_000,
        isAvailable: true,
        category: "Ichimliklar",
      },
      {
        id: "m6",
        name: "Ayran",
        description: "Uy qatiqdan",
        priceTiyin: 800_000,
        isAvailable: true,
        category: "Ichimliklar",
      },
    ],
  },
  {
    id: "r2",
    slug: "lavash-house",
    name: "Lavash House",
    description: "Tez tayyorlanadigan lavash, shashlik va burgerlar.",
    address: "Sariosiyo, Navoiy ko‘chasi 45",
    phone: "+998907654321",
    imageUrl: "/food/lavash.svg",
    isOpen: true,
    avgPrepMinutes: 20,
    minOrderTiyin: 2_500_000,
    rating: 4.5,
    categories: ["Lavash", "Shashlik", "Ichimliklar"],
    menu: [
      {
        id: "m10",
        name: "Lavash klassik",
        description: "Go‘sht, sabzavot, sous",
        priceTiyin: 2_800_000,
        imageUrl: "/food/lavash.svg",
        isAvailable: true,
        category: "Lavash",
      },
      {
        id: "m11",
        name: "Lavash pishloqli",
        description: "Qo‘shimcha pishloq bilan",
        priceTiyin: 3_200_000,
        imageUrl: "/food/lavash.svg",
        isAvailable: true,
        category: "Lavash",
      },
      {
        id: "m12",
        name: "Shashlik (qiyma)",
        description: "1 shish, non bilan",
        priceTiyin: 3_000_000,
        imageUrl: "/food/shashlik.svg",
        isAvailable: true,
        category: "Shashlik",
      },
      {
        id: "m13",
        name: "Coca-Cola 0.5",
        description: "Sovuq ichimlik",
        priceTiyin: 900_000,
        isAvailable: true,
        category: "Ichimliklar",
      },
    ],
  },
  {
    id: "r3",
    slug: "tandir-somsa",
    name: "Tandir Somsa",
    description: "Faqat tandirda pishirilgan somsa va non.",
    address: "Sariosiyo, Bozor yonida",
    imageUrl: "/food/somsa.svg",
    isOpen: false,
    avgPrepMinutes: 25,
    minOrderTiyin: 2_000_000,
    rating: 4.6,
    categories: ["Somsa"],
    menu: [
      {
        id: "m20",
        name: "Go‘shtli somsa",
        description: "Tandir, 1 dona",
        priceTiyin: 900_000,
        imageUrl: "/food/somsa.svg",
        isAvailable: true,
        category: "Somsa",
      },
      {
        id: "m21",
        name: "Kartoshkali somsa",
        description: "Tandir, 1 dona",
        priceTiyin: 700_000,
        isAvailable: true,
        category: "Somsa",
      },
    ],
  },
];

export function getRestaurantBySlug(slug: string): Restaurant | undefined {
  return restaurants.find((r) => r.slug === slug);
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}
