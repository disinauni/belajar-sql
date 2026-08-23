# Changelog

Semua perubahan penting pada proyek belajar-sql dicatat di file ini. Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- **Kurikulum lengkap Unit 2-6** (33 lesson baru × ID/EN = 66 file MDX), melengkapi roadmap yang sebelumnya kosong:
  - **Unit 2 — Filtering & Operator** (6 lesson): `AND`/`OR`/`NOT`, `LIKE` & wildcard, `IN`, `BETWEEN`, `NULL`/`COALESCE`, proyek mini filter lanjutan
  - **Unit 3 — Agregasi & GROUP BY** (7 lesson): `COUNT`, `SUM`/`AVG`, `MIN`/`MAX`, `GROUP BY`, `HAVING`, urutan klausa F-W-G-H-O-L lengkap, proyek mini laporan penjualan
  - **Unit 4 — JOIN** (7 lesson): konsep JOIN & Foreign Key, `INNER JOIN`, `LEFT JOIN`, JOIN 3+ tabel, Self JOIN, kondisi `ON` vs `WHERE` lanjutan, proyek mini sistem perpustakaan
  - **Unit 5 — Subquery & CTE** (6 lesson): subquery di `WHERE`/`SELECT`/`FROM`, `IN`+subquery, `EXISTS`/`NOT EXISTS`, CTE (`WITH`) & `UNION`, proyek mini analisis data
  - **Unit 6 — Modifikasi Data & Skema** (7 lesson): `INSERT`, `UPDATE`, `DELETE`, `CREATE TABLE`, constraint (`PRIMARY KEY`/`FOREIGN KEY`/`NOT NULL`/`UNIQUE`/`DEFAULT`/`CHECK`), `ALTER`/`DROP TABLE`, final project capstone
- `src/data/sample-databases.ts`: database `perpustakaan` dibangun penuh (3 tabel relasional: `anggota`, `buku`, `peminjaman`) untuk mengajarkan JOIN tanpa mengubah skema `toko_buku` yang sudah dipakai Unit 0-1
- `src/data/glossary.ts`: kategori baru `lanjutan` (Subquery & Lanjutan) plus istilah baru — `COALESCE`, `Self JOIN`, `Subquery`, `CTE`, `UNION`, `EXISTS`, `NOT NULL`, `UNIQUE`, `DEFAULT`, `CHECK`, `ALTER TABLE`
- 10 diagram SVG baru untuk Unit 2-6 (operator logika, wildcard LIKE, fungsi agregat, GROUP BY/HAVING, INNER vs LEFT JOIN, join multi-tabel, subquery nesting, CTE/UNION, siklus CRUD, constraint)
- `vercel.json` — konfigurasi deploy static ke Vercel: `buildCommand`/`outputDirectory` eksplisit, `Content-Type: application/wasm` + caching untuk `/wasm/*`, cache immutable untuk aset `/_astro/*` dan `/images/*`, serta security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy` dengan `wasm-unsafe-eval` di `script-src` agar sql.js/WebAssembly bisa di-instantiate di bawah CSP ketat)
- `package.json`: field `engines.node: "22.x"` agar Vercel memakai versi Node yang sama dengan environment development (Volta)
- `CHANGELOG.md` untuk mencatat riwayat perubahan proyek

- `.github/workflows/ci.yml`: CI on push/PR ke `main` — typecheck, unit test (vitest), build, dan E2E test (Playwright) sebelum deploy; tanpa secrets Judge0 karena sql.js berjalan 100% client-side
- `public/og-default.png`: versi PNG dari `og-default.svg` untuk kompatibilitas social preview (Facebook/X/WhatsApp/LinkedIn tidak merender SVG untuk `og:image`)

### Changed
- `src/lib/curriculum.ts`: Unit 2-6 diubah dari `isAvailable: false, lessons: []` menjadi kurikulum penuh dengan `projectTitle` nyata per unit
- `src/lib/progress.ts`: `UNIT_LESSON_COUNTS` diperluas mencakup unit-2 s/d unit-6 agar badge "Unit N Selesai" berfungsi benar
- `README.md`: tabel kurikulum diperbarui — semua 7 unit kini ✅ Tersedia (44 lesson total)
- `src/layouts/BaseLayout.astro`, `src/components/common/SEOHead.astro`: `og:image`/`twitter:image` kini menunjuk ke `og-default.png`, bukan `.svg`
- `playwright.config.ts`: di CI, e2e test menjalankan `astro preview` (build produksi) alih-alih `astro dev`, dan `workers: 1` untuk menghindari flaky test akibat kontensi pada satu server dev

### Fixed
- `src/components/learn/Exercise.tsx`: pengecekan truthy `schema ? {...} : {}` sebelumnya menggugurkan `schema=""` (dipakai lesson Unit 6 dengan database kosong), membuat `SqlPlayground` diam-diam jatuh ke database default `toko_buku` — diganti jadi `schema !== undefined`
- 16 file lesson Unit 4/5 (ID+EN) lupa menyertakan prop `database="perpustakaan"` langsung pada komponen `<Exercise>` (hanya ada di frontmatter, yang tidak fungsional) — menyebabkan error `no such table` saat exercise dijalankan
- `src/lib/sql-engine.ts`: `runQuery` salah menampilkan pesan "N baris terpengaruh" (stale, dari `getRowsModified()`) untuk `SELECT` yang hasilnya 0 baris — sekarang dideteksi lewat `isSelectLikeStatement` agar tidak disamakan dengan statement DML/DDL
- `src/__tests__/e2e/smoke.test.ts`: locator `h1` yang tidak di-scope bentrok dengan elemen `<h1>` di shadow DOM Astro dev toolbar (strict-mode violation) — diperbaiki jadi `main h1`
- `npm audit`: `undici` (transitif lewat `jsdom`, devDependency-only) di-patch lewat `npm audit fix` non-forced (6 → 1 high severity). Sisa 1 finding butuh `jsdom` 30.x (major bump), dibiarkan karena cuma dipakai environment test `vitest`, tidak pernah jalan di production.
- **Vercel production build berisiko gagal** ("no longer installed by default now that Sätteri is the default Markdown processor") — `@astrojs/markdown-remark` cuma ke-resolve transitif (via `@astrojs/mdx` dan `astro` di versi berbeda, tidak ter-hoist ke top-level) padahal `astro.config.mjs` butuh itu untuk config `markdown.remarkPlugins`. Dipasang sebagai dependency langsung sebelum sempat benar-benar gagal di production (ditemukan proaktif setelah belajar-python mengalaminya).

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
