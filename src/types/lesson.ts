// Types untuk lesson content dan curriculum structure

export type Language = 'id' | 'en'

export type TranslationStatus = 'complete' | 'draft' | 'outdated' | 'missing'

export interface LessonFrontmatter {
  title: string
  unit: number
  lesson: number
  description: string
  objectives: string[]
  estimatedTime: number // minutes
  prerequisites?: string[] // e.g. ["unit-0/02"]
  translationStatus?: TranslationStatus
  difficulty?: 'beginner' | 'intermediate'
  tags?: string[]
  database?: string // named sample database (see src/data/sample-databases.ts)
}

export interface ProcessedLesson extends LessonFrontmatter {
  slug: string        // e.g. "unit-1/00-select-dan-kolom"
  unitSlug: string    // e.g. "unit-1"
  lessonSlug: string  // e.g. "00-select-dan-kolom"
  lang: Language
  url: string         // e.g. "/id/learn/unit-1/00-select-dan-kolom"
  nextLesson?: LessonRef
  prevLesson?: LessonRef
}

export interface LessonRef {
  title: string
  url: string
  slug: string
}

export interface UnitMetadata {
  id: number
  slug: string        // e.g. "unit-1"
  title: Record<Language, string>
  description: Record<Language, string>
  estimatedHours: string   // e.g. "8-10"
  projectTitle: Record<Language, string>
  lessons: LessonSummary[]
  isAvailable: boolean
}

export interface LessonSummary {
  slug: string
  title: Record<Language, string>
  estimatedTime: number
  isProject: boolean
}
