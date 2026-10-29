import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'node:child_process'
import { resolve } from 'node:path'

const git = (args: string) => {
  try {
    return execSync(`git ${args}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || null
  } catch {
    return null
  }
}

// Shown in the page footer. Cloudflare Workers Builds sets WORKERS_CI_COMMIT_SHA;
// locally it comes from git. If neither is available the sha is left out.
const build = {
  sha: (process.env.WORKERS_CI_COMMIT_SHA ?? git('rev-parse HEAD'))?.slice(0, 7) ?? null,
  date: git('log -1 --format=%cs') ?? new Date().toISOString().slice(0, 10),
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __BUILD__: JSON.stringify(build),
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        projects: resolve(import.meta.dirname, 'projects/index.html'),
      },
    },
  },
})
