import type { Language } from '@/types/lesson'

// ============================================================
// UI STRINGS — semua text statis di UI
// ============================================================

export const uiStrings = {
  id: {
    meta: {
      siteTitle: 'Belajar SQL',
      siteDescription: 'Website pembelajaran SQL untuk siswa SMP dan SMA Indonesia. Dari nol hingga bisa menulis query database sungguhan.',
      ogTitle: 'Belajar SQL — Untuk SMP/SMA Indonesia',
    },
    nav: {
      home: 'Beranda',
      curriculum: 'Kurikulum',
      playground: 'Playground',
      about: 'Tentang',
      toggleMenu: 'Buka menu',
      closeMenu: 'Tutup menu',
    },
    lesson: {
      next: 'Selanjutnya',
      previous: 'Sebelumnya',
      backToCurriculum: 'Kembali ke Kurikulum',
      backToUnit: 'Kembali ke Unit',
      estimatedTime: '{time} menit',
      objectives: 'Tujuan Pembelajaran',
      tableOfContents: 'Daftar Isi',
      markComplete: 'Tandai Selesai',
      completed: 'Selesai',
      startLesson: 'Mulai Pelajaran',
    },
    code: {
      run: 'Jalankan',
      running: 'Menjalankan...',
      output: 'Hasil Query',
      copy: 'Salin',
      copied: 'Tersalin!',
      reset: 'Reset',
      openInPlayground: 'Buka di Playground',
      executionTime: 'Waktu: {time}ms',
      compilationError: 'Error Sintaks SQL',
      runtimeError: 'Error Query',
      noOutput: '(Tidak ada baris hasil)',
      rowsAffected: '{count} baris terpengaruh',
      resultSet: 'Hasil {n} dari {total}',
    },
    exercise: {
      title: 'Latihan',
      checkAnswer: 'Periksa Jawaban',
      correct: '🎉 Benar! Bagus sekali!',
      incorrect: 'Belum tepat. Coba lagi!',
      showHint: 'Tampilkan Petunjuk',
      hideHint: 'Sembunyikan Petunjuk',
      hint: 'Petunjuk {n}',
      showSolution: 'Lihat Solusi',
      tryAgain: 'Coba Lagi',
      attempts: '{count} percobaan',
    },
    quiz: {
      title: 'Kuis',
      checkAnswer: 'Periksa',
      correct: 'Benar!',
      incorrect: 'Kurang tepat.',
      explanation: 'Penjelasan:',
      score: 'Nilai: {score}/100',
      retake: 'Ulangi Kuis',
    },
    progress: {
      overall: 'Progress Keseluruhan',
      lessonsCompleted: '{count} dari {total} pelajaran selesai',
      unitProgress: 'Unit {unit}',
      unitComplete: '🏆 Unit {unit} selesai!',
      allComplete: '🎓 Selamat! Kamu sudah menyelesaikan semua unit yang tersedia!',
      continueLearning: 'Lanjutkan Belajar',
      startLearning: 'Mulai Belajar',
    },
    curriculum: {
      title: 'Kurikulum SQL',
      subtitle: 'Dari nol hingga bisa query database sungguhan',
      totalTime: 'Total ~{hours} jam',
      unitN: 'Unit {n}',
      lessons: '{n} pelajaran',
      startUnit: 'Mulai Unit',
      continueUnit: 'Lanjutkan',
      reviewUnit: 'Ulangi',
      comingSoon: 'Segera Hadir',
      project: 'Project Unit',
      prerequisites: 'Prasyarat:',
    },
    home: {
      hero: {
        title: 'Belajar SQL',
        subtitle: 'Dari SMP/SMA, mulai dari nol',
        description: 'Platform belajar SQL dalam Bahasa Indonesia. Interaktif, gratis, dan dirancang khusus untuk pelajar Indonesia — jalankan query database langsung di browser.',
        cta: 'Mulai Belajar',
        ctaSecondary: 'Lihat Kurikulum',
      },
      features: {
        interactive: {
          title: 'Query Interaktif',
          description: 'Jalankan query SQL langsung di browser tanpa install database apapun.',
        },
        bilingual: {
          title: 'Bahasa Indonesia',
          description: 'Penjelasan lengkap dalam Bahasa Indonesia yang mudah dipahami.',
        },
        progressive: {
          title: 'Bertahap',
          description: 'Dari SELECT dasar hingga JOIN dan subquery, step by step dengan jelas.',
        },
        free: {
          title: 'Gratis',
          description: 'Semua konten gratis. Tidak perlu akun. Mulai langsung.',
        },
      },
    },
    playground: {
      title: 'Playground SQL',
      description: 'Eksperimen dengan query SQL secara bebas terhadap database contoh.',
      defaultCode: 'SELECT * FROM buku;',
      tips: 'Tips: Klik "Jalankan" untuk melihat hasil query kamu sebagai tabel.',
    },
    about: {
      title: 'Tentang Belajar SQL',
      description: 'Platform pembelajaran SQL gratis untuk siswa SMP dan SMA Indonesia.',
    },
    errors: {
      lessonNotFound: 'Pelajaran tidak ditemukan.',
      unitNotFound: 'Unit tidak ditemukan.',
      translationMissing: 'Pelajaran ini belum tersedia dalam Bahasa Inggris.',
      tryInIndonesian: 'Coba dalam Bahasa Indonesia',
      pageNotFound: 'Halaman tidak ditemukan.',
      backToHome: 'Kembali ke Beranda',
    },
    footer: {
      madeWith: 'Dibuat dengan ❤️ untuk pelajar Indonesia',
      openSource: 'Open Source',
      reportIssue: 'Laporkan Masalah',
    },
    language: {
      switch: 'English',
      current: 'Indonesia',
    },
    theme: {
      toggleLight: 'Mode Terang',
      toggleDark: 'Mode Gelap',
    },
    infoBox: {
      tip: 'Tips',
      warning: 'Perhatian',
      error: 'Error',
      fun: 'Fun Fact',
      note: 'Catatan',
    },
  },
  en: {
    meta: {
      siteTitle: 'Learn SQL',
      siteDescription: 'SQL learning platform for Indonesian middle and high school students. From zero to writing real database queries.',
      ogTitle: 'Learn SQL — For Indonesian Students',
    },
    nav: {
      home: 'Home',
      curriculum: 'Curriculum',
      playground: 'Playground',
      about: 'About',
      toggleMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    lesson: {
      next: 'Next',
      previous: 'Previous',
      backToCurriculum: 'Back to Curriculum',
      backToUnit: 'Back to Unit',
      estimatedTime: '{time} minutes',
      objectives: 'Learning Objectives',
      tableOfContents: 'Table of Contents',
      markComplete: 'Mark Complete',
      completed: '✓ Completed',
      startLesson: 'Start Lesson',
    },
    code: {
      run: 'Run',
      running: 'Running...',
      output: 'Query Result',
      copy: 'Copy',
      copied: 'Copied!',
      reset: 'Reset',
      openInPlayground: 'Open in Playground',
      executionTime: 'Time: {time}ms',
      compilationError: 'SQL Syntax Error',
      runtimeError: 'Query Error',
      noOutput: '(No result rows)',
      rowsAffected: '{count} row(s) affected',
      resultSet: 'Result {n} of {total}',
    },
    exercise: {
      title: 'Exercise',
      checkAnswer: 'Check Answer',
      correct: '🎉 Correct! Well done!',
      incorrect: 'Not quite right. Try again!',
      showHint: 'Show Hint',
      hideHint: 'Hide Hint',
      hint: 'Hint {n}',
      showSolution: 'Show Solution',
      tryAgain: 'Try Again',
      attempts: '{count} attempts',
    },
    quiz: {
      title: 'Quiz',
      checkAnswer: 'Check',
      correct: 'Correct!',
      incorrect: 'Not quite.',
      explanation: 'Explanation:',
      score: 'Score: {score}/100',
      retake: 'Retake Quiz',
    },
    progress: {
      overall: 'Overall Progress',
      lessonsCompleted: '{count} of {total} lessons completed',
      unitProgress: 'Unit {unit}',
      unitComplete: '🏆 Unit {unit} complete!',
      allComplete: '🎓 Congratulations! You have completed all available units!',
      continueLearning: 'Continue Learning',
      startLearning: 'Start Learning',
    },
    curriculum: {
      title: 'SQL Curriculum',
      subtitle: 'From zero to real database queries',
      totalTime: 'Total ~{hours} hours',
      unitN: 'Unit {n}',
      lessons: '{n} lessons',
      startUnit: 'Start Unit',
      continueUnit: 'Continue',
      reviewUnit: 'Review',
      comingSoon: 'Coming Soon',
      project: 'Unit Project',
      prerequisites: 'Prerequisites:',
    },
    home: {
      hero: {
        title: 'Learn SQL',
        subtitle: 'For Middle & High School Students',
        description: 'A SQL learning platform in Bahasa Indonesia (and English). Interactive, free, and designed for Indonesian learners — run real database queries directly in the browser.',
        cta: 'Start Learning',
        ctaSecondary: 'View Curriculum',
      },
      features: {
        interactive: {
          title: 'Interactive Queries',
          description: 'Run SQL queries directly in the browser without installing any database.',
        },
        bilingual: {
          title: 'Bahasa Indonesia',
          description: 'Full explanations in Bahasa Indonesia that are easy to understand.',
        },
        progressive: {
          title: 'Progressive',
          description: 'From basic SELECT to JOINs and subqueries, step by step clearly.',
        },
        free: {
          title: 'Free',
          description: 'All content is free. No account needed. Start immediately.',
        },
      },
    },
    playground: {
      title: 'SQL Playground',
      description: 'Experiment freely with SQL queries against a sample database.',
      defaultCode: 'SELECT * FROM buku;',
      tips: 'Tip: Click "Run" to see your query result as a table.',
    },
    about: {
      title: 'About Learn SQL',
      description: 'A free SQL learning platform for Indonesian middle and high school students.',
    },
    errors: {
      lessonNotFound: 'Lesson not found.',
      unitNotFound: 'Unit not found.',
      translationMissing: 'This lesson is not yet available in English.',
      tryInIndonesian: 'Try in Indonesian',
      pageNotFound: 'Page not found.',
      backToHome: 'Back to Home',
    },
    footer: {
      madeWith: 'Made with ❤️ for Indonesian learners',
      openSource: 'Open Source',
      reportIssue: 'Report an Issue',
    },
    language: {
      switch: 'Indonesia',
      current: 'English',
    },
    theme: {
      toggleLight: 'Light Mode',
      toggleDark: 'Dark Mode',
    },
    infoBox: {
      tip: 'Tip',
      warning: 'Warning',
      error: 'Error',
      fun: 'Fun Fact',
      note: 'Note',
    },
  },
} as const

export type UIStrings = typeof uiStrings.id

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function t(lang: Language, path: string): string {
  const keys = path.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = uiStrings[lang]
  for (const key of keys) {
    value = value?.[key]
    if (value === undefined) {
      // fallback to id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fallback: any = uiStrings.id
      for (const k of path.split('.')) fallback = fallback?.[k]
      return fallback ?? path
    }
  }
  return typeof value === 'string' ? value : path
}

/**
 * Replace template variables in string
 * e.g. interpolate('{count} dari {total}', { count: 5, total: 10 })
 */
export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`))
}

/**
 * Get the opposite language
 */
export function getOtherLang(lang: Language): Language {
  return lang === 'id' ? 'en' : 'id'
}

/**
 * Get display name of language
 */
export function getLangName(lang: Language): string {
  return lang === 'id' ? 'Indonesia' : 'English'
}

/**
 * Detect preferred language from browser headers
 */
export function detectLanguage(acceptLanguage?: string): Language {
  if (!acceptLanguage) return 'id'
  const preferred = (acceptLanguage.split(',')[0] ?? '').trim().toLowerCase()
  if (preferred.startsWith('en')) return 'en'
  return 'id'
}
