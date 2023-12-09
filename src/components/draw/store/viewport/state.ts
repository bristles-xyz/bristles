import type { Point } from '../../lib/math/types'

export interface ViewportState {
  panOffset: Point
  scale: number
}

export const initState: ViewportState = {
  panOffset: { x: 0, y: 0 },
  scale: 1
}
