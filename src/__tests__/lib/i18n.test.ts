import { describe, it, expect } from 'vitest'
import { t, interpolate, getOtherLang, getLangName, detectLanguage } from '@/lib/i18n'

// ============================================================
// t() — string translation
// ============================================================

describe('t()', () => {
  it('returns the correct ID string', () => {
    expect(t('id', 'nav.home')).toBe('Beranda')
    expect(t('id', 'exercise.checkAnswer')).toBe('Periksa Jawaban')
  })

  it('returns the correct EN string', () => {
    expect(t('en', 'nav.home')).toBe('Home')
    expect(t('en', 'exercise.checkAnswer')).toBe('Check Answer')
  })

  it('falls back correctly for a valid key', () => {
    const result = t('en', 'nav.curriculum')
    expect(result).toBe('Curriculum')
  })

  it('falls back to the path if the key does not exist anywhere', () => {
    const result = t('id', 'tidak.ada.key.ini')
    expect(result).toBe('tidak.ada.key.ini')
  })

  it('returns a two-level nested value', () => {
    expect(t('id', 'lesson.markComplete')).toBe('Tandai Selesai')
    expect(t('en', 'lesson.markComplete')).toBe('Mark Complete')
  })

  it('returns a value from the code section', () => {
    expect(t('id', 'code.run')).toBe('Jalankan')
    expect(t('en', 'code.run')).toBe('Run')
  })

  it('returns infoBox values', () => {
    expect(t('id', 'infoBox.tip')).toBe('Tips')
    expect(t('en', 'infoBox.tip')).toBe('Tip')
    expect(t('id', 'infoBox.warning')).toBe('Perhatian')
    expect(t('en', 'infoBox.warning')).toBe('Warning')
  })

  it('returns the path when the value is an object, not a string', () => {
    // 'home' is a nested object, not a string
    const result = t('id', 'home')
    expect(result).toBe('home')
  })
})

// ============================================================
// interpolate()
// ============================================================

describe('interpolate()', () => {
  it('replaces a single variable', () => {
    expect(interpolate('{time} menit', { time: 25 })).toBe('25 menit')
  })

  it('replaces multiple variables at once', () => {
    expect(interpolate('{count} dari {total} pelajaran', { count: 5, total: 10 }))
      .toBe('5 dari 10 pelajaran')
  })

  it('keeps the placeholder if the variable is not supplied', () => {
    expect(interpolate('{missing} tersedia', {})).toBe('{missing} tersedia')
  })

  it('returns a template with no variables unchanged', () => {
    expect(interpolate('Halo Dunia', {})).toBe('Halo Dunia')
  })

  it('replaces both numeric and string variables', () => {
    expect(interpolate('Unit {unit}', { unit: 3 })).toBe('Unit 3')
    expect(interpolate('Skor: {score}/100', { score: '85' })).toBe('Skor: 85/100')
  })
})

// ============================================================
// getOtherLang()
// ============================================================

describe('getOtherLang()', () => {
  it('id → en', () => {
    expect(getOtherLang('id')).toBe('en')
  })

  it('en → id', () => {
    expect(getOtherLang('en')).toBe('id')
  })
})

// ============================================================
// getLangName()
// ============================================================

describe('getLangName()', () => {
  it('returns "Indonesia" for id', () => {
    expect(getLangName('id')).toBe('Indonesia')
  })

  it('returns "English" for en', () => {
    expect(getLangName('en')).toBe('English')
  })
})

// ============================================================
// detectLanguage()
// ============================================================

describe('detectLanguage()', () => {
  it('defaults to id when there is no Accept-Language', () => {
    expect(detectLanguage()).toBe('id')
    expect(detectLanguage(undefined)).toBe('id')
  })

  it('detects en from Accept-Language: en', () => {
    expect(detectLanguage('en')).toBe('en')
  })

  it('detects en from Accept-Language: en-US,en;q=0.9', () => {
    expect(detectLanguage('en-US,en;q=0.9')).toBe('en')
  })

  it('detects en from Accept-Language: en-GB', () => {
    expect(detectLanguage('en-GB')).toBe('en')
  })

  it('defaults to id for other languages', () => {
    expect(detectLanguage('id-ID,id;q=0.9')).toBe('id')
    expect(detectLanguage('fr-FR,fr;q=0.9')).toBe('id')
    expect(detectLanguage('zh-CN')).toBe('id')
  })

  it('is case-insensitive for EN', () => {
    expect(detectLanguage('EN-US')).toBe('en')
  })
})
