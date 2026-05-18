# Wooden Tree House — PROJECT.md

## Repository GitHub
https://github.com/bolalocasrl/woodentreehouse.git

## URL Vercel
Non ancora configurato (nessun file `vercel.json` presente nel progetto).

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

Progetto **landing page** monopagina per il brand Wooden Tree House. Frontend-only, nessun backend.

Commit recenti:
- `ottimizzazione immagini webp` — immagini convertite in .webp
- `fix: parallax e newsletter visibili` — fix hero scroll/parallax + form iscrizione
- `first commit - woodentreehouse`

---

## Pagine

| Route | File | Descrizione |
|---|---|---|
| `/` | `src/pages/home.tsx` | Landing page principale (unica pagina reale) |
| `*` (fallback) | `src/pages/not-found.tsx` | Pagina 404 |

---

## Struttura Sezioni (Home)

La home è divisa in sezioni a scorrimento verticale con layout a griglia editoriale:

| ID | Titolo | Bg | Descrizione |
|---|---|---|---|
| Hero | — | Immagine full-screen | Parallax sticky con blur scroll-driven + form newsletter Google Forms |
| `#casetta` | 01 — La Casetta | `brand-forest` (verde scuro) | Storia della casetta sull'albero, fondata luglio 2012. Link documentario YouTube |
| `#alcolica` | 02 — La Casetta Alcolica | `brand-yellow` (giallo caldo) | Bar mobile su ruote. Link Instagram. Est. 2014 |
| `#allestimenti` | 03 — Allestimenti & Collaborazioni | `brand-wood` (legno) | Set design e scenografie in legno per eventi. CTA WhatsApp |
| `#mostra-arte` | 03.5 — La Mostra Arte | `brand-forest` | Sezione art exhibition / collaborazioni creative |
| `#eventi` | 04 — I Nostri Eventi | `brand-forest` | Due card eventi: "Wooden Tree House" (Secret Party) e "Wooden Tree Mobile" (Itinerant/Public) |
| `#archive` | Gadget / Brand Equipment | `brand-wood` | Grid 4 prodotti merchandising: Maglie, Felpe Cappuccio, Felpe WTH, Cuffie WTH. Status: **ARCHIVED / OUT OF STOCK** |
| Footer | — | `brand-offwhite` | Link Instagram + copyright |

---

## Componenti Chiave

### `src/pages/home.tsx`
Tutta la UI della landing vive qui (monolitico). Gestisce:
- Parallax hero con `useScroll` / `useTransform` di Framer Motion
- Header sticky con logo che si centra allo scroll
- Form newsletter → Google Forms (POST `no-cors`)
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
| `brand-wood` | Muted warm brown | Sezioni legno |
| `brand-yellow` | Warm yellow | Accenti, La Casetta Alcolica |

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
| Newsletter (Google Forms) | form ID: `1FAIpQLSc3uQ4qNSTqXCH3Bxze80htz5rrxCMEjvOVZX1y3XZv3ks1ag` |
