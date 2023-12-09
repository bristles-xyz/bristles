import { type GenericElement } from '../types/generic'
import { type FontProperties } from '../types/handler'

export interface TextElement extends GenericElement {
  name: 'text'

  font: FontProperties
  text: string
  color: string
}
