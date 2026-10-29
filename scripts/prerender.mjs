// Writes server-rendered markup into the built HTML files, so every page is
// readable before (and without) JavaScript.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const root = resolve(fileURLToPath(import.meta.url), '../..')
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)

const routes = [
  { page: 'home', file: 'dist/index.html' },
  { page: 'projects', file: 'dist/projects/index.html' },
]

for (const { page, file } of routes) {
  const path = resolve(root, file)
  const html = await readFile(path, 'utf8')
  if (!html.includes('<!--app-->')) throw new Error(`${file}: missing <!--app--> placeholder`)
  await writeFile(path, html.replace('<!--app-->', render(page)))
  console.log(`prerendered ${file}`)
}

await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true })
