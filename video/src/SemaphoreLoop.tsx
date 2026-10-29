import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { loadFont } from '@remotion/google-fonts/GeistMono'

// The go-crawler semaphore bug, drawn: requests acquire one of two slots,
// two of them fail without releasing, the queue freezes, then the fix
// (release on every exit path) frees the slots and the flow resumes.

const { fontFamily } = loadFont('normal', { weights: ['400', '500'], subsets: ['latin'] })

const C = {
  bg: '#0a0b0d',
  surface: '#111318',
  raised: '#171a21',
  line: '#23262f',
  fg: '#e7e9ee',
  muted: '#8b919d',
  accent: '#b8f34a',
  fail: '#ff5a4e',
}

const ease = Easing.bezier(0.23, 1, 0.32, 1)
const MOVE = 14

type Req = { id: number; arrive: number; acquire?: number; slot?: 0 | 1; release?: number; fail?: number; drop?: number }

const REQUESTS: Req[] = [
  { id: 1, arrive: -1, acquire: 10, slot: 0, release: 46 },
  { id: 2, arrive: -1, acquire: 22, slot: 1, release: 62 },
  { id: 3, arrive: -1, acquire: 52, slot: 0, fail: 78, drop: 204 },
  { id: 4, arrive: -1, acquire: 68, slot: 1, fail: 98, drop: 212 },
  { id: 5, arrive: 30, acquire: 224, slot: 0, release: 258 },
  { id: 6, arrive: 70, acquire: 234, slot: 1, release: 272 },
  { id: 7, arrive: 110, acquire: 274, slot: 0 },
  { id: 8, arrive: 140, acquire: 288, slot: 1 },
  { id: 9, arrive: 170 },
  { id: 10, arrive: 200 },
]

const FAIL_1 = 78
const FREEZE = 98
const FIX = 192
const RECOVER = 216

const QUEUE_HEAD_X = 452
const QUEUE_GAP = 132
const SLOT_X = 700
const SLOT_Y = [296, 424]
const ROW_Y = 360
const DONE_X = 1100
const W = 120
const H = 58

const progress = (f: number, start: number | undefined, len = MOVE) =>
  start === undefined ? 0 : interpolate(f, [start, start + len], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease })

function queueIndex(f: number, r: Req) {
  // Continuous position in the queue: each earlier request that has left shifts us forward.
  return REQUESTS.filter((o) => o.id < r.id).reduce((sum, o) => sum + (1 - progress(f, o.acquire)), 0)
}

function Request({ r }: { r: Req }) {
  const f = useCurrentFrame()

  const queueX = QUEUE_HEAD_X - queueIndex(f, r) * QUEUE_GAP
  const toSlot = progress(f, r.acquire)
  const toDone = progress(f, r.release)
  const dropped = progress(f, r.drop, 18)
  const failed = progress(f, r.fail, 6)

  const slotY = r.slot === undefined ? ROW_Y : SLOT_Y[r.slot]
  let x = interpolate(toSlot, [0, 1], [queueX, SLOT_X])
  let y = interpolate(toSlot, [0, 1], [ROW_Y, slotY])
  x = interpolate(toDone, [0, 1], [x, DONE_X])
  y = interpolate(toDone, [0, 1], [y, ROW_Y]) + dropped * 18

  // Short shake when the request fails.
  if (r.fail !== undefined && f >= r.fail && f < r.fail + 12) x += Math.sin((f - r.fail) * 2.2) * 5 * (1 - (f - r.fail) / 12)

  const arrived = r.arrive < 0 ? 1 : progress(f, r.arrive, 12)
  const opacity = arrived * (1 - toDone) * (1 - dropped) * interpolate(x, [-40, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const inSlot = toSlot > 0.99 && toDone === 0
  const color = failed > 0.5 ? C.fail : inSlot ? C.accent : C.fg
  const border = failed > 0.5 ? C.fail : inSlot ? C.accent : C.line

  return (
    <div
      style={{
        position: 'absolute',
        left: x - W / 2,
        top: y - H / 2 + (1 - arrived) * -16,
        width: W,
        height: H,
        borderRadius: 8,
        border: `2px solid ${border}`,
        background: failed > 0.5 ? 'rgba(255,90,78,0.10)' : C.raised,
        color,
        opacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
      }}
    >
      req {String(r.id).padStart(2, '0')}
    </div>
  )
}

function Label({ x, y, children, color = C.muted, size = 24 }: { x: number; y: number; children: React.ReactNode; color?: string; size?: number }) {
  return <div style={{ position: 'absolute', left: x, top: y, color, fontSize: size, whiteSpace: 'nowrap' }}>{children}</div>
}

export function SemaphoreLoop() {
  const f = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()

  const held = REQUESTS.filter((r) => r.acquire !== undefined && f >= r.acquire + MOVE && (r.release ?? r.drop ?? Infinity) > f).length
  const free = 2 - held
  const queued = REQUESTS.filter((r) => (r.arrive < 0 || f >= r.arrive) && (r.acquire === undefined || f < r.acquire)).length
  const done = REQUESTS.filter((r) => r.release !== undefined && f >= r.release + MOVE).length
  const frozen = f >= FREEZE && f < RECOVER
  const stalled = frozen ? ((f - FREEZE) / 30).toFixed(1) : null

  let status = { text: 'ok · requests acquire and release slots', color: C.accent }
  if (f >= FAIL_1) status = { text: 'req 03 failed · slot not released', color: C.fail }
  if (f >= FREEZE) status = { text: 'req 04 failed · 0 slots free · queue frozen', color: C.fail }
  if (f >= FIX) status = { text: 'fix: release the slot on every exit path', color: C.accent }
  if (f >= RECOVER + 10) status = { text: 'ok · requests acquire and release slots', color: C.accent }

  // Fade through the background at the seam so the loop is invisible.
  const fade = interpolate(f, [0, 8, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const boxBorder = frozen ? C.fail : C.line

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle, ${C.line} 1.2px, transparent 1.2px)`,
          backgroundSize: '32px 32px',
          opacity: 0.6,
        }}
      />
      <AbsoluteFill style={{ opacity: fade }}>
        <Label x={72} y={56} color={C.fg} size={32}>
          semaphore <span style={{ color: C.muted }}>· capacity 2</span>
        </Label>

        <Label x={72} y={196}>queue · {queued}</Label>
        <Label x={SLOT_X - 160} y={164}>
          slots · <span style={{ color: free === 0 ? C.fail : C.accent }}>{free} free</span>
        </Label>
        <Label x={DONE_X - 60} y={196}>done · {done}</Label>

        <div
          style={{
            position: 'absolute',
            left: SLOT_X - 160,
            top: 210,
            width: 320,
            height: 300,
            borderRadius: 10,
            border: `2px solid ${boxBorder}`,
            background: C.surface,
          }}
        />
        {SLOT_Y.map((y) => (
          <div
            key={y}
            style={{
              position: 'absolute',
              left: SLOT_X - 76,
              top: y - 37,
              width: 152,
              height: 74,
              borderRadius: 8,
              border: `2px dashed ${C.line}`,
            }}
          />
        ))}

        {REQUESTS.map((r) => (
          <Request key={r.id} r={r} />
        ))}

        <div style={{ position: 'absolute', left: 72, right: 72, top: 572, height: 2, background: C.line }} />
        <Label x={72} y={604} color={status.color} size={32}>
          {status.text}
        </Label>
        {stalled && (
          <div style={{ position: 'absolute', right: 72, top: 604, color: C.fail, fontSize: 32 }}>
            stalled {stalled}s
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
