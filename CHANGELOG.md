# Changelog

Semua perubahan penting pada proyek belajar-sql dicatat di file ini. Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- `vercel.json` — konfigurasi deploy static ke Vercel: `buildCommand`/`outputDirectory` eksplisit, `Content-Type: application/wasm` + caching untuk `/wasm/*`, cache immutable untuk aset `/_astro/*` dan `/images/*`, serta security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy` dengan `wasm-unsafe-eval` di `script-src` agar sql.js/WebAssembly bisa di-instantiate di bawah CSP ketat)
- `package.json`: field `engines.node: "22.x"` agar Vercel memakai versi Node yang sama dengan environment development (Volta)
- `CHANGELOG.md` untuk mencatat riwayat perubahan proyek

## [0.1.0-beta.1] - 2026-07-04

Rilis awal — adaptasi arsitektur dari [belajar-python](https://github.com/zedfar/belajar-python) ke kurikulum SQL, dengan perubahan mendasar pada engine eksekusi kode.

### Added
- Scaffold Astro v7 + React islands + TypeScript (strict) + Tailwind v4, mengikuti struktur belajar-python (layouts, komponen ui/layout/learn/common, i18n, routing `[lang]/learn/[unit]/[lesson]`)
- **sql.js (SQLite via WebAssembly)** sebagai engine eksekusi query — menggantikan total arsitektur Judge0 (server proxy + API key + rate limiter) milik belajar-python; query berjalan 100% di browser, tanpa server dan tanpa biaya eksekusi
  - `src/lib/sql-engine.ts`: `loadSqlJs`, `createDatabase`, `runQuery`, formatter pesan
  - `scripts/copy-sql-wasm.mjs`: copy semua varian `.wasm` sql.js ke `public/wasm/` via `predev`/`prebuild`
  - `src/components/learn/SqlPlayground.tsx`: playground React island dengan CodeMirror 6 (`@codemirror/lang-sql`, dialect SQLite), reset in-memory database instan, panel hasil berbentuk tabel
  - `src/components/learn/ResultTable.tsx`: render `QueryExecResult` sebagai tabel HTML, dengan cap baris dan pesan truncation
  - `src/lib/compare-results.ts`: `compareQueryResults` — perbandingan row-set (multiset) untuk auto-grading exercise `code-output`, order-insensitive secara default dengan opsi `strictOrder`
  - `src/data/sample-databases.ts`: database contoh `toko_buku` (tabel `buku`, 12 baris) dipakai konsisten di seluruh Unit 1; `sekolah`/`perpustakaan` distub untuk unit mendatang
- Komponen `Exercise.tsx` dengan 4 tipe (`multiple-choice`, `fill-blank`, `code-output`, `free-code`) — `code-output` memakai `expectedQuery`/`expectedResult` dan dieksekusi live terhadap database yang sama
- Kurikulum 7 unit terdaftar di `src/lib/curriculum.ts`; **Unit 0 (Persiapan, 3 lesson)** dan **Unit 1 (SELECT Dasar, 8 lesson)** dengan konten lengkap bilingual ID/EN (22 file MDX), Unit 2-6 sebagai roadmap kosong (`isAvailable: false`)
- Halaman: home, curriculum, glossary, playground standalone, progress, about, lesson pages, 404 — seluruhnya statically generated (tanpa adapter server)
- Glosarium SQL bilingual (`src/data/glossary.ts`) dengan 6 kategori (dasar, query, operator, agregasi, join, skema)
- 10 diagram SVG adaptif dark/light mode (anatomi tabel, alur WHERE, urutan evaluasi query, ASC/DESC, LIMIT/OFFSET, DISTINCT, dll) plus hero illustration
- Progress tracking di localStorage (`belajar-sql-progress`): completed lessons, streak harian, badge pencapaian
- 83 unit test (Vitest): `progress`, `i18n`, `sql-engine` (dijalankan terhadap sql.js Node build), `compare-results`
- E2E smoke test (Playwright) mencakup home, curriculum, lesson, playground, glossary, progress, navigation, SEO

### Changed (dari arsitektur belajar-python)
- Output Astro: `server`/adapter Vercel → **static** sepenuhnya (tidak ada lagi kebutuhan SSR karena eksekusi kode sudah client-side)
- `src/pages/index.astro`: redirect bahasa berbasis `Accept-Language` header (SSR) → redirect client-side berbasis `navigator.language` (kompatibel static hosting)
- OG image: generasi dinamis via `@vercel/og` → SVG statis (`og-default.svg`) karena tidak ada lagi server function

### Fixed
- `scripts/copy-sql-wasm.mjs`: perbaikan awal hanya meng-copy `sql-wasm.wasm`, padahal Vite dapat me-resolve varian `sql-wasm-browser.js` yang membutuhkan file `.wasm` dengan nama berbeda (`sql-wasm-browser.wasm`) — menyebabkan 404 dan playground gagal total baik di dev server maupun production build. Diperbaiki dengan meng-copy seluruh varian `.wasm` di `node_modules/sql.js/dist/`
