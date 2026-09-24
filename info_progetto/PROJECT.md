# Wooden Tree House — PROJECT.md

Aggiornato: settembre 2026

## Link

| Cosa | Dove |
|---|---|
| Sito | https://www.woodentreehousesgp.com (Vercel, progetto `woodentreehouse`, deploy automatico da `main`) |
| Repository | https://github.com/bolalocasrl/woodentreehouse.git |
| Shop Fourthwall | https://wooden-tree-house-shop.fourthwall.com/en-eur — pannello: https://admin.fourthwall.com/store/wooden-tree-house/ |
| Instagram | https://www.instagram.com/wooden_tree_house/ |
| Documentario YouTube | https://youtu.be/Z491JyyrQB0 |
| WhatsApp contatti | https://wa.me/34632854055 |
| Newsletter | Brevo, account "Casetta Sull'Albero" — lista #2 (via `api/subscribe.js`) |

---

## Stack

React 19 · TypeScript · Vite 8 · Wouter (routing) · Tailwind CSS v4 · Framer Motion · shadcn/ui (solo `Button` e `Toaster` usati) · globe.gl (mappamondo) · sharp (preparazione foto, solo sviluppo).

Font: Helvetica Neue (testi) + Times New Roman (titoli).

Funzioni server Vercel (cartella `api/`):
- `api/subscribe.js` → iscrizione newsletter Brevo (chiave in `BREVO_API_KEY`)
- `api/products.js` → catalogo prodotti Fourthwall (token in `FOURTHWALL_TOKEN`, cache CDN 5 minuti)

Variabili d'ambiente su Vercel: `BREVO_API_KEY`, `FOURTHWALL_TOKEN`. Le chiavi non vanno mai nel codice (GitHub blocca il push).

---

## Pagine

| Route | File | Cosa c'è |
|---|---|---|
| `/` | `src/pages/home.tsx` | Home monopagina (tutta inline nel file) |
| `/shop` | `src/pages/shop.tsx` | Prodotti letti da Fourthwall + sezione WTH around the world con mappamondo |
| `/galleria` | `src/pages/galleria.tsx` | Galleria: Realizzazioni + Eventi |
| `/galleria/:area` | `src/pages/galleria-area.tsx` | Storia (linea del tempo) o elenco progetti |
| `/galleria/:area/:progetto` | `src/pages/galleria-area.tsx` | Singolo progetto (solo Allestimenti) |
| `/privacy-policy` | `src/pages/privacy-policy.tsx` | Privacy (Brevo, Vercel, GTM, Fourthwall) |
| `*` | `src/pages/not-found.tsx` | 404 |

`vercel.json`: rewrite di tutto su `index.html` tranne `/api/` (senza, le sottopagine danno 404) + header per l'embedding in iframe.

---

## Home (`src/pages/home.tsx`)

Header: `src/components/site/HomeHeader.tsx` — trasparente sopra la foto, poi barra panna che si nasconde scendendo e ricompare risalendo; su telefono pulsante menu con pannello a tutto schermo.
Menu: La Casetta · Casetta Alcolica · Allestimenti · Eventi · Galleria · Shop

| Sezione | Contenuto | Link |
|---|---|---|
| Hero | Nome + frase visibili subito, form newsletter; scorrendo la foto si sfoca | Privacy |
| `#casetta` | 01 — Dove tutto è iniziato | Documentario, galleria Casetta |
| `#alcolica` | 02 — Il bar su ruote, EST. 2018 | Instagram, galleria Casetta Alcolica |
| `#allestimenti` | 03 — Costruzioni su misura | WhatsApp, galleria Allestimenti |
| `#mostra-arte` | 04 — Arte in Casetta | Progetto Madre Natura |
| `#eventi` | 05 — Le nostre feste (Wooden Tree Night, Wooden Tree Mobile) | Gallerie dei due eventi |
| `#shop` | 06 — Maglie e gadget: primi 4 prodotti Fourthwall (`src/components/shop/ShopTeaser.tsx`) | /shop |
| Newsletter | "La prossima festa la sai prima tu" | |
| Footer | Dati APS, Instagram, Privacy, © 2013 | |

Newsletter: componente unico `src/components/site/NewsletterForm.tsx` (hero e blocco finale). A iscrizione riuscita manda l'evento `iscrizione_newsletter` a Google Tag Manager (`dataLayer`), pronto per le campagne.

Testi tutti in italiano (tranne i nomi propri: Wooden Tree Night, Boiler Room, WTH around the world).

Google Tag Manager installato in `index.html` (`GTM-WFMMWWRV`). Anteprima link: `public/opengraph.jpg`.

---

## Shop

### Pagina `/shop` sul nostro sito
- Catalogo dalla **Storefront API** di Fourthwall (`src/lib/fourthwall.ts`): prezzi in EUR, colori e taglie
- "Acquista" apre `…/products/<slug>?variant=<id>` su Fourthwall con colore e taglia già selezionati. Carrello e pagamento restano su Fourthwall (il carrello via API non funziona)
- Hero con `src/assets/images/herofotoshop.webp`
- Header e footer condivisi con la galleria: `src/components/site/SiteHeader.tsx` (Home · Galleria · Shop) e `SiteFooter.tsx`

### WTH around the world (in fondo a /shop)
- Dati: `src/content/around-the-world.ts` — 36 post Instagram (foto, luogo, data, didascalia, "mi piace", link al post) + 4 foto di gruppo
- Schede stile post Instagram (`PostCard` in `src/components/shop/AroundTheWorld.tsx`), con l'avatar del profilo `src/assets/images/instagram-avatar.webp`. Griglia su desktop (8 visibili + "Mostra tutte"), carosello su telefono
- **Mappamondo 3D** (`src/components/shop/WorldGlobe.tsx`, globe.gl): caricato solo quando la sezione si avvicina (~570 KB). Continenti da `world-atlas`, punti gialli raggruppati quando vicini, clic sul gruppo = zoom, clic sul punto = scheda. Zoom solo con i pulsanti +/− (la rotellina scorre la pagina). Senza WebGL resta la griglia. Il metodo "hexPolygons" (continenti a puntini) dà errore: usare `polygonsData`
- **Aggiungere un post:** foto in `woodentreehouse-foto/around-the-world/`, `npm run foto -- woodentreehouse-foto/around-the-world around-the-world`, voce nel file dati e **coordinate del luogo in `src/content/coordinate.ts`**
- Foto dei post: prese a 1080 px dalla pagina del post (con login in Chrome); le `og:image` sono troppo piccole

### Shop Fourthwall
- Grafica fatta a settembre 2026 (Site design): Primary `#1B3B2B`, Secondary `#7A6652`, Background `#F2F0E9`, Text `#121212`; titoli Tinos, testi Inter; logo e favicon del sito; foto prodotti 4:5; banner "Lo shop / della Casetta"; menu Home · Prodotti · Il sito
- Prodotti on demand (Printful), spedizione 5-13 giorni
- **Valuta base USD**: gli euro sono conversioni automatiche, quindi non tondi (la maglia $33.78 ≈ €30)
- Maglie (Comfort Colors 1717, logo 9" sul petto): "Maglia WTH" (Black, Hemp, Blue Spruce, logo bianco) e "Maglia WTH Chiara" (Ivory, White, logo nero). Guadagno $18.33
- File di stampa: `public/logo-bianco.png`, `public/logo-nero.png`

---

## Brevo (newsletter e contatti)

Account **Casetta Sull'Albero**. Liste (settembre 2026):

| Lista | ID | Contatti | Cosa contiene |
|---|---|---|---|
| Associati WTH | #5 | 452 | Associati dal modulo Google "Associati a WTH" (da marzo 2025) |
| Newsletter WTH | #2 | 24 | Iscritti dal sito — è la lista su cui scrive `api/subscribe.js` |
| identified_contacts | #3 | 0 | Automatica di Brevo, non si tocca |

- Dal modulo del sito il contatto arriva **diretto** nella lista #2 via API v3 (verificato il 24 settembre 2026 con un indirizzo di prova, poi cancellato)
- Il limite di **300 email al giorno** del piano gratuito riguarda **l'invio**, non quanti contatti puoi avere in lista. Per scrivere a tutti gli associati servono 2 giorni: file già divisi in `Downloads/brevo-associati-wth-parte1.csv` e `parte2.csv` (226 + 226)
- **Attenzione:** a maggio 2026 la campagna "Benvenuto in Casetta" era partita verso 28 contatti della lista #2, ma quei contatti sono stati cancellati dal database. Il report gratuito conserva solo i numeri, non gli indirizzi. I 24 attuali sono stati ricaricati a mano. **Non cancellare contatti da Brevo: non si recuperano.**
- Prima di caricare contatti: solo EMAIL, NOME, COGNOME. Codice fiscale, indirizzo, telefono e documento del modulo associati **non** vanno su Brevo

---

## Galleria

Contenuti tutti in `src/content/galleria.ts`. Pubblica (`GALLERIA_IN_BOZZA = false`); con `true` torna in bozza (avviso, noindex, niente link nei menu, etichette "Da confermare" visibili).

| Area | Modello | Contenuto |
|---|---|---|
| La Casetta | storia | 13 tappe: 2012 la sfida → 2013 → 2014 → 2016 il nome → 2017 piattaforma → 2018 → 2019 cantiere → 2020 terrazzo → 2021 stufa → 2022 → 2023 acqua e ingresso → 2024 → oggi |
| La Casetta Alcolica | storia | 2018 primo carnevale → primavera 2018 → 2019 → 2020 → 2021 → 2024 postazione DJ → 2026 ritorno |
| Allestimenti | progetti | Il Portale (Point Of View × Social Hub 2024), Madre Natura, Il Palco (2025), Lo stencil sulla cassa, Street Art in Casetta |
| Wooden Tree Night | storia | 2016, 2017, 2018, set. 2021 (APE in Casetta), WTN 5 (2022), ott. 2022 (Autumn Edition), WTN 6 (2023), WTN 7 (2024) |
| Boiler Room | storia | dic. 2023, nov. 2024, dic. 2024, mar. 2025, apr. 2026 |
| Wooden Tree Mobile | storia | carnevali 2018, 2019, 2020, 2026 |

Tecnica:
- Modelli in `src/components/galleria/` (`StoriaTemplate`, `ProgettiTemplate`, `Lightbox`, `parts.tsx` con Collage e "Continua a esplorare", `FotoImg`)
- Foto in `public/galleria/<area>/...` in 3 misure (`-800`, `-1600`, `-2400.webp`, qualità 84), dimensioni in `src/content/foto.json`; `FotoImg` usa srcset
- **Preparare foto:** `npm run foto -- <cartella-originali> <area>` (`scripts/foto.mjs`: sharp, HEIC via sips, raddrizza le verticali, aggiorna foto.json)
- Nel file dati, `serie("area/cartella", [didascalie…])` prende 01, 02… nell'ordine delle didascalie
- Qualità prima di tutto: non scendere sotto qualità 84 in galleria e 85 per le foto della home (max 2880 px)

Storia (per i testi):
- La Casetta nasce a luglio 2012 da una sfida dello zio William a Giova, nel giardino di Giova a San Giovanni in Persiceto; gruppo di una decina di amici
- Casetta Alcolica: 2018 al primo carnevale, migliorata 2019 e 2020 (casettina DJ), pausa Covid, ritorno con i permessi di Comune e Pro Loco (sotto uno dei due archi)
- La struttura verde con i tentacoli è la postazione DJ su ruote che va con la Casetta Alcolica; i banconi dipinti al piano terra sono il bar della Casetta
- Jack = amico artista: Madre Natura (muro dietro la consolle), street art, Portale per Point Of View
- WTN = feste grandi in giardino a inizio giugno; Boiler Room = feste d'inverno/primavera più raccolte

---

## Foto originali

- Cartella locale del progetto: `woodentreehouse-foto/` (esclusa da git), una sottocartella per area e una per tappa
- `/Users/user/Desktop/Matte/Progettiamo/WTH/Foto/galleria_sito`
- Drive (account woodentreehouse97): cartella "WTH storia" (2012-2023, ordinata per data) e cartella grande "Casetta" (cartelle per data dal 2022, WTN, Boiler Room, Madre Natura…). Condivise con link: anteprime `drive.google.com/thumbnail?id=ID&sz=w500`, originali `drive.usercontent.google.com/download?id=ID&export=download&confirm=t` (andare piano, altrimenti Google risponde con la pagina di login)

---

## Brand

| Token | Valore | Uso |
|---|---|---|
| `brand-smoke` | `#121212` | Testo |
| `brand-offwhite` | `#F2F0E9` | Sfondo |
| `brand-forest` | `#1B3B2B` | Verde scuro |
| `brand-wood` | `#7A6652` | Legno |
| `brand-yellow` | `#F5C73D` | Accenti |

Asset: logo `src/assets/images/logo-nero.png` (600 px), favicon `public/favicon.png`, loghi di stampa in `public/`.

---

## Da fare

- **Landing page di Natale** per le sponsorizzate — quando lo dice il cliente. Servono: banner cookie (GDPR, obbligatorio prima dei pixel), pixel Meta/Google via GTM, evento di conversione "iscrizione newsletter", eventuale sconto per gli iscritti
- **Email di benvenuto su Brevo** — automazione da preparare (l'accesso a Brevo ora funziona)
- **Galleria:** piattaforma zipline 2026 (serve una foto migliore), testi reali delle Boiler Room, eventuali foto migliori di marzo 2025 (ora solo WhatsApp)
- **Around the world:** nuovi post man mano (ricordarsi le coordinate)
- Pulizia facoltativa: `src/components/sections/` contiene componenti vecchi non usati; molti componenti shadcn in `src/components/ui/` non sono usati
