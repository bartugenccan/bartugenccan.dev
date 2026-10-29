import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { ProjectTeaser } from '../components/ProjectTeaser'
import { Experience } from '../components/Experience'
import { Contact } from '../components/Contact'

export function Home() {
  return (
    <>
      <div className="paper" aria-hidden="true" />
      <Nav page="home" />
      <main>
        <Hero />
        <ProjectTeaser />
        {/* Writing: add a section here when the first post is published on
            blog.bartugenccan.dev. An empty "Writing" heading is worse than none.
            Format: date, title, one-line summary; every line carries a number
            or a behaviour. Add a "Writing" link to the nav at the same time. */}
        <Experience />
        <Contact />
      </main>
    </>
  )
}
