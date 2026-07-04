export type GlossaryCategory = 'dasar' | 'query' | 'operator' | 'agregasi' | 'join' | 'lanjutan' | 'skema'

export interface GlossaryTerm {
  term: string
  termEn?: string       // English name if different
  category: GlossaryCategory
  definition: {
    id: string
    en: string
  }
  example?: string      // Short SQL snippet
  seeAlso?: string[]    // Other term keys
  unit?: number         // first introduced in which unit
}

export const CATEGORY_ORDER: GlossaryCategory[] = ['dasar', 'query', 'operator', 'agregasi', 'join', 'lanjutan', 'skema']

export const CATEGORY_LABELS: Record<GlossaryCategory, { id: string; en: string }> = {
  dasar: { id: 'Dasar-Dasar', en: 'Fundamentals' },
  query: { id: 'Klausa Query', en: 'Query Clauses' },
  operator: { id: 'Operator', en: 'Operators' },
  agregasi: { id: 'Agregasi & GROUP BY', en: 'Aggregation & GROUP BY' },
  join: { id: 'JOIN', en: 'JOIN' },
  lanjutan: { id: 'Subquery & Lanjutan', en: 'Subqueries & Advanced' },
  skema: { id: 'Skema Database', en: 'Database Schema' },
}

export const GLOSSARY: GlossaryTerm[] = [
  // ── DASAR ────────────────────────────────────────────────────
  {
    term: 'Database',
    category: 'dasar',
    definition: {
      id: 'Kumpulan data yang terorganisir secara terstruktur, biasanya dalam bentuk tabel, sehingga mudah disimpan, dicari, dan diubah.',
      en: 'An organized, structured collection of data, usually stored as tables, so it can be easily stored, searched, and modified.',
    },
  },
  {
    term: 'SQL',
    termEn: 'Structured Query Language',
    category: 'dasar',
    definition: {
      id: 'Bahasa standar untuk berkomunikasi dengan database relasional — untuk mengambil, menambah, mengubah, atau menghapus data.',
      en: 'The standard language for communicating with a relational database — to retrieve, add, change, or delete data.',
    },
    example: 'SELECT * FROM buku;',
  },
  {
    term: 'RDBMS',
    termEn: 'Relational Database Management System',
    category: 'dasar',
    definition: {
      id: 'Perangkat lunak yang mengelola database relasional (tabel-tabel yang saling berhubungan). Contoh: SQLite, MySQL, PostgreSQL.',
      en: 'Software that manages a relational database (interconnected tables). Examples: SQLite, MySQL, PostgreSQL.',
    },
  },
  {
    term: 'SQLite',
    category: 'dasar',
    definition: {
      id: 'RDBMS ringan yang berjalan tanpa server terpisah (embedded) — seluruh database hidup dalam satu file atau bahkan di memori. Dipakai di playground kursus ini lewat WebAssembly (sql.js), sehingga berjalan 100% di browser.',
      en: 'A lightweight RDBMS that runs without a separate server (embedded) — the entire database lives in a single file or even in memory. Used in this course\'s playground via WebAssembly (sql.js), running 100% in the browser.',
    },
    seeAlso: ['RDBMS'],
  },
  {
    term: 'Tabel',
    termEn: 'Table',
    category: 'dasar',
    definition: {
      id: 'Struktur penyimpanan data berbentuk baris dan kolom, seperti spreadsheet — tapi dengan aturan tipe data yang ketat per kolom.',
      en: 'A data storage structure of rows and columns, like a spreadsheet — but with strict data type rules per column.',
    },
  },
  {
    term: 'Baris',
    termEn: 'Row',
    category: 'dasar',
    definition: {
      id: 'Satu record/entri data dalam tabel. Disebut juga "tuple" dalam istilah database relasional.',
      en: 'One data record/entry in a table. Also called a "tuple" in relational database terminology.',
    },
  },
  {
    term: 'Kolom',
    termEn: 'Column',
    category: 'dasar',
    definition: {
      id: 'Satu atribut/field data dalam tabel, dengan nama dan tipe data tertentu (misalnya `harga INTEGER`).',
      en: 'One attribute/field of data in a table, with a specific name and data type (e.g. `harga INTEGER`).',
    },
  },
  {
    term: 'Query',
    category: 'dasar',
    definition: {
      id: 'Perintah SQL yang dikirim ke database untuk mengambil atau mengubah data.',
      en: 'A SQL statement sent to the database to retrieve or modify data.',
    },
  },
  {
    term: 'Result Set',
    category: 'dasar',
    definition: {
      id: 'Data yang dikembalikan oleh sebuah query SELECT, berbentuk tabel sementara berisi kolom dan baris hasil.',
      en: 'The data returned by a SELECT query, shaped as a temporary table of result columns and rows.',
    },
  },
  {
    term: 'Sintaks Error',
    termEn: 'Syntax Error',
    category: 'dasar',
    definition: {
      id: 'Kesalahan penulisan query yang membuatnya tidak bisa dijalankan sama sekali — misalnya lupa koma atau salah urutan klausa.',
      en: 'A malformed query that cannot run at all — e.g. a missing comma or clauses in the wrong order.',
    },
    example: 'SELCT * FORM buku;  -- salah tulis SELECT dan FROM',
  },

  // ── QUERY (klausa SELECT) ─────────────────────────────────────
  {
    term: 'SELECT',
    category: 'query',
    definition: {
      id: 'Klausa untuk memilih kolom mana saja yang ingin ditampilkan dari sebuah tabel.',
      en: 'The clause that chooses which columns to display from a table.',
    },
    example: 'SELECT judul, harga FROM buku;',
  },
  {
    term: 'FROM',
    category: 'query',
    definition: {
      id: 'Klausa yang menentukan tabel sumber data untuk query.',
      en: 'The clause that specifies which table the query reads from.',
    },
    example: 'SELECT * FROM buku;',
  },
  {
    term: 'WHERE',
    category: 'query',
    definition: {
      id: 'Klausa untuk menyaring baris berdasarkan kondisi tertentu — hanya baris yang memenuhi kondisi yang muncul di hasil.',
      en: 'The clause that filters rows by a condition — only matching rows appear in the result.',
    },
    example: 'SELECT * FROM buku WHERE harga > 80000;',
    seeAlso: ['SELECT'],
  },
  {
    term: 'ORDER BY',
    category: 'query',
    definition: {
      id: 'Klausa untuk mengurutkan hasil query berdasarkan satu atau lebih kolom, naik (ASC) atau turun (DESC).',
      en: 'The clause that sorts query results by one or more columns, ascending (ASC) or descending (DESC).',
    },
    example: 'SELECT * FROM buku ORDER BY harga DESC;',
  },
  {
    term: 'LIMIT',
    category: 'query',
    definition: {
      id: 'Klausa untuk membatasi jumlah baris yang dikembalikan oleh query, sering dipakai untuk "top N" hasil.',
      en: 'The clause that caps the number of rows a query returns, often used for "top N" results.',
    },
    example: 'SELECT * FROM buku ORDER BY harga DESC LIMIT 3;',
  },
  {
    term: 'ALIAS',
    category: 'query',
    definition: {
      id: 'Nama sementara untuk kolom atau tabel di dalam query, dibuat dengan kata kunci `AS`, untuk mempermudah pembacaan hasil.',
      en: 'A temporary name for a column or table within a query, created with the `AS` keyword, to make results easier to read.',
    },
    example: 'SELECT judul AS nama_buku FROM buku;',
  },
  {
    term: 'DISTINCT',
    category: 'query',
    definition: {
      id: 'Kata kunci yang menghilangkan baris duplikat dari hasil query, berdasarkan kombinasi seluruh kolom yang dipilih.',
      en: 'A keyword that removes duplicate rows from a result, based on the combination of all selected columns.',
    },
    example: 'SELECT DISTINCT kategori FROM buku;',
  },
  {
    term: 'NULL',
    category: 'query',
    definition: {
      id: 'Penanda "tidak ada nilai" pada sebuah kolom — bukan angka nol atau string kosong. Perbandingan biasa (`=`) tidak bisa dipakai untuk mengecek NULL.',
      en: 'A marker for "no value" in a column — not zero or an empty string. Ordinary comparison (`=`) cannot check for NULL.',
    },
  },
  {
    term: 'COALESCE',
    category: 'query',
    definition: {
      id: 'Fungsi yang mengembalikan nilai pertama yang bukan NULL dari daftar argumennya — berguna untuk memberi nilai pengganti saat data NULL.',
      en: 'A function that returns the first non-NULL value from its argument list — useful for substituting a default when data is NULL.',
    },
    example: "SELECT judul, COALESCE(tanggal_kembali, 'Belum dikembalikan') FROM peminjaman;",
    unit: 2,
    seeAlso: ['NULL'],
  },

  // ── OPERATOR ───────────────────────────────────────────────────
  {
    term: 'Operator Perbandingan',
    termEn: 'Comparison Operator',
    category: 'operator',
    definition: {
      id: 'Simbol untuk membandingkan nilai dalam kondisi WHERE: `=`, `<>`/`!=`, `>`, `<`, `>=`, `<=`.',
      en: 'Symbols for comparing values in a WHERE condition: `=`, `<>`/`!=`, `>`, `<`, `>=`, `<=`.',
    },
  },
  {
    term: 'Operator Logika',
    termEn: 'Logical Operator',
    category: 'operator',
    definition: {
      id: 'Kata kunci `AND`, `OR`, `NOT` untuk menggabungkan lebih dari satu kondisi WHERE.',
      en: 'The `AND`, `OR`, `NOT` keywords used to combine multiple WHERE conditions.',
    },
  },
  {
    term: 'LIKE',
    category: 'operator',
    definition: {
      id: 'Operator untuk mencocokkan pola teks, memakai wildcard `%` (nol atau lebih karakter) dan `_` (satu karakter).',
      en: 'An operator for pattern-matching text, using the `%` wildcard (zero or more characters) and `_` (one character).',
    },
    example: "SELECT * FROM buku WHERE judul LIKE '%Cinta%';",
  },
  {
    term: 'IN',
    category: 'operator',
    definition: {
      id: 'Operator untuk mengecek apakah sebuah nilai ada di dalam daftar nilai tertentu.',
      en: 'An operator that checks whether a value exists within a given list of values.',
    },
    example: "SELECT * FROM buku WHERE kategori IN ('Fiksi', 'Non-Fiksi');",
  },
  {
    term: 'BETWEEN',
    category: 'operator',
    definition: {
      id: 'Operator untuk mengecek apakah sebuah nilai berada dalam rentang tertentu (inklusif di kedua ujungnya).',
      en: 'An operator that checks whether a value falls within a range (inclusive on both ends).',
    },
    example: 'SELECT * FROM buku WHERE harga BETWEEN 50000 AND 90000;',
  },

  // ── AGREGASI (Unit 3) ────────────────────────────────────────
  {
    term: 'Fungsi Agregat',
    termEn: 'Aggregate Function',
    category: 'agregasi',
    definition: {
      id: 'Fungsi yang meringkas banyak baris menjadi satu nilai, seperti `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.',
      en: 'A function that summarizes many rows into a single value, such as `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.',
    },
    unit: 3,
  },
  {
    term: 'GROUP BY',
    category: 'agregasi',
    definition: {
      id: 'Klausa untuk mengelompokkan baris dengan nilai kolom yang sama, biasanya dipakai bersama fungsi agregat.',
      en: 'The clause that groups rows sharing the same column value, usually paired with an aggregate function.',
    },
    unit: 3,
  },
  {
    term: 'HAVING',
    category: 'agregasi',
    definition: {
      id: 'Klausa untuk menyaring hasil setelah pengelompokan GROUP BY — seperti WHERE, tapi bekerja pada hasil agregat.',
      en: 'The clause that filters results after GROUP BY grouping — like WHERE, but operating on aggregated results.',
    },
    unit: 3,
  },

  // ── JOIN (Unit 4) ────────────────────────────────────────────
  {
    term: 'JOIN',
    category: 'join',
    definition: {
      id: 'Operasi untuk menggabungkan baris dari dua tabel atau lebih berdasarkan kolom yang berhubungan.',
      en: 'An operation that combines rows from two or more tables based on a related column.',
    },
    unit: 4,
  },
  {
    term: 'INNER JOIN',
    category: 'join',
    definition: {
      id: 'Jenis JOIN yang hanya mengembalikan baris yang punya pasangan cocok di kedua tabel.',
      en: 'A JOIN type that only returns rows with a matching pair in both tables.',
    },
    unit: 4,
    seeAlso: ['JOIN'],
  },
  {
    term: 'LEFT JOIN',
    category: 'join',
    definition: {
      id: 'Jenis JOIN yang mengembalikan semua baris dari tabel kiri, meski tidak ada pasangan cocok di tabel kanan (diisi NULL).',
      en: 'A JOIN type that returns all rows from the left table, even without a matching pair in the right table (filled with NULL).',
    },
    unit: 4,
    seeAlso: ['JOIN', 'NULL'],
  },
  {
    term: 'Self JOIN',
    category: 'join',
    definition: {
      id: 'JOIN antara sebuah tabel dengan dirinya sendiri, dipakai saat baris dalam tabel merujuk ke baris lain di tabel yang sama (misalnya pegawai dan atasannya).',
      en: 'A JOIN between a table and itself, used when rows in a table reference other rows in that same table (e.g. an employee and their manager).',
    },
    example: 'SELECT e.nama, m.nama AS atasan FROM pegawai e JOIN pegawai m ON e.atasan_id = m.id;',
    unit: 4,
    seeAlso: ['JOIN'],
  },

  // ── SUBQUERY & LANJUTAN (Unit 5) ─────────────────────────────
  {
    term: 'Subquery',
    termEn: 'Subquery / Nested Query',
    category: 'lanjutan',
    definition: {
      id: 'Query SELECT yang ditulis di dalam query SELECT lain — hasilnya dipakai sebagai bagian dari kondisi atau nilai query luar.',
      en: 'A SELECT query written inside another SELECT query — its result is used as part of the outer query\'s condition or value.',
    },
    example: 'SELECT judul FROM buku WHERE harga > (SELECT AVG(harga) FROM buku);',
    unit: 5,
  },
  {
    term: 'CTE',
    termEn: 'Common Table Expression',
    category: 'lanjutan',
    definition: {
      id: 'Query sementara yang diberi nama dengan `WITH ... AS (...)`, bisa dipakai layaknya tabel biasa di query utama — membuat query bertingkat lebih mudah dibaca.',
      en: 'A named, temporary query defined with `WITH ... AS (...)`, usable like a regular table in the main query — makes nested queries easier to read.',
    },
    example: 'WITH buku_mahal AS (SELECT * FROM buku WHERE harga > 90000) SELECT * FROM buku_mahal;',
    unit: 5,
    seeAlso: ['Subquery'],
  },
  {
    term: 'UNION',
    category: 'lanjutan',
    definition: {
      id: 'Menggabungkan hasil dua query SELECT menjadi satu result set, menghilangkan baris duplikat secara otomatis (pakai `UNION ALL` untuk menyimpan duplikat).',
      en: 'Combines the results of two SELECT queries into one result set, automatically removing duplicate rows (use `UNION ALL` to keep duplicates).',
    },
    unit: 5,
  },
  {
    term: 'EXISTS',
    category: 'lanjutan',
    definition: {
      id: 'Operator yang mengecek apakah sebuah subquery mengembalikan setidaknya satu baris — bernilai true/false, tidak peduli isi barisnya.',
      en: 'An operator that checks whether a subquery returns at least one row — evaluates to true/false, regardless of the row contents.',
    },
    example: 'SELECT nama FROM anggota a WHERE EXISTS (SELECT 1 FROM peminjaman p WHERE p.anggota_id = a.id);',
    unit: 5,
    seeAlso: ['Subquery'],
  },

  // ── SKEMA ────────────────────────────────────────────────────
  {
    term: 'Primary Key',
    category: 'skema',
    definition: {
      id: 'Kolom (atau kombinasi kolom) yang nilainya unik untuk setiap baris, dipakai sebagai identitas utama tabel.',
      en: 'A column (or combination of columns) whose value is unique per row, used as the table\'s primary identity.',
    },
    example: 'CREATE TABLE buku (id INTEGER PRIMARY KEY, ...);',
  },
  {
    term: 'Foreign Key',
    category: 'skema',
    definition: {
      id: 'Kolom yang merujuk ke Primary Key di tabel lain, dipakai untuk membangun relasi antar tabel (dasar dari JOIN).',
      en: 'A column that references a Primary Key in another table, used to build relationships between tables (the basis of JOIN).',
    },
    unit: 4,
    seeAlso: ['Primary Key', 'JOIN'],
  },
  {
    term: 'DDL',
    termEn: 'Data Definition Language',
    category: 'skema',
    definition: {
      id: 'Perintah SQL untuk mendefinisikan struktur database, seperti `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`.',
      en: 'SQL statements that define database structure, such as `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`.',
    },
    unit: 6,
  },
  {
    term: 'DML',
    termEn: 'Data Manipulation Language',
    category: 'skema',
    definition: {
      id: 'Perintah SQL untuk mengubah isi data, seperti `INSERT`, `UPDATE`, `DELETE`.',
      en: 'SQL statements that change data contents, such as `INSERT`, `UPDATE`, `DELETE`.',
    },
    unit: 6,
  },
  {
    term: 'NOT NULL',
    category: 'skema',
    definition: {
      id: 'Constraint yang mewajibkan sebuah kolom selalu diisi nilai — mencegah baris disimpan dengan kolom itu kosong (NULL).',
      en: 'A constraint requiring a column to always have a value — prevents a row from being saved with that column empty (NULL).',
    },
    example: 'CREATE TABLE buku (judul TEXT NOT NULL, ...);',
    unit: 6,
    seeAlso: ['NULL'],
  },
  {
    term: 'UNIQUE',
    category: 'skema',
    definition: {
      id: 'Constraint yang memastikan setiap nilai di kolom itu tidak boleh sama dengan baris lain — mirip Primary Key, tapi sebuah tabel bisa punya lebih dari satu kolom UNIQUE.',
      en: 'A constraint ensuring every value in a column differs from other rows — similar to Primary Key, but a table can have more than one UNIQUE column.',
    },
    unit: 6,
    seeAlso: ['Primary Key'],
  },
  {
    term: 'DEFAULT',
    category: 'skema',
    definition: {
      id: 'Constraint yang menentukan nilai otomatis untuk sebuah kolom jika tidak diisi secara eksplisit saat INSERT.',
      en: 'A constraint that sets an automatic value for a column when it isn\'t explicitly supplied during INSERT.',
    },
    example: "CREATE TABLE buku (stok INTEGER DEFAULT 0, ...);",
    unit: 6,
  },
  {
    term: 'CHECK',
    category: 'skema',
    definition: {
      id: 'Constraint yang membatasi nilai kolom harus memenuhi kondisi tertentu, misalnya harga tidak boleh negatif.',
      en: 'A constraint restricting a column\'s values to satisfy a given condition, e.g. a price can never be negative.',
    },
    example: 'CREATE TABLE buku (harga INTEGER CHECK (harga >= 0), ...);',
    unit: 6,
  },
  {
    term: 'ALTER TABLE',
    category: 'skema',
    definition: {
      id: 'Perintah untuk mengubah struktur tabel yang sudah ada — menambah kolom, mengganti nama, atau menghapus kolom (tergantung dukungan RDBMS).',
      en: 'A statement that modifies an existing table\'s structure — adding a column, renaming, or dropping a column (depending on RDBMS support).',
    },
    example: 'ALTER TABLE buku ADD COLUMN rating REAL;',
    unit: 6,
    seeAlso: ['DDL'],
  },
]
