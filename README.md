<div align="center">

  <img src="public/favicon.svg" width="64" height="64" alt="Belajar SQL Logo" />

  <h1>Belajar SQL</h1>

  <p>Platform pembelajaran SQL gratis, interaktif, dan bilingual untuk siswa SMP & SMA Indonesia.</p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
  [![Version](https://img.shields.io/badge/version-v0.1.0--beta.1-orange)](#)
  [![Astro](https://img.shields.io/badge/Astro-v7-FF5D01?logo=astro&logoColor=white)](https://astro.build)
  [![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
  [![sql.js](https://img.shields.io/badge/sql.js-SQLite%2FWASM-003B57?logo=sqlite&logoColor=white)](https://sql.js.org)

</div>

---

## Tentang Project

**Belajar SQL** hadir untuk mengisi kekosongan tutorial SQL modern dalam Bahasa Indonesia. Platform ini mengajarkan SQL dari nol, langsung bisa dicoba di browser tanpa install database apapun.

**Ditujukan untuk:**
- Siswa SMP & SMA yang belajar SQL untuk pertama kali
- Siapapun yang ingin memahami database relasional dalam Bahasa Indonesia
- Persiapan dasar sebelum belajar backend development / data analysis

Project ini adalah adaptasi dari [**Belajar Python**](https://github.com/zedfar/belajar-python) — arsitektur, struktur konten, dan pendekatan pembelajarannya sama, hanya materinya diganti dari Python ke SQL, dan engine eksekusi kode diganti total dari Judge0 (server proxy) menjadi **sql.js** (SQLite via WebAssembly, 100% client-side).

---

## Fitur

- **Query Interaktif** — Jalankan query SQL langsung di browser lewat SQLite (WebAssembly), tanpa server dan tanpa API key
- **Exercise per lesson** — Setiap lesson punya latihan interaktif (fill-blank, multiple-choice, code-output) dengan hint dan penjelasan
- **Bilingual** — Konten tersedia dalam Bahasa Indonesia dan English
- **Progresif** — Kurikulum terstruktur dari SELECT dasar hingga JOIN dan subquery, 1 proyek mini per unit
- **Gratis** — Selamanya, tanpa akun, tanpa iklan
- **Mobile-friendly** — Responsif dari desktop hingga HP Android low-end
- **Dark mode** — Tampilan nyaman di malam hari, didukung diagram SVG adaptive
- **Diagram visual** — Konsep kunci dijelaskan dengan ilustrasi SVG (anatomi tabel, alur WHERE, ORDER BY, LIMIT/OFFSET, dst)
- **Progress tracking** — Pantau kemajuan belajar, streak harian, dan badge pencapaian secara lokal (localStorage)
- **Glosarium** — Kamus istilah SQL bilingual dengan definisi, contoh query, dan tautan antar istilah
- **Aksesibel** — WCAG 2.1 compliant: skip link, ARIA roles, live regions, keyboard navigable

---

## Kurikulum

| Unit | Topik | Lessons | Status |
|------|-------|:-------:|--------|
| 0 | Persiapan | 3 | ✅ Tersedia |
| 1 | SELECT Dasar | 8 | ✅ Tersedia |
| 2 | Filtering & Operator | — | 🚧 Segera Hadir |
| 3 | Agregasi & GROUP BY | — | 🚧 Segera Hadir |
| 4 | JOIN | — | 🚧 Segera Hadir |
| 5 | Subquery & CTE | — | 🚧 Segera Hadir |
| 6 | Modifikasi Data & Skema | — | 🚧 Segera Hadir |

**11 lessons tersedia** (Unit 0-1) · ~4 jam belajar · roadmap 7 unit penuh

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | [Astro v7](https://astro.build) + React islands |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Code Editor | CodeMirror 6 (`@codemirror/lang-sql`, dialect SQLite) |
| Syntax Highlight | Shiki (one-dark-pro theme) |
| MDX Directives | remark-directive |
| **Query Execution** | **[sql.js](https://sql.js.org)** — SQLite dikompilasi ke WebAssembly, **100% berjalan di browser**, tanpa server/API key |
| Unit Testing | Vitest + jsdom |
| E2E Testing | Playwright |
| Deployment | Static hosting apapun (Vercel, Netlify, Cloudflare Pages, dll) |

> **Kenapa tidak Judge0 seperti Belajar Python?** SQL butuh *state* (tabel & data) yang di-reset ulang tiap lesson. sql.js bisa melakukan ini secara instan, in-memory, tanpa round-trip jaringan — sehingga arsitektur project ini justru lebih sederhana dari versi Python: tidak ada server API, tidak ada rate limiting, tidak ada biaya eksekusi kode.

---

## Memulai Development

### Prerequisites

- Node.js 22+

### Instalasi

```bash
# Clone repository
git clone https://github.com/zedfar/belajar-sql.git
cd belajar-sql

# Install dependencies (otomatis meng-copy sql-wasm.wasm ke public/wasm/)
npm install

# Jalankan development server
npm run dev
```

Buka **http://localhost:4321** di browser.

### Scripts

```bash
npm run dev        # Development server (localhost:4321)
npm run build      # Production build (static)
npm run preview    # Preview production build
npm run typecheck  # TypeScript type checking
npm test           # Unit tests (vitest)
npm run test:e2e   # E2E tests (playwright) — butuh dev server aktif
```

---

## Struktur Project

```
belajar-sql/
├── public/
│   ├── images/              # SVG diagrams (anatomi tabel, alur WHERE, ORDER BY, dst)
│   ├── wasm/                # sql-wasm.wasm (generated by scripts/copy-sql-wasm.mjs, gitignored)
│   ├── robots.txt
│   └── og-default.svg
├── scripts/
│   └── copy-sql-wasm.mjs    # Copy sql.js WASM binary ke public/wasm/ (predev/prebuild)
├── src/
│   ├── __tests__/
│   │   ├── lib/             # Unit tests — progress, i18n, sql-engine, compare-results
│   │   └── e2e/             # E2E smoke tests (Playwright)
│   ├── components/
│   │   ├── ui/              # Button, Card, Tabs
│   │   ├── layout/           # Header, Sidebar, Footer, MobileNav
│   │   ├── learn/            # SqlPlayground, ResultTable, Exercise, QuizCard, InfoBox
│   │   └── common/           # ThemeToggle, LanguageToggle, TableOfContents
│   ├── content/
│   │   ├── lessons-id/       # Lesson Bahasa Indonesia (MDX, unit-0 & unit-1)
│   │   └── lessons-en/       # Lesson English (MDX, unit-0 & unit-1)
│   ├── data/
│   │   ├── glossary.ts       # Istilah SQL bilingual untuk halaman Glosarium
│   │   └── sample-databases.ts  # Skema + seed data (toko_buku, dst) untuk playground
│   ├── layouts/               # BaseLayout, PageLayout, LessonLayout
│   ├── lib/                   # i18n, progress, curriculum, sql-engine, compare-results
│   ├── pages/                  # File-based routing Astro
│   │   └── [lang]/            # /id/* dan /en/* — curriculum, glossary, lesson, playground, progress
│   ├── plugins/                # Custom remark plugins (infobox directives)
│   ├── styles/                 # global.css
│   └── types/                  # TypeScript type definitions
├── vitest.config.ts
├── playwright.config.ts
└── tailwind.config.ts
```

---

## Berkontribusi

Kontribusi sangat welcome! Beberapa cara untuk berkontribusi:

- 🐛 **Laporkan bug** — Buka issue di GitHub
- ✍️ **Tulis lesson** — Unit 2-6 masih roadmap kosong (lihat `src/lib/curriculum.ts`), tambah konten di `src/content/lessons-id/`
- 🌐 **Terjemahan** — Bantu terjemahkan lesson ke English di `src/content/lessons-en/`
- 💡 **Saran fitur** — Diskusikan di Issues

### Menulis Lesson Baru

Lesson ditulis dalam format MDX di `src/content/lessons-id/unit-X/`:

```markdown
---
title: "Judul Lesson"
unit: 1
lesson: 8
description: "Deskripsi singkat"
objectives:
  - "Tujuan pembelajaran 1"
estimatedTime: 30
difficulty: "beginner"
tags: ["tag1", "tag2"]
database: "toko_buku"
---

# Judul Lesson

Konten lesson...

:::tip
Gunakan directive ini untuk callout penting.
:::
```

Setiap lesson sebaiknya menyertakan minimal 2 **Exercise interaktif** di bagian akhir:

```mdx
import { Exercise } from '@/components/learn/Exercise'

<Exercise client:load
  id="u1l8-ex1"
  title="Judul Exercise"
  description="Pertanyaan atau instruksi"
  type="code-output"
  starterCode="SELECT * FROM buku;"
  expectedQuery="SELECT judul FROM buku WHERE harga > 50000;"
  hints={["Petunjuk 1", "Petunjuk 2"]}
  explanation="Penjelasan jawaban yang benar"
  lang="id"
/>
```

Tipe exercise yang tersedia: `multiple-choice`, `fill-blank`, `code-output`, `free-code`. Untuk `code-output`, `expectedQuery` dijalankan langsung terhadap database yang sama (row-set comparison, order-insensitive secara default — tambahkan prop `strictOrder` untuk lesson yang membahas `ORDER BY`).

---

## Lisensi

Dirilis di bawah [MIT License](./LICENSE). Bebas digunakan, dimodifikasi, dan didistribusikan.

---

<div align="center">
  <sub>Dibuat dengan ❤️ untuk pelajar Indonesia</sub>
</div>
