import { type Point } from '../../lib/math/types'
import { type Properties, type Position } from './handler'

export interface ElementDrawingAction {
  name: 'drawing'
  currentPoint: Point
  properties: Properties
}

export interface ElementMovingAction {
  name: 'moving'
  currentPoint: Point
  offset: Point
}

export interface ElementResizingAction {
  name: 'resizing'
  currentPoint: Point
  position: Position
}

export interface ElementWritingAction {
  name: 'writing'
  currentPoint: Point
  properties: Properties
  text: string
}

export type ElementMainAction = ElementDrawingAction | ElementWritingAction | ElementMovingAction | ElementResizingAction

export interface RequestElementDrawingProps {
  currentPoint: Point
  properties: Properties
}

export function requestElementDrawing (props: RequestElementDrawingProps): ElementDrawingAction {
  const { currentPoint, properties } = props
  return { name: 'drawing', currentPoint, properties }
}

export interface RequestElementMovingProps {
  currentPoint: Point
  offset: Point
}

export function requestElementMoving (props: RequestElementMovingProps): ElementMovingAction {
  const { currentPoint, offset } = props
  return { name: 'moving', currentPoint, offset }
}

export interface RequestElementResizingProps {
  currentPoint: Point
  position: Position
}
export function requestElementResizing (props: RequestElementResizingProps): ElementResizingAction {
  const { currentPoint, position } = props
  return { name: 'resizing', currentPoint, position }
}
