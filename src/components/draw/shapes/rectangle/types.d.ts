import { type GenericElement } from '../types/generic'
import type { FillProperties, StrokeProperties } from '../types/handler'

export interface RectangleElement extends GenericElement {
  name: 'rectangle'

  color: string
  fill: FillProperties
  stroke: StrokeProperties
}
