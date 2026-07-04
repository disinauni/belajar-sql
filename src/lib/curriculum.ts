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
    estimatedHours: '3-4',
    projectTitle: { id: 'Segera Hadir', en: 'Coming Soon' },
    isAvailable: false,
    lessons: [],
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
    projectTitle: { id: 'Segera Hadir', en: 'Coming Soon' },
    isAvailable: false,
    lessons: [],
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
    projectTitle: { id: 'Segera Hadir', en: 'Coming Soon' },
    isAvailable: false,
    lessons: [],
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
    projectTitle: { id: 'Segera Hadir', en: 'Coming Soon' },
    isAvailable: false,
    lessons: [],
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
    projectTitle: { id: 'Segera Hadir', en: 'Coming Soon' },
    isAvailable: false,
    lessons: [],
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
