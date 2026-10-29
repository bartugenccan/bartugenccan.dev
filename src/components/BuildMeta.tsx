// Page-edge metadata strip. Every value comes from the build (see vite.config.ts).
const REPO = 'https://github.com/bartugenccan/bartugenccan.dev'

export function BuildMeta() {
  const { sha, date } = __BUILD__

  return (
    <footer className="mono flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-line py-4 text-[12px] text-muted">
      <span>bartugenccan.dev</span>
      <span>
        {sha && (
          <>
            rev{' '}
            <a href={`${REPO}/commit/${sha}`} className="sel text-fg underline decoration-line underline-offset-4">
              {sha}
            </a>
            <span className="mx-2">·</span>
          </>
        )}
        updated <time dateTime={date}>{date}</time>
      </span>
    </footer>
  )
}
