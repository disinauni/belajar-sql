/**
 * Named sample databases shared across lessons within a unit, so students build
 * familiarity with one schema before moving on. `toko_buku` (Unit 1-3) stays a
 * single flat table on purpose; `perpustakaan` (Unit 4+) is a separate, already
 * normalized 3-table schema used to teach JOIN without touching toko_buku's
 * shape (Unit 0-1 lessons already rely on its exact columns).
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

  // Unit 4 (JOIN) onward: a normalized 3-table schema, separate from toko_buku,
  // so JOIN can be taught with realistic FK relationships without touching the
  // schema Unit 0-1 already relies on. `tanggal_kembali` is nullable — a loan
  // still out has no return date yet, which doubles as a natural LEFT JOIN /
  // WHERE ... IS NULL example ("who hasn't returned their book").
  perpustakaan: `
CREATE TABLE anggota (
  id INTEGER PRIMARY KEY,
  nama TEXT NOT NULL,
  kelas TEXT NOT NULL
);

CREATE TABLE buku (
  id INTEGER PRIMARY KEY,
  judul TEXT NOT NULL,
  penulis TEXT NOT NULL,
  stok INTEGER NOT NULL
);

CREATE TABLE peminjaman (
  id INTEGER PRIMARY KEY,
  anggota_id INTEGER NOT NULL REFERENCES anggota(id),
  buku_id INTEGER NOT NULL REFERENCES buku(id),
  tanggal_pinjam TEXT NOT NULL,
  tanggal_kembali TEXT
);

INSERT INTO anggota (id, nama, kelas) VALUES
  (1, 'Dewi', '10A'),
  (2, 'Farhan', '10B'),
  (3, 'Citra', '11A'),
  (4, 'Budi', '11B'),
  (5, 'Eka', '12A'),
  (6, 'Gilang', '12B');

INSERT INTO buku (id, judul, penulis, stok) VALUES
  (1, 'Laskar Pelangi', 'Andrea Hirata', 3),
  (2, 'Bumi Manusia', 'Pramoedya Ananta Toer', 2),
  (3, 'Sapiens', 'Yuval Noah Harari', 1),
  (4, 'Atomic Habits', 'James Clear', 4),
  (5, 'Clean Code', 'Robert C. Martin', 2),
  (6, 'Filosofi Teras', 'Henry Manampiring', 3),
  (7, 'Pulang', 'Tere Liye', 0),
  (8, 'Negeri 5 Menara', 'Ahmad Fuadi', 5);

INSERT INTO peminjaman (id, anggota_id, buku_id, tanggal_pinjam, tanggal_kembali) VALUES
  (1, 1, 1, '2026-05-01', '2026-05-10'),
  (2, 1, 3, '2026-05-15', NULL),
  (3, 2, 2, '2026-05-03', '2026-05-12'),
  (4, 2, 4, '2026-05-20', NULL),
  (5, 3, 1, '2026-05-05', '2026-05-14'),
  (6, 4, 7, '2026-05-18', NULL),
  (7, 4, 5, '2026-04-01', '2026-04-15'),
  (8, 5, 6, '2026-05-22', NULL);
`.trim(),
} as const

export type SampleDatabaseId = keyof typeof SAMPLE_DATABASES
