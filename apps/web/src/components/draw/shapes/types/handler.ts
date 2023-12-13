import type { ElementSchemaType, FillPropertiesType, FontPropertiesType, StrokePropertiesType } from '@bristles/schema'
import { type Point } from '../../lib/math/types'
import { type ElementDrawingAction, type ElementMainAction } from './actions'

export interface DrawFunctionProps {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  /*
  snapshot: ImageData | null
  currentPoint: Point
  initialPoint: Point | null
  prevPoint: Point | null
  lineWidth: number
  color: string
  */
}

/*
export interface FillProperties {
  style: 'Solid' | 'Semi1' | 'Semi2' | 'None'
}

export interface StrokeProperties {
  style: 'Solid' | 'Dashed' | 'Dotted' | 'None'
  width: number
}

export interface FontProperties {
  size: number
  family: string
  align: string
}
*/

export interface ArrowProperties {
  style: string
}

export interface Properties {
  color: string
  opacity: number

  fill?: FillPropertiesType
  stroke?: StrokePropertiesType
  font?: FontPropertiesType

  arrow?: ArrowProperties
  text?: string
}

export interface Position {
  type: 'inside' | 'border' | 'outside'
  cursor: string
  position: string
}

export interface GenericHandler<T> {
  name: string

  /**
   * Función que dibuja dentro del canvas
   */
  draw: (element: T, props: DrawFunctionProps) => void

  create: (props: ElementDrawingAction) => T
  toString: (element: T) => string
  fromString: (element: string) => T
  copy: (element: T, point: Point) => T
  update: (element: T, properties: Properties) => T

  allowedProperties: () => string[]
  properties: (element: T) => Properties

  startAction: (element: T, props: ElementMainAction) => T
  updateAction: (element: T, props: ElementMainAction) => T
  endAction: (element: T, props: ElementMainAction) => T

  /**
   * Funciones para manejar seleccion y resize
   */
  positionInElement: (element: T, point: Point) => Position

}
