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
- Restyling grafico shop Fourthwall coerente con il sito

---

## Pagine

| Route | File | Descrizione |
|---|---|---|
| `/` | `src/pages/home.tsx` | Landing page principale (unica pagina reale) |
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
