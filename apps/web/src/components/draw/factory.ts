import { type ElementSchemaType } from '@bristles/schema'
import { type Point } from './lib/math/types'
import { Line } from './shapes/line'
import { Rectangle } from './shapes/rectangle'
import { Text } from './shapes/text'
import { type Properties } from './shapes/types/handler'
import { type Shapes } from './types'
export interface CreateElementProps {
  properties: Properties
  currentPoint: Point
  shape: Shapes
}

/*
export function createElement (props: CreateElementProps): Element {
  const { currentPoint, shape, properties } = props
  const handler = ShapeHandler(shape)

  return handler.startDrawing({ properties, currentPoint })

  // throw new Error('Not supported shape')
}*/

function isWithinElement (element: ElementSchemaType, currentPoint: Point) {
  if (element.name === 'rectangle') {
    return Rectangle.positionInElement(element, currentPoint).type !== 'outside'
  }
  if (element.name === 'line') {
    return Line.positionInElement(element, currentPoint).type !== 'outside'
  }
  if (element.name === 'text') {
    return Text.positionInElement(element, currentPoint).type !== 'outside'
  }
  return false
}

export function getElementAtPosition (elements: ElementSchemaType[], currentPoint: Point) {
  return elements.find((elem) => isWithinElement(elem, currentPoint))
}

export function getIndexElementAtPosition (elements: ElementSchemaType[], currentPoint: Point) {
  return elements.findIndex((elem) => isWithinElement(elem, currentPoint))
}
