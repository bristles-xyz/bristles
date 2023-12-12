/**
 * Interface representing a generic element, such as Rectangle, Triangle, Text, Image, etc.
 */
export interface GenericElement {
  id: string
  name: string

  /**
   * Position of the shape element.
   */
  x: number
  y: number

  /**
   * Width of the shape element.
   */
  width: number

  /**
   * Height of the shape element.
   */
  height: number

  angle: number

  opacity: number

  selected: boolean
}
