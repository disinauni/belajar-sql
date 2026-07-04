import { describe, it, expect, beforeAll } from 'vitest'
import path from 'node:path'
import initSqlJs from 'sql.js'
import type { SqlJsStatic } from 'sql.js'
import { createDatabase, runQuery, formatRowsAffected, getNoOutputMessage } from '@/lib/sql-engine'

// sql.js's WASM binary runs fine under Node/Vitest too — we just point
// locateFile at node_modules directly instead of the browser's /wasm/ path
// (which is what the app's own loadSqlJs() uses via import.meta.env.BASE_URL).
let SQL: SqlJsStatic

beforeAll(async () => {
  SQL = await initSqlJs({
    locateFile: (file: string) => path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', file),
  })
})

const SEED = `
CREATE TABLE t (id INTEGER PRIMARY KEY, nama TEXT NOT NULL, nilai INTEGER);
INSERT INTO t (id, nama, nilai) VALUES (1, 'A', 10), (2, 'B', 20);
`

describe('createDatabase', () => {
  it('seeds a fresh database from a DDL+INSERT script', () => {
    const db = createDatabase(SQL, SEED)
    const outcome = runQuery(db, 'SELECT id, nama, nilai FROM t ORDER BY id;')
    expect(outcome.error).toBeNull()
    expect(outcome.results[0]?.columns).toEqual(['id', 'nama', 'nilai'])
    expect(outcome.results[0]?.values).toEqual([[1, 'A', 10], [2, 'B', 20]])
    db.close()
  })

  it('creates an empty database when seedSql is blank', () => {
    const db = createDatabase(SQL, '')
    const outcome = runQuery(db, "SELECT name FROM sqlite_master WHERE type='table';")
    expect(outcome.results).toEqual([])
    db.close()
  })
})

describe('runQuery', () => {
  it('returns a result set for a SELECT statement', () => {
    const db = createDatabase(SQL, SEED)
    const outcome = runQuery(db, 'SELECT nama FROM t WHERE nilai > 15;')
    expect(outcome.error).toBeNull()
    expect(outcome.results).toHaveLength(1)
    expect(outcome.results[0]?.values).toEqual([['B']])
    db.close()
  })

  it('returns rowsAffected for an INSERT with no result set', () => {
    const db = createDatabase(SQL, SEED)
    const outcome = runQuery(db, "INSERT INTO t (id, nama, nilai) VALUES (3, 'C', 30);")
    expect(outcome.error).toBeNull()
    expect(outcome.results).toEqual([])
    expect(outcome.rowsAffected).toBe(1)
    db.close()
  })

  it('captures a syntax error instead of throwing', () => {
    const db = createDatabase(SQL, SEED)
    const outcome = runQuery(db, 'SELCT * FROM t;')
    expect(outcome.error).not.toBeNull()
    expect(outcome.results).toEqual([])
    db.close()
  })

  it('captures a runtime error for a missing table', () => {
    const db = createDatabase(SQL, SEED)
    const outcome = runQuery(db, 'SELECT * FROM tidak_ada;')
    expect(outcome.error).toContain('no such table')
    db.close()
  })
})

describe('formatRowsAffected / getNoOutputMessage', () => {
  it('formats singular and plural row counts in English', () => {
    expect(formatRowsAffected(1, 'en')).toBe('1 row affected.')
    expect(formatRowsAffected(3, 'en')).toBe('3 rows affected.')
  })

  it('formats row counts in Indonesian', () => {
    expect(formatRowsAffected(2, 'id')).toBe('2 baris terpengaruh.')
  })

  it('returns a language-appropriate no-output message', () => {
    expect(getNoOutputMessage('id')).toContain('tidak ada hasil')
    expect(getNoOutputMessage('en')).toContain('nothing to display')
  })
})
