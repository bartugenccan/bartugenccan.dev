import { links } from '../content'
import { order } from '../lib'
import { BuildMeta } from './BuildMeta'
import { SECTION, SectionHeading } from './SectionHeading'

export function Contact() {
  const socials = [links.github, links.linkedin, links.x]

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="border-t border-line pt-10 pb-16 md:pt-12 md:pb-20">
        <SectionHeading n={SECTION.contact} className="text-2xl md:text-3xl">
          Contact
        </SectionHeading>
        <a
          data-reveal
          style={order(1)}
          href={links.email.href}
          className="sel mono mt-10 inline-block text-2xl tracking-tight break-all text-fg sm:text-4xl md:text-5xl"
        >
          {links.email.text}
        </a>
        <ul data-reveal style={order(2)} className="mono mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="sel text-muted">
                {s.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <BuildMeta />
    </section>
  )
}
