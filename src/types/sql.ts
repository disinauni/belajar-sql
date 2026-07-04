import type { SampleDatabaseId } from '@/data/sample-databases'

/** One statement's result, as returned by sql.js's Database#exec() */
export interface QueryResultSet {
  columns: string[]
  values: unknown[][]
}

export interface RunQueryOutcome {
  results: QueryResultSet[]
  rowsAffected: number | null // set when a DML statement (INSERT/UPDATE/DELETE) ran and produced no result set
  error: string | null
}

export interface SqlPlaygroundProps {
  initialCode: string
  lang: 'id' | 'en'
  /** Named shared sample database to seed on mount/reset (see sample-databases.ts) */
  database?: SampleDatabaseId
  /** One-off DDL+INSERT schema string, used instead of `database` for lesson-specific mini examples */
  schema?: string
  readOnly?: boolean
  showOutput?: boolean
  /** SQL query whose live result the student's query must match (row-set comparison) */
  expectedQuery?: string
  /** Literal expected result, used instead of expectedQuery for special cases */
  expectedResult?: QueryResultSet
  compareOptions?: { strictOrder?: boolean; ignoreColumnNames?: boolean }
  onSuccess?: () => void
  height?: number
}
