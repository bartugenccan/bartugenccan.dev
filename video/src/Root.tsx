import { Composition } from 'remotion'
import { SemaphoreLoop } from './SemaphoreLoop'

export function Root() {
  return (
    <Composition
      id="SemaphoreLoop"
      component={SemaphoreLoop}
      durationInFrames={300}
      fps={30}
      width={1280}
      height={720}
    />
  )
}
