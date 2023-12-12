import { type GenericElement } from '../types/generic'
import type { ArrowProperties, StrokeProperties } from '../types/handler'

export interface LineElement extends GenericElement {
  name: 'line'

  color: string
  stroke: StrokeProperties
  arrow: ArrowProperties
}
