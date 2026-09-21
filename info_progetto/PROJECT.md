# Wooden Tree House — PROJECT.md

## Repository GitHub
https://github.com/bolalocasrl/woodentreehouse.git

## URL
- Sito: https://www.woodentreehousesgp.com (Vercel, progetto `woodentreehouse`)
- Shop: https://wooden-tree-house-shop.fourthwall.com/en-eur (Fourthwall, gestito dal pannello Fourthwall)

---

## Stack Tecnico

| Layer | Tecnologia |
|---|---|
| Framework UI | React 19 |
| Linguaggio | TypeScript |
| Build tool | Vite 8 |
| Routing | Wouter |
| Styling | Tailwind CSS v4 + tw-animate-css |
| Animazioni | Framer Motion |
| Componenti UI | Radix UI (shadcn/ui pattern) |
| State/Data | TanStack Query v5 |
| Form | React Hook Form + Zod |
| Icone | Lucide React + React Icons |
| Font | Helvetica Neue (sans) + Times New Roman (serif) |

---

## Stato Attuale

Progetto **landing page** monopagina per il brand Wooden Tree House. Frontend + una sola funzione server Vercel (`api/subscribe.js`) per la newsletter.

Fatto (settembre 2026):
- Newsletter su **Brevo** tramite `api/subscribe.js` (la chiave API resta sul server, variabile Vercel `BREVO_API_KEY`, lista Brevo ID 2)
- `vercel.json`: rewrite SPA (esclude `/api/`) + header per embedding in iframe
- Anteprima link (og:image) → `public/opengraph.jpg`
- Google Tag Manager installato (`GTM-WFMMWWRV`) in `index.html`
- Sezione Gadget con link allo shop Fourthwall
- Pagina `/privacy-policy`

Da fare:
- Testo Privacy Policy da aggiornare (cita ancora Google Forms, non cita Brevo / GTM)
- Sezione Gadget: allineare ai prodotti reali dello shop (le maglie verranno aggiunte su Fourthwall)
- Landing page dedicata per sponsorizzate / promo Natale (più avanti)
- Evento di conversione "iscrizione newsletter" in GTM per le campagne
- Landing page di Natale (+ banner cookie e pixel di tracciamento)
- Email di benvenuto su Brevo (in pausa: password Brevo da recuperare)

---

## Galleria

Contenuti tutti in `src/content/galleria.ts` (aree, tappe, progetti, foto).
- `GALLERIA_IN_BOZZA = false` (galleria pubblica da settembre 2026): link "Galleria" nei menu e pulsanti dalle sezioni della home. Con `true` torna in bozza (avviso, noindex, etichette "Da confermare" visibili)
- Due modelli: `StoriaTemplate` (linea del tempo: Casetta, Casetta Alcolica, Wooden Tree Night, Wooden Tree Mobile) e `ProgettiTemplate` (Allestimenti, con pagina per progetto)
- Componenti in `src/components/galleria/` (Lightbox a schermo intero, Collage, schede area)
- Foto in `public/galleria/<area>/...` in 3 misure (`nome-800.webp`, `nome-1600.webp`, `nome-2400.webp`, qualità 84); dimensioni in `src/content/foto.json`. Il componente `FotoImg` usa srcset: il browser sceglie la misura giusta. Foto vere da `galleria_sito` (100 foto, settembre 2026)
- **Preparare le foto:** `npm run foto -- <cartella-originali> <area>` (script `scripts/foto.mjs`, usa sharp; HEIC via sips; raddrizza le foto verticali)
- Originali delle foto: cartella `PROGETTI/woodentreehouse-foto/` (fuori dal repo), una sottocartella per area e una per tappa (`AAAA-MM Titolo`), istruzioni in `LEGGIMI.txt`
- Foto della home: ridotte a max 2880px, qualità 85 (non scendere sotto: la qualità delle foto è prioritaria)
- Header/footer condivisi di shop e galleria: `src/components/site/SiteHeader.tsx` e `SiteFooter.tsx`
- Nomi eventi: **Wooden Tree Night** (festa in Casetta) e **Wooden Tree Mobile** (Casetta Alcolica al carnevale di San Giovanni in Persiceto)
- La Casetta è stata costruita per la prima volta nel luglio 2012 (sfida dello zio William a Giova, giardino di Giova a San Giovanni in Persiceto)
- La Casetta Alcolica nasce nel 2018, al primo carnevale; migliorata 2019 e 2020 (casettina DJ), pausa Covid, ritorno con permessi Comune/Pro Loco (sotto l'arco)
- Jack = amico artista: Madre Natura (muro dietro la consolle), street art in Casetta, Portale per Point Of View al Social Hub (2024)
- WTN: 2016 e 2017 già Wooden Tree Night grandi; 2018; set. 2021 = APE in Casetta; 2022 = Vol. V; ott. 2022 = APE in Casetta / WTN Autumn Edition; 2023 = WTN 6; 2024 = WTN 7; WTN 8 (2025) solo su Drive
- Boiler Room: sezione Eventi (/galleria/boiler-room), edizioni dic. 2023, nov. 2024, dic. 2024, mar. 2025, apr. 2026
- Around the world: 01, 02, 05 = Lago di Resia; 03 = ferrata a Cortina; 04 = Predazzo; 06 = la Casetta
- La struttura verde con i tentacoli è la postazione DJ su ruote che va con la Casetta Alcolica
- Drive: cartella "WTH storia" e cartella grande "Casetta" condivise con link (anteprime: drive.google.com/thumbnail?id=ID&sz=w500, originali: drive.usercontent.google.com/download?id=ID&export=download&confirm=t)
- Tappe con `daConfermare: true` mostrano l'etichetta "Da confermare"
- Foto originali: `/Users/user/Desktop/Matte/Progettiamo/WTH/Foto/galleria_sito` e Drive "Computer > Il mio laptop > Casetta" (account woodentreehouse97, leggibile col connettore Drive ma le foto grandi non si scaricano da lì)

---

## Shop Fourthwall

Pannello: https://admin.fourthwall.com/store/wooden-tree-house/

Grafica (fatta settembre 2026, Site design):
- Colori: Primary `#1B3B2B`, Secondary `#7A6652`, Background `#F2F0E9`, Text `#121212`, Text over Primary/Secondary `#F2F0E9`
- Banner home con colori propri (testo e bottone `#F2F0E9`, testo bottone `#1B3B2B`), a tutta larghezza
- Font titoli Tinos Regular (simile a Times del sito), testi Inter
- Logo e favicon: logo del sito (ritagliato)
- Foto prodotti 4:5
- Testi home: "Lo shop / della Casetta", bottone "Scopri i prodotti", sezione "Gadget", testo "Sogni intagliati nel legno"
- Menu: Home · Prodotti · Il sito (link a www.woodentreehousesgp.com)

Pagina `/shop` sul nostro sito:
- `api/products.js` legge il catalogo dalla **Storefront API** di Fourthwall; il token sta in `FOURTHWALL_TOKEN` su Vercel (GitHub blocca il push se finisce nel codice), cache CDN 5 minuti
- `src/lib/fourthwall.ts` espone prodotti, prezzi in EUR e raggruppamento per colore
- Il pulsante Acquista apre `…/products/<slug>?variant=<id>`: sullo shop colore e taglia risultano già selezionati
- Carrello e pagamento restano su Fourthwall (il carrello via API non funziona)

Sezione "WTH around the world" (in fondo a /shop):
- dati in `src/content/around-the-world.ts` (foto, luogo, link al post Instagram, didascalia, data)
- schede stile post Instagram: griglia su desktop, carosello su telefono; ONLINE con 6 foto, link al profilo (mancano i link ai singoli post e i luoghi)
- foto da preparare con `npm run foto -- <cartella> around-the-world`

Prodotti e prezzi:
- Prodotti "on demand" (stampati da Printful/Fourthwall a ordine, spedizione 7-13 giorni)
- La valuta base è **USD**: i prezzi in EUR sono conversioni automatiche (Settings → Checkout → Local currencies), quindi non sono tondi e cambiano col cambio
- Nuove maglie: Products → Create new product → catalogo (es. Comfort Colors 1717 da $15.45, Bella+Canvas 3001 da $11.75)
- Maglie pubblicate: "Maglia WTH" (Black, Hemp, Blue Spruce — logo bianco) e "Maglia WTH Chiara" (Ivory, White — logo nero), Comfort Colors 1717, $33.78 (circa €30), guadagno $18.33
- Stampa: logo 9" centrato sul petto; file pronti in `public/logo-bianco.png` e `public/logo-nero.png`

---

## Pagine

| Route | File | Descrizione |
|---|---|---|
| `/` | `src/pages/home.tsx` | Landing page principale (unica pagina reale) |
| `/shop` | `src/pages/shop.tsx` | Shop: prodotti letti da Fourthwall, scheda con colori e taglie |
| `/galleria` | `src/pages/galleria.tsx` | Galleria: Realizzazioni + Eventi (IN BOZZA, non linkata) |
| `/galleria/:area` | `src/pages/galleria-area.tsx` | Pagina di un'area: modello "storia" o "progetti" |
| `/galleria/:area/:progetto` | `src/pages/galleria-area.tsx` | Singolo progetto (solo Allestimenti) |
| `/privacy-policy` | `src/pages/privacy-policy.tsx` | Privacy policy |
| `*` (fallback) | `src/pages/not-found.tsx` | Pagina 404 |

---

## Struttura Sezioni (Home)

La home è divisa in sezioni a scorrimento verticale con layout a griglia editoriale:

| ID | Titolo | Bg | Descrizione |
|---|---|---|---|
| Hero | — | Immagine full-screen | Parallax sticky con blur scroll-driven + form newsletter (Brevo via `/api/subscribe`) |
| `#casetta` | 01 — La Casetta | `brand-forest` (verde scuro) | Storia della casetta sull'albero, fondata luglio 2012. Link documentario YouTube |
| `#alcolica` | 02 — La Casetta Alcolica | `brand-yellow` (giallo caldo) | Bar mobile su ruote. Link Instagram. Est. 2014 |
| `#allestimenti` | 03 — Allestimenti & Collaborazioni | `brand-wood` (legno) | Set design e scenografie in legno per eventi. CTA WhatsApp |
| `#mostra-arte` | 03.5 — La Mostra Arte | `brand-forest` | Sezione art exhibition / collaborazioni creative |
| `#eventi` | 04 — I Nostri Eventi | `brand-forest` | Due card eventi: "Wooden Tree House" (Secret Party) e "Wooden Tree Mobile" (Itinerant/Public) |
| `#archive` | Gadget / Brand Equipment | `brand-wood` | Grid 4 prodotti merchandising: Maglie, Felpe Cappuccio, Felpe WTH, Cuffie WTH. Status: **ARCHIVED / OUT OF STOCK**. Bottone "Shop" → Fourthwall |
| Footer | — | `brand-offwhite` | Dati APS (P.IVA, PEC), Instagram, Privacy Policy, © 2013 |

---

## Componenti Chiave

### `src/pages/home.tsx`
Tutta la UI della landing vive qui (monolitico). Gestisce:
- Parallax hero con `useScroll` / `useTransform` di Framer Motion
- Header sticky con logo che si centra allo scroll
- Form newsletter → `POST /api/subscribe` → Brevo
- Toggle mobile per eventi e gadget (click su touch, hover su desktop)

### `src/components/sections/`
File presenti ma **non utilizzati** nella home attuale (il codice è inline in `home.tsx`):
`CostruzioniSection`, `EventsSection`, `Footer`, `Header`, `Hero`, `LaCasettaAlcolicaSection`, `LaCasettaSection`, `MerchGrid`, `SetDesignSection`, `StoryGallery`, `WoodenTreeMobileSection`, `WoodenTreeNightSection`

### `src/components/ui/`
Libreria completa shadcn/ui (Radix-based). Solo `Button` e `Toaster` sono attualmente usati nella home.

### `src/App.tsx`
Entry point con `QueryClientProvider`, `TooltipProvider`, `Toaster` e router Wouter.

---

## Brand Palette

| Token | Valore | Uso |
|---|---|---|
| `brand-smoke` | `#121212` | Testo principale |
| `brand-offwhite` | `#F2F0E9` | Background principale |
| `brand-forest` | `#1B3B2B` | Verde scuro (La Casetta, eventi) |
| `brand-wood` | `#7A6652` (muted warm brown) | Sezioni legno |
| `brand-yellow` | `#F5C73D` (warm yellow) | Accenti, La Casetta Alcolica |

---

## Asset

- **Logo:** `src/assets/images/logo-nero.png`
- **Immagini:** tutte `.webp` in `src/assets/images/`
- **OpenGraph:** `public/opengraph.jpg`
- **Favicon:** `public/favicon.png`

---

## Link Esterni

| Servizio | URL |
|---|---|
| Instagram | https://www.instagram.com/wooden_tree_house/ |
| Documentario YouTube | https://youtu.be/Z491JyyrQB0 |
| WhatsApp contatti | https://wa.me/34632854055 |
| Newsletter | Brevo, lista ID 2 (via `api/subscribe.js`) |
| Shop | https://wooden-tree-house-shop.fourthwall.com/en-eur |
