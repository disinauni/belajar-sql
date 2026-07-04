import type { QueryResultSet } from '../../types/sql'
import type { Language } from '../../types/lesson'

interface ResultTableProps {
  result: QueryResultSet
  lang: Language
  maxRows?: number
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return 'NULL'
  return String(value)
}

export function ResultTable({ result, lang, maxRows = 200 }: ResultTableProps) {
  const rows = result.values.slice(0, maxRows)
  const truncated = result.values.length > maxRows

  return (
    <div>
      <div className="result-table-wrapper">
        <table className="result-table">
          <thead>
            <tr>
              {result.columns.map((col, i) => (
                <th key={i} scope="col">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} className={cell === null ? 'italic text-slate-500' : undefined}>
                    {formatCell(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
        {truncated
          ? (lang === 'id'
              ? `Menampilkan ${maxRows} dari ${result.values.length} baris`
              : `Showing ${maxRows} of ${result.values.length} rows`)
          : (lang === 'id'
              ? `${result.values.length} baris`
              : `${result.values.length} row${result.values.length === 1 ? '' : 's'}`)}
      </p>
    </div>
  )
}
