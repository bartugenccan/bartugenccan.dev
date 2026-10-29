import { Home } from './Home'
import { Projects } from './Projects'

export type Page = 'home' | 'projects'

export const pages = { home: Home, projects: Projects } satisfies Record<Page, () => React.JSX.Element>
