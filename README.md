# Mazowiecka Płock

Premiumowa strona restauracji Mazowiecka, przygotowana w Next.js + React + TypeScript pod Vercel.

## Panel właściciela

Panel galerii jest celowo przygotowany jako **tryb demonstracyjny lokalny**. Logowanie demo:
- hasło: `mazowiecka-demo`
- zdjęcia są zapisywane w `localStorage` przeglądarki.

Architektura komponentu nie zakłada trwałego storage. W kolejnym kroku można podmienić warstwę zapisu na Supabase Storage + Auth bez przebudowy publicznej galerii.

## Uruchomienie

```bash
npm install
npm run dev
```

## Wdrożenie

Repozytorium jest przygotowane do importu do Vercel. Przed publikacją warto podmienić domenę w `app/layout.tsx` oraz `app/sitemap.ts` na docelową domenę salonu/restauracji.

## Dane

Adres: Aleja Stanisława Jachowicza 49, 09-400 Płock  
Telefon: 690 001 504  
Google rating: 4,0 / 102 opinie  
Cena: 40–60 zł / osoba  
Kategoria z dostarczonych danych: kuchnia włoska
