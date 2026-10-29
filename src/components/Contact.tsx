import { links } from '../content'
import { order } from '../lib'

export function Contact() {
  const socials = [links.github, links.linkedin, links.x]

  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
        <h2 data-reveal className="text-sm font-medium text-muted">
          Contact
        </h2>
        <a
          data-reveal
          style={order(1)}
          href={links.email.href}
          className="hover-line mt-6 inline-block break-all font-mono text-2xl tracking-tight text-fg sm:text-4xl md:text-5xl"
        >
          {links.email.text}
        </a>
        <ul data-reveal style={order(2)} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
          {socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="hover-line text-muted transition-colors hover:text-accent">
                {s.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
