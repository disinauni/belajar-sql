import { describe, it, expect, beforeEach } from 'vitest'
import {
  loadProgress,
  saveProgress,
  markLessonComplete,
  isLessonComplete,
  setCurrentLesson,
  saveExerciseResult,
  getExerciseResult,
  saveQuizResult,
  getUnitProgress,
  getOverallProgress,
  setLanguage,
  setTheme,
  getTheme,
  checkAndUnlockBadges,
  getBadges,
  resetProgress,
} from '@/lib/progress'
import { DEFAULT_PROGRESS } from '@/types/progress'
import type { UserProgress } from '@/types/progress'

const STORAGE_KEY = 'belajar-sql-progress'

beforeEach(() => {
  localStorage.clear()
})

// ============================================================
// loadProgress / saveProgress
// ============================================================

describe('loadProgress', () => {
  it('returns DEFAULT_PROGRESS when localStorage is empty', () => {
    const p = loadProgress()
    expect(p.completedLessons).toEqual([])
    expect(p.streakDays).toBe(0)
    expect(p.language).toBe('id')
  })

  it('returns data stored in localStorage', () => {
    const stored: UserProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['unit-1/00-select-dan-kolom', 'unit-1/01-where-dasar'],
      streakDays: 3,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    const p = loadProgress()
    expect(p.completedLessons).toEqual(['unit-1/00-select-dan-kolom', 'unit-1/01-where-dasar'])
    expect(p.streakDays).toBe(3)
  })

  it('merges with DEFAULT_PROGRESS when fields are missing', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ completedLessons: ['unit-1/00-select-dan-kolom'] }))
    const p = loadProgress()
    expect(p.completedLessons).toEqual(['unit-1/00-select-dan-kolom'])
    expect(p.language).toBe('id') // from DEFAULT_PROGRESS
    expect(p.exerciseResults).toEqual({})
  })

  it('returns DEFAULT_PROGRESS when JSON is invalid', () => {
    localStorage.setItem(STORAGE_KEY, 'not valid json {{{{')
    const p = loadProgress()
    expect(p.completedLessons).toEqual([])
  })
})

describe('saveProgress', () => {
  it('saves and reloads data correctly', () => {
    const progress: UserProgress = { ...DEFAULT_PROGRESS, streakDays: 5, language: 'en' }
    saveProgress(progress)
    const loaded = loadProgress()
    expect(loaded.streakDays).toBe(5)
    expect(loaded.language).toBe('en')
  })
})

// ============================================================
// Lesson completion
// ============================================================

describe('markLessonComplete', () => {
  it('adds the lesson to completedLessons', () => {
    markLessonComplete('unit-1/00-select-dan-kolom')
    expect(isLessonComplete('unit-1/00-select-dan-kolom')).toBe(true)
  })

  it('does not duplicate the same lesson', () => {
    markLessonComplete('unit-1/00-select-dan-kolom')
    markLessonComplete('unit-1/00-select-dan-kolom')
    const p = loadProgress()
    expect(p.completedLessons.filter(s => s === 'unit-1/00-select-dan-kolom').length).toBe(1)
  })

  it('updates currentLesson and lastVisited', () => {
    markLessonComplete('unit-1/01-where-dasar')
    const p = loadProgress()
    expect(p.currentLesson).toBe('unit-1/01-where-dasar')
    expect(p.lastVisited).toBeTruthy()
  })
})

describe('isLessonComplete', () => {
  it('returns false for an unfinished lesson', () => {
    expect(isLessonComplete('unit-1/99-tidak-ada')).toBe(false)
  })

  it('returns true for a finished lesson', () => {
    markLessonComplete('unit-1/05-alias-as')
    expect(isLessonComplete('unit-1/05-alias-as')).toBe(true)
  })
})

describe('setCurrentLesson', () => {
  it('stores the current lesson slug', () => {
    setCurrentLesson('unit-1/03-order-by')
    const p = loadProgress()
    expect(p.currentLesson).toBe('unit-1/03-order-by')
  })
})

// ============================================================
// Exercise results
// ============================================================

describe('saveExerciseResult / getExerciseResult', () => {
  it('saves and retrieves an exercise result', () => {
    const result = { solved: true, attempts: 2, hintsUsed: 1, lastAttempt: '2026-03-18' }
    saveExerciseResult('u1l0-ex1', result)
    const fetched = getExerciseResult('u1l0-ex1')
    expect(fetched).toEqual(result)
  })

  it('returns null for an exercise never attempted', () => {
    expect(getExerciseResult('does-not-exist')).toBeNull()
  })

  it('can store several different exercises', () => {
    saveExerciseResult('ex-a', { solved: true, attempts: 1, hintsUsed: 0, lastAttempt: '' })
    saveExerciseResult('ex-b', { solved: false, attempts: 3, hintsUsed: 2, lastAttempt: '' })
    expect(getExerciseResult('ex-a')?.solved).toBe(true)
    expect(getExerciseResult('ex-b')?.solved).toBe(false)
  })
})

// ============================================================
// Quiz results
// ============================================================

describe('saveQuizResult', () => {
  it('saves a quiz result to progress', () => {
    saveQuizResult('quiz-unit1', { score: 80, completedAt: '2026-03-18', answers: [0, 1, 2] })
    const p = loadProgress()
    expect(p.quizResults['quiz-unit1']?.score).toBe(80)
    expect(p.quizResults['quiz-unit1']?.answers).toEqual([0, 1, 2])
  })
})

// ============================================================
// Unit progress
// ============================================================

describe('getUnitProgress', () => {
  it('returns 0% when no lessons in that unit are complete', () => {
    const result = getUnitProgress('unit-1', 8)
    expect(result.completed).toBe(0)
    expect(result.percent).toBe(0)
    expect(result.isComplete).toBe(false)
  })

  it('computes the percentage correctly', () => {
    markLessonComplete('unit-1/00-select-dan-kolom')
    markLessonComplete('unit-1/01-where-dasar')
    // unit-1 has 8 lessons total
    const result = getUnitProgress('unit-1', 8)
    expect(result.completed).toBe(2)
    expect(result.percent).toBe(25)
  })

  it('only counts lessons belonging to that unit', () => {
    markLessonComplete('unit-0/00-apa-itu-database-dan-sql')
    markLessonComplete('unit-1/00-select-dan-kolom')
    const result = getUnitProgress('unit-1', 8)
    expect(result.completed).toBe(1)
  })

  it('isComplete is true once all lessons are done', () => {
    markLessonComplete('unit-0/00-apa-itu-database-dan-sql')
    const result = getUnitProgress('unit-0', 1)
    expect(result.isComplete).toBe(true)
  })

  it('handles totalLessons = 0 without error', () => {
    const result = getUnitProgress('unit-x', 0)
    expect(result.percent).toBe(0)
  })
})

describe('getOverallProgress', () => {
  it('returns 0% when nothing is complete', () => {
    const result = getOverallProgress(11)
    expect(result.completed).toBe(0)
    expect(result.percent).toBe(0)
  })

  it('computes the overall percentage correctly', () => {
    markLessonComplete('unit-1/00-select-dan-kolom')
    markLessonComplete('unit-1/01-where-dasar')
    markLessonComplete('unit-0/00-apa-itu-database-dan-sql')
    const result = getOverallProgress(11)
    expect(result.completed).toBe(3)
    expect(result.percent).toBe(27)
  })
})

// ============================================================
// Preferences
// ============================================================

describe('setLanguage / setTheme / getTheme', () => {
  it('stores the language preference', () => {
    setLanguage('en')
    expect(loadProgress().language).toBe('en')
  })

  it('stores the theme preference', () => {
    setTheme('dark')
    expect(getTheme()).toBe('dark')
  })

  it('defaults to light theme', () => {
    expect(getTheme()).toBe('light')
  })
})

// ============================================================
// Streak
// ============================================================

describe('streak via markLessonComplete', () => {
  it('does not change the streak if lastActiveDate is today', () => {
    const today = new Date().toISOString().split('T')[0]!
    const stored: UserProgress = {
      ...DEFAULT_PROGRESS,
      streakDays: 2,
      lastActiveDate: today,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    markLessonComplete('unit-1/00-select-dan-kolom')
    expect(loadProgress().streakDays).toBe(2)
  })

  it('increments the streak if lastActiveDate was yesterday', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]!
    const stored: UserProgress = {
      ...DEFAULT_PROGRESS,
      streakDays: 2,
      lastActiveDate: yesterdayStr,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    markLessonComplete('unit-1/00-select-dan-kolom')
    expect(loadProgress().streakDays).toBe(3)
  })

  it('resets the streak to 1 if the gap is more than 1 day', () => {
    const longAgo = '2020-01-01'
    const stored: UserProgress = {
      ...DEFAULT_PROGRESS,
      streakDays: 10,
      lastActiveDate: longAgo,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    markLessonComplete('unit-1/00-select-dan-kolom')
    expect(loadProgress().streakDays).toBe(1)
  })
})

// ============================================================
// Badges
// ============================================================

describe('checkAndUnlockBadges', () => {
  it('unlocks first-lesson when the first lesson is done', () => {
    const p = { ...DEFAULT_PROGRESS, completedLessons: ['unit-1/00-select-dan-kolom'] }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).toContain('first-lesson')
  })

  it('does not duplicate an already-unlocked badge', () => {
    const p: UserProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['unit-1/00-select-dan-kolom'],
      unlockedBadges: ['first-lesson'],
    }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges.filter(b => b === 'first-lesson').length).toBe(1)
  })

  it('unlocks streak-3 when streakDays >= 3', () => {
    const p: UserProgress = { ...DEFAULT_PROGRESS, streakDays: 3, unlockedBadges: [], completedLessons: [] }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).toContain('streak-3')
  })

  it('does not unlock streak-7 when streakDays = 3', () => {
    const p: UserProgress = { ...DEFAULT_PROGRESS, streakDays: 3, unlockedBadges: [], completedLessons: [] }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).not.toContain('streak-7')
  })

  it('unlocks streak-7 when streakDays >= 7', () => {
    const p: UserProgress = { ...DEFAULT_PROGRESS, streakDays: 7, unlockedBadges: [], completedLessons: [] }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).toContain('streak-7')
  })

  it('unlocks unit-1-complete once all 8 unit-1 lessons are done', () => {
    const lessons = Array.from({ length: 8 }, (_, i) => `unit-1/${String(i).padStart(2, '0')}-lesson`)
    const p: UserProgress = { ...DEFAULT_PROGRESS, completedLessons: lessons, unlockedBadges: [] }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).toContain('unit-1-complete')
  })

  it('does not unlock unit-1-complete with fewer than 8 lessons', () => {
    const p: UserProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['unit-1/00-select-dan-kolom', 'unit-1/01-where-dasar'],
      unlockedBadges: [],
    }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).not.toContain('unit-1-complete')
  })

  it('unlocks first-playground when a lesson slug contains "proyek-mini"', () => {
    const p: UserProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['unit-1/07-proyek-mini-query-toko-buku'],
      unlockedBadges: [],
    }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).toContain('first-playground')
  })

  it('returns the array of newly-unlocked badges', () => {
    const p: UserProgress = { ...DEFAULT_PROGRESS, completedLessons: ['unit-1/00-select-dan-kolom'], unlockedBadges: [] }
    const newBadges = checkAndUnlockBadges(p)
    expect(newBadges).toContain('first-lesson')
  })

  it('returns an empty array when there are no new badges', () => {
    const p: UserProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['unit-1/00-select-dan-kolom'],
      unlockedBadges: ['first-lesson'],
    }
    const newBadges = checkAndUnlockBadges(p)
    expect(newBadges).toEqual([])
  })
})

describe('getBadges via markLessonComplete integration', () => {
  it('unlocks the first-lesson badge after markLessonComplete', () => {
    markLessonComplete('unit-1/00-select-dan-kolom')
    expect(getBadges()).toContain('first-lesson')
  })
})

// ============================================================
// resetProgress
// ============================================================

describe('resetProgress', () => {
  it('clears all progress from localStorage', () => {
    markLessonComplete('unit-1/00-select-dan-kolom')
    resetProgress()
    const p = loadProgress()
    expect(p.completedLessons).toEqual([])
    expect(p.streakDays).toBe(0)
  })
})
