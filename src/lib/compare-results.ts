import type { QueryResultSet } from '@/types/sql'

export interface CompareOptions {
  /** Require rows to appear in the same order (use for ORDER BY lessons). Default: false. */
  strictOrder?: boolean
  /** Ignore column names, compare values only (use when aliasing isn't the point). Default: false. */
  ignoreColumnNames?: boolean
}

/**
 * Compares two query result sets for "did the student get the right answer" purposes.
 * SQLite does not guarantee row order without an explicit ORDER BY, so the default is
 * multiset (order-insensitive) equality — otherwise ordinary SELECT/WHERE exercises
 * would produce false negatives depending on SQLite's internal scan order.
 */
export function compareQueryResults(
  actual: QueryResultSet | undefined,
  expected: QueryResultSet | undefined,
  options: CompareOptions = {}
): boolean {
  if (!actual || !expected) return false
  if (!options.ignoreColumnNames && !arraysEqual(actual.columns, expected.columns)) return false
  if (actual.values.length !== expected.values.length) return false
  if (actual.columns.length !== expected.columns.length) return false

  const actualRows = actual.values.map(rowKey)
  const expectedRows = expected.values.map(rowKey)

  if (options.strictOrder) {
    return actualRows.every((row, i) => row === expectedRows[i])
  }

  return multisetEqual(actualRows, expectedRows)
}

function rowKey(row: unknown[]): string {
  return JSON.stringify(row.map((v) => (v === null ? null : v)))
}

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

function multisetEqual(a: string[], b: string[]): boolean {
  const sortedA = [...a].sort()
  const sortedB = [...b].sort()
  return sortedA.every((v, i) => v === sortedB[i])
}
