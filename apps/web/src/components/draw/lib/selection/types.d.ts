import { type Properties } from '../../shapes/types/handler'

export interface SelectionState {
  type: 'simple' | 'multiple'
  ids: string[]
  initialPosition: Point
  height: number
  width: number
  properties?: Properties
}
