import type { Language } from '@/types/lesson'
import type { UnitMetadata } from '@/types/lesson'

export const CURRICULUM_ID: UnitMetadata[] = [
  {
    id: 0,
    slug: 'unit-0',
    title: { id: 'Persiapan', en: 'Getting Started' },
    description: {
      id: 'Kenali apa itu database dan SQL, lalu siapkan playground belajarmu.',
      en: 'Learn what a database and SQL are, then set up your learning playground.',
    },
    estimatedHours: '1',
    projectTitle: { id: 'Tur Playground SQL', en: 'SQL Playground Tour' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-0/00-apa-itu-database-dan-sql', title: { id: 'Apa itu Database & SQL?', en: 'What is a Database & SQL?' }, estimatedTime: 15, isProject: false },
      { slug: 'unit-0/01-mengenal-sqlite-dan-playground', title: { id: 'Mengenal SQLite & Playground', en: 'Meet SQLite & the Playground' }, estimatedTime: 15, isProject: false },
      { slug: 'unit-0/02-tur-playground-sql', title: { id: 'Tur Playground SQL', en: 'Tour of the SQL Playground' }, estimatedTime: 20, isProject: true },
    ],
  },
  {
    id: 1,
    slug: 'unit-1',
    title: { id: 'SELECT Dasar', en: 'Basic SELECT' },
    description: {
      id: 'Pelajari cara mengambil dan menyaring data dari tabel dengan SELECT, WHERE, ORDER BY, dan LIMIT.',
      en: 'Learn to retrieve and filter data from a table with SELECT, WHERE, ORDER BY, and LIMIT.',
    },
    estimatedHours: '3',
    projectTitle: { id: 'Query Toko Buku', en: 'Bookstore Queries' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-1/00-select-dan-kolom', title: { id: 'SELECT dan Memilih Kolom', en: 'SELECT and Choosing Columns' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-1/01-where-dasar', title: { id: 'Memfilter dengan WHERE', en: 'Filtering with WHERE' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-1/02-operator-perbandingan', title: { id: 'Operator Perbandingan', en: 'Comparison Operators' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-1/03-order-by', title: { id: 'Mengurutkan dengan ORDER BY', en: 'Sorting with ORDER BY' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-1/04-limit', title: { id: 'Membatasi Hasil dengan LIMIT', en: 'Limiting Results with LIMIT' }, estimatedTime: 15, isProject: false },
      { slug: 'unit-1/05-alias-as', title: { id: 'Alias Kolom & Tabel dengan AS', en: 'Column & Table Aliases with AS' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-1/06-distinct', title: { id: 'Menghilangkan Duplikat dengan DISTINCT', en: 'Removing Duplicates with DISTINCT' }, estimatedTime: 15, isProject: false },
      { slug: 'unit-1/07-proyek-mini-query-toko-buku', title: { id: 'Proyek Mini: Query Toko Buku', en: 'Mini Project: Bookstore Queries' }, estimatedTime: 35, isProject: true },
    ],
  },
  {
    id: 2,
    slug: 'unit-2',
    title: { id: 'Filtering & Operator', en: 'Filtering & Operators' },
    description: {
      id: 'Perdalam filter data dengan operator logika, LIKE, IN, BETWEEN, dan penanganan NULL.',
      en: 'Go deeper into filtering with logical operators, LIKE, IN, BETWEEN, and NULL handling.',
    },
    estimatedHours: '3',
    projectTitle: { id: 'Filter Lanjutan Toko Buku', en: 'Advanced Bookstore Filters' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-2/00-operator-logika', title: { id: 'Operator Logika: AND, OR, NOT', en: 'Logical Operators: AND, OR, NOT' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-2/01-like-wildcard', title: { id: 'LIKE & Wildcard', en: 'LIKE & Wildcards' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-2/02-in-operator', title: { id: 'Operator IN', en: 'The IN Operator' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-2/03-between', title: { id: 'Operator BETWEEN', en: 'The BETWEEN Operator' }, estimatedTime: 15, isProject: false },
      { slug: 'unit-2/04-null-values', title: { id: 'Menangani NULL', en: 'Handling NULL' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-2/05-proyek-mini-filter-lanjutan', title: { id: 'Proyek Mini: Filter Lanjutan', en: 'Mini Project: Advanced Filters' }, estimatedTime: 30, isProject: true },
    ],
  },
  {
    id: 3,
    slug: 'unit-3',
    title: { id: 'Agregasi & GROUP BY', en: 'Aggregation & Grouping' },
    description: {
      id: 'Ringkas data dengan COUNT, SUM, AVG, MIN, MAX, GROUP BY, dan HAVING.',
      en: 'Summarize data with COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING.',
    },
    estimatedHours: '3-4',
    projectTitle: { id: 'Laporan Penjualan Toko Buku', en: 'Bookstore Sales Report' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-3/00-count', title: { id: 'Menghitung Baris dengan COUNT', en: 'Counting Rows with COUNT' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-3/01-sum-avg', title: { id: 'SUM & AVG', en: 'SUM & AVG' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-3/02-min-max', title: { id: 'MIN & MAX', en: 'MIN & MAX' }, estimatedTime: 15, isProject: false },
      { slug: 'unit-3/03-group-by', title: { id: 'Mengelompokkan dengan GROUP BY', en: 'Grouping with GROUP BY' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-3/04-having', title: { id: 'Menyaring Grup dengan HAVING', en: 'Filtering Groups with HAVING' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-3/05-menggabungkan-klausa', title: { id: 'Menggabungkan Semua Klausa', en: 'Combining All Clauses' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-3/06-proyek-mini-laporan-penjualan', title: { id: 'Proyek Mini: Laporan Penjualan', en: 'Mini Project: Sales Report' }, estimatedTime: 35, isProject: true },
    ],
  },
  {
    id: 4,
    slug: 'unit-4',
    title: { id: 'JOIN', en: 'JOIN' },
    description: {
      id: 'Gabungkan data dari beberapa tabel dengan INNER JOIN, LEFT JOIN, dan self join.',
      en: 'Combine data from multiple tables with INNER JOIN, LEFT JOIN, and self joins.',
    },
    estimatedHours: '4-5',
    projectTitle: { id: 'Sistem Perpustakaan', en: 'Library System' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-4/00-apa-itu-join', title: { id: 'Apa itu JOIN & Foreign Key?', en: 'What is a JOIN & Foreign Key?' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-4/01-inner-join', title: { id: 'INNER JOIN', en: 'INNER JOIN' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-4/02-left-join', title: { id: 'LEFT JOIN', en: 'LEFT JOIN' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-4/03-join-banyak-tabel', title: { id: 'JOIN Banyak Tabel', en: 'Joining Multiple Tables' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-4/04-self-join', title: { id: 'Self JOIN', en: 'Self JOIN' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-4/05-alias-kondisi-on-lanjutan', title: { id: 'Alias & Kondisi ON Lanjutan', en: 'Aliases & Advanced ON Conditions' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-4/06-proyek-mini-sistem-perpustakaan', title: { id: 'Proyek Mini: Sistem Perpustakaan', en: 'Mini Project: Library System' }, estimatedTime: 40, isProject: true },
    ],
  },
  {
    id: 5,
    slug: 'unit-5',
    title: { id: 'Subquery & CTE', en: 'Subqueries & CTEs' },
    description: {
      id: 'Susun query bertingkat dengan subquery, Common Table Expression (CTE), UNION, dan EXISTS.',
      en: 'Compose nested queries with subqueries, Common Table Expressions (CTEs), UNION, and EXISTS.',
    },
    estimatedHours: '3-4',
    projectTitle: { id: 'Analisis Data dengan Subquery', en: 'Data Analysis with Subqueries' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-5/00-subquery-where', title: { id: 'Subquery di WHERE', en: 'Subqueries in WHERE' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-5/01-subquery-select-from', title: { id: 'Subquery di SELECT & FROM', en: 'Subqueries in SELECT & FROM' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-5/02-in-subquery', title: { id: 'IN dengan Subquery', en: 'IN with a Subquery' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-5/03-exists', title: { id: 'EXISTS & NOT EXISTS', en: 'EXISTS & NOT EXISTS' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-5/04-cte-union', title: { id: 'CTE (WITH) & UNION', en: 'CTEs (WITH) & UNION' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-5/05-proyek-mini-analisis-data', title: { id: 'Proyek Mini: Analisis Data', en: 'Mini Project: Data Analysis' }, estimatedTime: 35, isProject: true },
    ],
  },
  {
    id: 6,
    slug: 'unit-6',
    title: { id: 'Modifikasi Data & Skema', en: 'Data Modification & Schema' },
    description: {
      id: 'Ubah data dengan INSERT/UPDATE/DELETE dan rancang skema dengan CREATE TABLE & constraint.',
      en: 'Modify data with INSERT/UPDATE/DELETE and design schemas with CREATE TABLE & constraints.',
    },
    estimatedHours: '4-5',
    projectTitle: { id: 'Rancang & Kelola Database Sendiri', en: 'Design & Manage Your Own Database' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-6/00-insert', title: { id: 'Menambah Data dengan INSERT', en: 'Adding Data with INSERT' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-6/01-update', title: { id: 'Mengubah Data dengan UPDATE', en: 'Modifying Data with UPDATE' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-6/02-delete', title: { id: 'Menghapus Data dengan DELETE', en: 'Removing Data with DELETE' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-6/03-create-table', title: { id: 'Membuat Tabel dengan CREATE TABLE', en: 'Creating Tables with CREATE TABLE' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-6/04-constraint', title: { id: 'Constraint: PRIMARY KEY, FOREIGN KEY, dst', en: 'Constraints: PRIMARY KEY, FOREIGN KEY, etc.' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-6/05-alter-drop-table', title: { id: 'ALTER TABLE & DROP TABLE', en: 'ALTER TABLE & DROP TABLE' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-6/06-final-project', title: { id: 'Final Project: Rancang Database Sendiri', en: 'Final Project: Design Your Own Database' }, estimatedTime: 60, isProject: true },
    ],
  },
]

export function getCurriculum(_lang: Language): UnitMetadata[] {
  return CURRICULUM_ID
}

export function getUnit(slug: string): UnitMetadata | undefined {
  return CURRICULUM_ID.find(u => u.slug === slug)
}

export function getTotalLessons(): number {
  return CURRICULUM_ID.reduce((sum, unit) => sum + unit.lessons.length, 0)
}

export function getNextLesson(currentSlug: string): { slug: string; unitSlug: string } | null {
  const allLessons = CURRICULUM_ID.flatMap(unit =>
    unit.lessons.map(l => ({ ...l, unitSlug: unit.slug }))
  )
  const idx = allLessons.findIndex(l => l.slug === currentSlug)
  if (idx === -1 || idx >= allLessons.length - 1) return null
  const next = allLessons[idx + 1]
  if (!next) return null
  return { slug: next.slug, unitSlug: next.unitSlug }
}

export function getPrevLesson(currentSlug: string): { slug: string; unitSlug: string } | null {
  const allLessons = CURRICULUM_ID.flatMap(unit =>
    unit.lessons.map(l => ({ ...l, unitSlug: unit.slug }))
  )
  const idx = allLessons.findIndex(l => l.slug === currentSlug)
  if (idx <= 0) return null
  const prev = allLessons[idx - 1]
  if (!prev) return null
  return { slug: prev.slug, unitSlug: prev.unitSlug }
}

export function getLessonUrl(lang: Language, lessonSlug: string): string {
  const parts = lessonSlug.split('/')
  if (parts.length !== 2) return `/${lang}/curriculum`
  const [unitSlug, lessonId] = parts
  return `/${lang}/learn/${unitSlug}/${lessonId}`
}
