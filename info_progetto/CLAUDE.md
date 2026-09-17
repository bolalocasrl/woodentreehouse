# CLAUDE.md — Profilo operativo

Questo file descrive come lavoro e come devi aiutarmi. Leggilo sempre all'inizio di ogni chat.

---

## Chi sono

Non sono uno sviluppatore tecnico. Uso l'AI come copilota per costruire e gestire siti web. Ho un flusso di lavoro consolidato che funziona bene e voglio mantenerlo.

---

## Il mio setup

- **Editor:** Visual Studio Code (locale)
- **Repository:** GitHub (collegato a Claude)
- **Deploy:** Vercel (automatico — ogni push su `main` → deploy in ~1 minuto, collegato a Claude)
- **Database:** Supabase (solo per progetti che lo richiedono, collegato a Claude)
- **Package manager:** npm
- **Stack:** React, Vite, TypeScript, Tailwind CSS, shadcn/ui, framer-motion
- **AI in VS Code:** Claude Code (estensione)

---

## Il mio workflow

Lavoro quasi sempre direttamente dentro Claude Code in VS Code.
Claude Code può fare tutto in autonomia: modificare file, fare git push, eseguire query Supabase.

Flusso standard:
1. Apro il progetto in VS Code
2. Apro Claude Code e carico il contesto: "Leggi CLAUDE.md e PROJECT.md nella cartella info_progetto"
3. Do istruzioni in linguaggio normale
4. Claude Code modifica i file, committa e pusha da solo
5. Vercel deploya automaticamente in ~1 minuto
6. Verifico il risultato online

---

## Come devi aiutarmi

- **Istruzioni sempre passo per passo** — nessun passaggio dato per scontato
- **Dimmi sempre quale file aprire** e dove si trova
- **Un problema alla volta** — non fare più modifiche in parallelo senza dirmelo
- **Se ci sono più modi per fare una cosa, scegli il più semplice**
- **Avvisami sempre prima di fare modifiche che potrebbero rompere qualcosa**
- **Quando fai git push, dimmi sempre cosa hai committato e con quale messaggio**

---

## Regole per Supabase

Supabase contiene dati reali. Prima di qualsiasi operazione sul database:
- **Mostrami sempre la query prima di eseguirla** — non eseguire mai senza conferma
- **Non cancellare mai dati** senza conferma esplicita da parte mia
- **Non modificare la struttura delle tabelle** senza discuterne prima
- Per le letture (SELECT) puoi procedere liberamente

---

## Note importanti

- I miei progetti sono tutti **frontend puri**, tranne `safety_house` e `lifeos` che usano Supabase
- Ogni progetto ha la sua cartella dentro `PROGETTI/` sul mio Mac
- Ogni progetto ha una cartella `info_progetto/` con `CLAUDE.md` e `PROJECT.md`
- Il deploy avviene sempre da `main` — non usare altri branch salvo diversa indicazione
