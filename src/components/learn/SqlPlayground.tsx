import { useState, useCallback, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import { Button } from '../ui/Button'
import { ResultTable } from './ResultTable'
import { loadSqlJs, createDatabase, runQuery, formatRowsAffected, getNoOutputMessage } from '../../lib/sql-engine'
import { compareQueryResults } from '../../lib/compare-results'
import { SAMPLE_DATABASES } from '../../data/sample-databases'
import type { Database as SqlDatabase, SqlJsStatic } from 'sql.js'
import type { QueryResultSet, SqlPlaygroundProps } from '../../types/sql'

// Lazy CodeMirror hook — SQL flavor of the same pattern used for the Python playground
function useCodeMirror(
  containerRef: React.RefObject<HTMLDivElement | null>,
  code: string,
  onChange: (v: string) => void,
  readOnly: boolean,
  height: number
) {
  const viewRef = useRef<any>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let view: any = null
    let cancelled = false

    Promise.all([
      import('@codemirror/view'),
      import('@codemirror/state'),
      import('@codemirror/lang-sql'),
      import('@codemirror/theme-one-dark'),
      import('codemirror'),
    ]).then(([viewMod, stateMod, sqlMod, themeMod, setupMod]) => {
      if (cancelled) return

      const { EditorView } = viewMod
      const { EditorState } = stateMod
      const { sql, SQLite } = sqlMod
      const { oneDark } = themeMod
      const { basicSetup } = setupMod

      const state = EditorState.create({
        doc: code,
        extensions: [
          basicSetup,
          sql({ dialect: SQLite }),
          oneDark,
          EditorView.editable.of(!readOnly),
          EditorView.theme({
            '&': { height: `${height}px`, fontSize: '14px' },
            '.cm-scroller': { overflow: 'auto' },
          }),
          EditorView.updateListener.of(update => {
            if (update.docChanged) {
              onChangeRef.current(update.state.doc.toString())
            }
          }),
        ],
      })

      view = new EditorView({ state, parent: el })
      viewRef.current = view
    }).catch(err => {
      console.warn('CodeMirror failed to load:', err)
      // Fallback: render textarea
      if (!cancelled && el) {
        el.innerHTML = ''
        const ta = document.createElement('textarea')
        ta.value = code
        ta.readOnly = readOnly
        ta.style.cssText = `width:100%;height:${height}px;background:#1e1e1e;color:#d4d4d4;font-family:monospace;font-size:14px;padding:12px;border:none;resize:none;outline:none;`
        ta.addEventListener('input', () => onChangeRef.current(ta.value))
        el.appendChild(ta)
      }
    })

    return () => {
      cancelled = true
      if (view) view.destroy()
      viewRef.current = null
    }
  }, []) // intentionally mount once

  // Sync external code changes (e.g. reset)
  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    const current = view.state.doc.toString()
    if (current !== code) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: code },
      })
    }
  }, [code])
}

// Icons
function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
      <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H4.598a.75.75 0 00-.75.75v3.634a.75.75 0 001.5 0v-2.033l.312.311a7 7 0 0011.712-3.138.75.75 0 00-1.06-.179zm-9.624-3.848a5.5 5.5 0 019.201-2.466l.312.311H12.768a.75.75 0 000 1.5h3.634a.75.75 0 00.75-.75V2.537a.75.75 0 00-1.5 0v2.033l-.312-.311A7 7 0 003.628 7.397a.75.75 0 001.06.179z" clipRule="evenodd" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
  )
}

export function SqlPlayground({
  initialCode,
  lang,
  database = 'toko_buku',
  schema,
  readOnly = false,
  showOutput = true,
  expectedQuery,
  expectedResult,
  compareOptions,
  onSuccess,
  height = 250,
}: SqlPlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [results, setResults] = useState<QueryResultSet[]>([])
  const [rowsAffected, setRowsAffected] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasRun, setHasRun] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [execTime, setExecTime] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [matched, setMatched] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const sqlRef = useRef<SqlJsStatic | null>(null)
  const dbRef = useRef<SqlDatabase | null>(null)

  const seedSql = schema ?? SAMPLE_DATABASES[database]

  const initDb = useCallback(async () => {
    if (!sqlRef.current) {
      sqlRef.current = await loadSqlJs()
    }
    dbRef.current?.close()
    dbRef.current = createDatabase(sqlRef.current, seedSql)
  }, [seedSql])

  useEffect(() => {
    let cancelled = false
    initDb().catch(err => {
      if (!cancelled) console.error('Failed to initialize sql.js database:', err)
    })
    return () => {
      cancelled = true
      dbRef.current?.close()
      dbRef.current = null
    }
  }, [initDb])

  useCodeMirror(editorRef, code, setCode, readOnly, height)

  const handleDownload = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'query.sql'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [code])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [code])

  const handleReset = useCallback(async () => {
    setCode(initialCode)
    setResults([])
    setRowsAffected(null)
    setError(null)
    setHasRun(false)
    setExecTime(null)
    setMatched(false)
    await initDb()
  }, [initialCode, initDb])

  const handleRun = useCallback(async () => {
    setIsRunning(true)
    setMatched(false)
    if (!dbRef.current || !sqlRef.current) {
      await initDb()
    }
    const db = dbRef.current
    const SQL = sqlRef.current
    if (!db || !SQL) {
      setIsRunning(false)
      return
    }

    const start = performance.now()
    const outcome = runQuery(db, code)
    const elapsed = performance.now() - start

    setResults(outcome.results)
    setRowsAffected(outcome.rowsAffected)
    setError(outcome.error)
    setHasRun(true)
    setExecTime(`${elapsed.toFixed(0)}ms`)

    if (!outcome.error && (expectedQuery || expectedResult)) {
      let expected: QueryResultSet | undefined = expectedResult
      if (!expected && expectedQuery) {
        const refDb = createDatabase(SQL, seedSql)
        const refOutcome = runQuery(refDb, expectedQuery)
        expected = refOutcome.results[0]
        refDb.close()
      }
      const isMatch = compareQueryResults(outcome.results[0], expected, compareOptions)
      if (isMatch) {
        setMatched(true)
        onSuccess?.()
      }
    }

    setIsRunning(false)
  }, [code, expectedQuery, expectedResult, compareOptions, onSuccess, seedSql, initDb])

  return (
    <div className="rounded-lg border border-slate-700 overflow-hidden my-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-slate-800 px-3 py-2">
        <span className="text-xs text-slate-400 font-mono">SQL</span>
        <div className="flex items-center gap-1.5">
          {!readOnly && (
            <Button
              variant="ghost"
              size="sm"
              icon={<ResetIcon />}
              onClick={handleReset}
              aria-label={lang === 'id' ? 'Reset query & data' : 'Reset query & data'}
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              {lang === 'id' ? 'Reset' : 'Reset'}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            icon={<CopyIcon />}
            onClick={handleCopy}
            aria-label={lang === 'id' ? 'Salin query' : 'Copy query'}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            {copied ? (lang === 'id' ? 'Tersalin!' : 'Copied!') : (lang === 'id' ? 'Salin' : 'Copy')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<DownloadIcon />}
            onClick={handleDownload}
            aria-label={lang === 'id' ? 'Unduh query' : 'Download query'}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            {lang === 'id' ? 'Unduh' : 'Download'}
          </Button>
          <Button
            variant="success"
            size="sm"
            icon={<PlayIcon />}
            onClick={handleRun}
            loading={isRunning}
            aria-label={lang === 'id' ? 'Jalankan query' : 'Run query'}
          >
            {isRunning ? (lang === 'id' ? 'Menjalankan...' : 'Running...') : (lang === 'id' ? 'Jalankan' : 'Run')}
          </Button>
        </div>
      </div>

      {/* Editor + Output */}
      <div className="flex flex-col md:flex-row">
        {/* Editor */}
        <div
          ref={editorRef}
          className={clsx(
            'min-w-0',
            showOutput ? 'w-full md:w-1/2' : 'w-full'
          )}
          style={{ backgroundColor: '#1e1e1e' }}
        />

        {/* Output */}
        {showOutput && (
          <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-slate-700 bg-slate-900 flex flex-col">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-700">
              <span className="text-xs text-slate-400 font-mono">{lang === 'id' ? 'Hasil Query' : 'Query Result'}</span>
              {execTime && (
                <span className="text-xs text-slate-500 font-mono">{execTime}</span>
              )}
            </div>
            <div
              className="p-3 font-mono text-sm overflow-auto flex-1"
              style={{ minHeight: `${Math.max(height - 32, 100)}px` }}
            >
              {!hasRun ? (
                <span className="text-slate-500 italic">
                  {lang === 'id' ? 'Klik "Jalankan" untuk menjalankan query...' : 'Click "Run" to execute the query...'}
                </span>
              ) : error ? (
                <pre className="whitespace-pre-wrap break-words text-red-400">{error}</pre>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((r, i) => (
                    <div key={i}>
                      {results.length > 1 && (
                        <p className="text-xs text-slate-400 mb-1">
                          {lang === 'id' ? `Hasil ${i + 1} dari ${results.length}` : `Result ${i + 1} of ${results.length}`}
                        </p>
                      )}
                      <ResultTable result={r} lang={lang} />
                    </div>
                  ))}
                </div>
              ) : rowsAffected !== null ? (
                <p className="text-green-300">{formatRowsAffected(rowsAffected, lang)}</p>
              ) : (
                <p className="text-slate-500 italic">{getNoOutputMessage(lang)}</p>
              )}
              {matched && (
                <div className="mt-3 px-3 py-2 bg-emerald-900/40 border border-emerald-700 rounded text-emerald-300 text-sm">
                  {lang === 'id' ? 'Hasil sesuai! Jawaban benar.' : 'Result matches! Correct answer.'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
