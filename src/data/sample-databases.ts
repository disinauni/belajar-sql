/**
 * Named sample databases shared across lessons within a unit, so students build
 * familiarity with one schema before moving on (e.g. JOINs in Unit 4 introduce a
 * normalized version of `toko_buku` split across multiple tables).
 */

export const SAMPLE_DATABASES = {
  // Unit 1 (SELECT Dasar): single flat table, no FK/JOIN needed yet.
  toko_buku: `
CREATE TABLE buku (
  id INTEGER PRIMARY KEY,
  judul TEXT NOT NULL,
  penulis TEXT NOT NULL,
  kategori TEXT NOT NULL,
  harga INTEGER NOT NULL,
  stok INTEGER NOT NULL,
  tahun_terbit INTEGER NOT NULL
);

INSERT INTO buku (id, judul, penulis, kategori, harga, stok, tahun_terbit) VALUES
  (1, 'Laskar Pelangi', 'Andrea Hirata', 'Fiksi', 68000, 12, 2005),
  (2, 'Bumi Manusia', 'Pramoedya Ananta Toer', 'Fiksi', 85000, 5, 1980),
  (3, 'Filosofi Teras', 'Henry Manampiring', 'Pengembangan Diri', 89000, 20, 2018),
  (4, 'Sapiens', 'Yuval Noah Harari', 'Non-Fiksi', 110000, 8, 2011),
  (5, 'Atomic Habits', 'James Clear', 'Pengembangan Diri', 95000, 15, 2018),
  (6, 'Negeri 5 Menara', 'Ahmad Fuadi', 'Fiksi', 72000, 0, 2009),
  (7, 'Cantik Itu Luka', 'Eka Kurniawan', 'Fiksi', 78000, 6, 2002),
  (8, 'Belajar SQL untuk Pemula', 'Tim Belajar SQL', 'Teknologi', 55000, 30, 2023),
  (9, 'Clean Code', 'Robert C. Martin', 'Teknologi', 120000, 4, 2008),
  (10, 'Ayat-Ayat Cinta', 'Habiburrahman El Shirazy', 'Fiksi', 60000, 10, 2004),
  (11, 'Pulang', 'Tere Liye', 'Fiksi', 65000, 9, 2015),
  (12, 'Rich Dad Poor Dad', 'Robert Kiyosaki', 'Keuangan', 98000, 11, 1997);
`.trim(),

  // Reserved for Unit 2/3 (filtering, aggregation) — stubbed until those units are built.
  sekolah: `
CREATE TABLE siswa (
  id INTEGER PRIMARY KEY,
  nama TEXT NOT NULL,
  kelas TEXT NOT NULL,
  nilai INTEGER NOT NULL
);
`.trim(),

  // Reserved for Unit 4/5/6 (JOIN, subquery, schema) — stubbed until those units are built.
  perpustakaan: `
CREATE TABLE anggota (
  id INTEGER PRIMARY KEY,
  nama TEXT NOT NULL
);
`.trim(),
} as const

export type SampleDatabaseId = keyof typeof SAMPLE_DATABASES
