// sql.js (SQLite compiled to WebAssembly) wrapper — runs entirely client-side,
// no server, no API key, no network round-trip. See scripts/copy-sql-wasm.mjs
// for how sql-wasm.wasm ends up in public/wasm/.
import type { Database, SqlJsStatic, QueryExecResult } from 'sql.js'
import type { QueryResultSet, RunQueryOutcome } from '@/types/sql'

let sqlJsPromise: Promise<SqlJsStatic> | null = null

export function loadSqlJs(): Promise<SqlJsStatic> {
  if (!sqlJsPromise) {
    sqlJsPromise = import('sql.js').then((mod) => {
      const initSqlJs = mod.default
      return initSqlJs({
        locateFile: (file: string) => `${import.meta.env.BASE_URL}wasm/${file}`,
      })
    })
  }
  return sqlJsPromise
}

/** Creates a fresh in-memory database and seeds it with the given DDL+INSERT script. */
export function createDatabase(SQL: SqlJsStatic, seedSql: string): Database {
  const db = new SQL.Database()
  if (seedSql.trim()) {
    db.run(seedSql)
  }
  return db
}

/** True if the last statement in a (possibly multi-statement) SQL script is a query, not a DML/DDL command. */
function isSelectLikeStatement(sql: string): boolean {
  const statements = sql.split(';').map((s) => s.trim()).filter(Boolean)
  const last = statements[statements.length - 1]
  if (!last) return false
  return /^(SELECT|WITH)\b/i.test(last)
}

/** Runs a (possibly multi-statement) SQL script against `db` and normalizes the outcome. */
export function runQuery(db: Database, sql: string): RunQueryOutcome {
  try {
    const raw = db.exec(sql)
    const results: QueryResultSet[] = raw.map((r: QueryExecResult) => ({ columns: r.columns, values: r.values }))
    const rowsAffected = results.length === 0 && !isSelectLikeStatement(sql) ? db.getRowsModified() : null
    return { results, rowsAffected, error: null }
  } catch (err) {
    return {
      results: [],
      rowsAffected: null,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

export function formatRowsAffected(n: number, lang: 'id' | 'en'): string {
  if (lang === 'id') return `${n} baris terpengaruh.`
  return `${n} row${n === 1 ? '' : 's'} affected.`
}

export function getNoOutputMessage(lang: 'id' | 'en'): string {
  return lang === 'id' ? 'Query berhasil, tidak ada hasil untuk ditampilkan.' : 'Query succeeded, nothing to display.'
}
