import { useEffect, useRef, useState } from 'react'
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  Fog,
  Group,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'
import { prefersReducedMotion } from '../lib'

// A process graph: nodes are processes, packets travel along the edges.
// Every few seconds one edge fails (red, packets stall) and then recovers.

const COLOR = {
  bg: new Color('#0a0b0d'),
  node: new Color('#c9ced8'),
  edge: new Color('#3a4252'),
  packet: new Color('#b8f34a'),
  fail: new Color('#ff5a4e'),
}
const NODE_COUNT = 18
const FAIL_EVERY = 3.4
const FAIL_FOR = 1.8
const BOUNDS = new Vector3(2.3, 1.7, 1.3)

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildGraph() {
  const rand = mulberry32(7)
  const nodes: Vector3[] = []
  while (nodes.length < NODE_COUNT) {
    const unit = new Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1)
    if (unit.length() > 1) continue
    const p = unit.multiply(BOUNDS)
    if (nodes.some((n) => n.distanceTo(p) < 0.75)) continue
    nodes.push(p)
  }

  // Connect every node to its two nearest neighbours.
  const seen = new Set<string>()
  const edges: [number, number][] = []
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: n.distanceTo(m) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (seen.has(key)) return
        seen.add(key)
        edges.push([i, j])
      })
  })

  const packets = edges.map((_, edge) => ({
    edge,
    t: rand(),
    speed: 0.25 + rand() * 0.35,
    forward: rand() > 0.5,
  }))

  return { nodes, edges, packets }
}

function createScene(canvas: HTMLCanvasElement, animate: boolean) {
  const { nodes, edges, packets } = buildGraph()

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  const scene = new Scene()
  scene.fog = new Fog(COLOR.bg, 5.5, 10.5)
  const camera = new PerspectiveCamera(40, 1, 0.1, 50)
  camera.position.set(0, 0, 7.4)

  const group = new Group()
  scene.add(group)

  const positions = new Float32Array(edges.length * 6)
  const colors = new Float32Array(edges.length * 6)
  edges.forEach(([a, b], i) => {
    nodes[a].toArray(positions, i * 6)
    nodes[b].toArray(positions, i * 6 + 3)
  })
  const lineGeometry = new BufferGeometry()
  lineGeometry.setAttribute('position', new BufferAttribute(positions, 3))
  const colorAttr = new BufferAttribute(colors, 3)
  lineGeometry.setAttribute('color', colorAttr)
  const lineMaterial = new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9 })
  group.add(new LineSegments(lineGeometry, lineMaterial))

  const nodeGeometry = new BoxGeometry(0.1, 0.1, 0.1)
  const packetGeometry = new BoxGeometry(0.05, 0.05, 0.05)
  const nodeMaterial = new MeshBasicMaterial()
  const packetMaterial = new MeshBasicMaterial()
  const nodeMesh = new InstancedMesh(nodeGeometry, nodeMaterial, nodes.length)
  const packetMesh = new InstancedMesh(packetGeometry, packetMaterial, packets.length)
  group.add(nodeMesh, packetMesh)

  const tmp = new Object3D()
  const pointer = { x: 0, y: 0 }
  const fail = { edge: -1, until: 0, next: 1.6 }

  function update(time: number, dt: number) {
    if (animate && fail.edge === -1 && time > fail.next) {
      fail.edge = Math.floor(Math.random() * edges.length)
      fail.until = time + FAIL_FOR
    } else if (fail.edge !== -1 && time > fail.until) {
      fail.edge = -1
      fail.next = time + FAIL_EVERY
    }

    edges.forEach((_, i) => {
      const c = i === fail.edge ? COLOR.fail : COLOR.edge
      c.toArray(colors, i * 6)
      c.toArray(colors, i * 6 + 3)
    })
    colorAttr.needsUpdate = true

    const failing: number[] = fail.edge === -1 ? [] : edges[fail.edge]
    nodes.forEach((n, i) => {
      const hit = failing.includes(i)
      tmp.position.copy(n)
      tmp.rotation.set(0.6, 0.8, 0)
      tmp.scale.setScalar(hit ? 1.4 : 1)
      tmp.updateMatrix()
      nodeMesh.setMatrixAt(i, tmp.matrix)
      nodeMesh.setColorAt(i, hit ? COLOR.fail : COLOR.node)
    })
    nodeMesh.instanceMatrix.needsUpdate = true
    nodeMesh.instanceColor!.needsUpdate = true

    packets.forEach((p, i) => {
      const stalled = p.edge === fail.edge
      if (animate && !stalled) p.t = (p.t + p.speed * dt) % 1
      const [a, b] = edges[p.edge]
      tmp.position.lerpVectors(nodes[a], nodes[b], p.forward ? p.t : 1 - p.t)
      tmp.rotation.set(0, 0, 0)
      tmp.scale.setScalar(stalled ? 1.3 : 1)
      tmp.updateMatrix()
      packetMesh.setMatrixAt(i, tmp.matrix)
      packetMesh.setColorAt(i, stalled ? COLOR.fail : COLOR.packet)
    })
    packetMesh.instanceMatrix.needsUpdate = true
    packetMesh.instanceColor!.needsUpdate = true

    // Slow drift plus damped pointer parallax.
    if (animate) {
      group.rotation.y = MathUtils.damp(group.rotation.y, time * 0.06 + pointer.x * 0.35, 3, dt)
      group.rotation.x = MathUtils.damp(group.rotation.x, 0.15 + pointer.y * 0.2, 3, dt)
    } else {
      group.rotation.set(0.15, 0.4, 0)
    }

    renderer.render(scene, camera)
  }

  function resize(width: number, height: number) {
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  function dispose() {
    lineGeometry.dispose()
    nodeGeometry.dispose()
    packetGeometry.dispose()
    lineMaterial.dispose()
    nodeMaterial.dispose()
    packetMaterial.dispose()
    renderer.dispose()
  }

  return { update, resize, dispose, pointer }
}

export default function ProcessGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current!
    const animate = !prefersReducedMotion()
    const scene = createScene(canvas, animate)

    let frame = 0
    let visible = true
    let last = performance.now()
    let time = 0

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 20)
      last = now
      time += dt
      scene.update(time, dt)
      frame = requestAnimationFrame(tick)
    }
    const start = () => {
      if (!animate || frame || !visible || document.hidden) return
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (!width || !height) return
      scene.resize(width, height)
      if (!frame) scene.update(time, 0)
    })
    ro.observe(canvas)

    // Stop rendering when off screen or when the tab is hidden.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    const onMove = (e: PointerEvent) => {
      scene.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      scene.pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    if (animate) window.addEventListener('pointermove', onMove, { passive: true })

    setReady(true)
    start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onMove)
      scene.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 size-full transition-opacity duration-1000 ease-out"
      style={{ opacity: ready ? 1 : 0 }}
    />
  )
}
