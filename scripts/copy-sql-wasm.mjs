// Copies sql.js's WASM binaries into public/wasm/ so they can be fetched at
// runtime by sql-engine.ts's locateFile(). Runs automatically via predev/prebuild.
//
// sql.js ships several build variants (sql-wasm.js, sql-wasm-browser.js, ...),
// each pairing with a differently-named .wasm file. Depending on how Vite
// resolves the "sql.js" import (dev pre-bundling vs production build), a
// different variant's JS may be loaded — so we copy every .wasm file in dist/
// rather than guessing which one variant will be used.
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(root, '..')

const srcDir = path.join(projectRoot, 'node_modules', 'sql.js', 'dist')
const destDir = path.join(projectRoot, 'public', 'wasm')

if (!existsSync(srcDir)) {
  console.warn(`[copy-sql-wasm] sql.js dist not found at ${srcDir} — did "npm install" run?`)
  process.exit(0)
}

mkdirSync(destDir, { recursive: true })

const wasmFiles = readdirSync(srcDir).filter((f) => f.endsWith('.wasm'))
for (const file of wasmFiles) {
  copyFileSync(path.join(srcDir, file), path.join(destDir, file))
}
console.log(`[copy-sql-wasm] copied ${wasmFiles.length} wasm file(s) -> public/wasm/ (${wasmFiles.join(', ')})`)
