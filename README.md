# Sariosiyo Dostavka — Customer

Mijozlar uchun oziq-ovqat yetkazib berish ilovasi (Sariosiyo, Oʻzbekiston).

## Xususiyatlar

- Restoranlar roʻyxati (ochiq / yopiq)
- Menyu koʻrish va savatga qoʻshish
- Bitta restoran savati (boshqa restoran tanlansa savat almashtiriladi)
- Checkout: ism, telefon (+998), manzil, izoh
- Buyurtma berish va holat kuzatish (demo simulyatsiya)
- Toʻliq oʻzbek UI
- Mobile-first, paprika/cream brend

## Stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Zustand (cart + orders, localStorage)

## Ishga tushirish

```bash
npm install
npm run dev
```

http://localhost:3000

## Muhim eslatmalar

- Hozircha maʼlumotlar lokal seed (`src/lib/data.ts`). Keyinchalik Supabase bilan almashtiriladi.
- Buyurtma holati demo uchun avtomatik `pending → confirmed → preparing` ga oʻtadi.
- Pul butun son **tiyin**da saqlanadi (1 soʻm = 100 tiyin).

## Keyingi qadamlar

1. Supabase Auth + RLS
2. Haqiqiy `place_order` RPC
3. Realtime buyurtma holati
4. Toʻlov integratsiyasi
