import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { pages, type Page } from './pages'

export function render(page: Page) {
  const Component = pages[page]
  return renderToString(
    <StrictMode>
      <Component />
    </StrictMode>,
  )
}
