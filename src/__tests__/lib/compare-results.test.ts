import { describe, it, expect } from 'vitest'
import { compareQueryResults } from '@/lib/compare-results'
import type { QueryResultSet } from '@/types/sql'

const rs = (columns: string[], values: unknown[][]): QueryResultSet => ({ columns, values })

describe('compareQueryResults', () => {
  it('returns false if either side is undefined', () => {
    expect(compareQueryResults(undefined, rs(['a'], [[1]]))).toBe(false)
    expect(compareQueryResults(rs(['a'], [[1]]), undefined)).toBe(false)
  })

  it('matches identical results', () => {
    const a = rs(['judul', 'harga'], [['Sapiens', 110000]])
    const b = rs(['judul', 'harga'], [['Sapiens', 110000]])
    expect(compareQueryResults(a, b)).toBe(true)
  })

  it('is order-insensitive by default (row-set / multiset equality)', () => {
    const actual = rs(['id'], [[1], [2], [3]])
    const expected = rs(['id'], [[3], [1], [2]])
    expect(compareQueryResults(actual, expected)).toBe(true)
  })

  it('fails with strictOrder when row order differs', () => {
    const actual = rs(['id'], [[1], [2], [3]])
    const expected = rs(['id'], [[3], [1], [2]])
    expect(compareQueryResults(actual, expected, { strictOrder: true })).toBe(false)
  })

  it('passes with strictOrder when row order matches', () => {
    const actual = rs(['id'], [[1], [2], [3]])
    const expected = rs(['id'], [[1], [2], [3]])
    expect(compareQueryResults(actual, expected, { strictOrder: true })).toBe(true)
  })

  it('fails when column names differ by default', () => {
    const actual = rs(['nama_buku'], [['Sapiens']])
    const expected = rs(['judul'], [['Sapiens']])
    expect(compareQueryResults(actual, expected)).toBe(false)
  })

  it('ignores column names when ignoreColumnNames is set', () => {
    const actual = rs(['nama_buku'], [['Sapiens']])
    const expected = rs(['judul'], [['Sapiens']])
    expect(compareQueryResults(actual, expected, { ignoreColumnNames: true })).toBe(true)
  })

  it('fails when row counts differ', () => {
    const actual = rs(['id'], [[1], [2]])
    const expected = rs(['id'], [[1], [2], [3]])
    expect(compareQueryResults(actual, expected)).toBe(false)
  })

  it('fails when column counts differ', () => {
    const actual = rs(['id', 'judul'], [[1, 'Sapiens']])
    const expected = rs(['id'], [[1]])
    expect(compareQueryResults(actual, expected)).toBe(false)
  })

  it('treats NULL values correctly', () => {
    const actual = rs(['stok'], [[null], [5]])
    const expected = rs(['stok'], [[5], [null]])
    expect(compareQueryResults(actual, expected)).toBe(true)
  })

  it('distinguishes NULL from other falsy values', () => {
    const actual = rs(['stok'], [[null]])
    const expected = rs(['stok'], [[0]])
    expect(compareQueryResults(actual, expected)).toBe(false)
  })
})
