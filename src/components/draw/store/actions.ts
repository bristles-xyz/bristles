import type { Point } from '../lib/math/types'
import { type RequestElementDrawingProps } from '../shapes/types/actions'
import { type Position } from '../shapes/types/handler'
import { type DRAWING_TOOL_LIST } from '../types'

export interface StateDrawingAction {
  name: 'drawing'
  tool: DRAWING_TOOL_LIST
  elementId: string
  elementActionProps: RequestElementDrawingProps
}

export interface StateMovingAction {
  name: 'moving'
  initialPoint: Point
  currentPoint: Point
  elements: Array<{
    offset: Point
    id: string
  }>
  offset: Point
}

export interface StateResizingAction {
  name: 'resizing'
  elementId: string
  initialPoint: Point
  currentPoint: Point
  position: Position
}

export interface StateWritingAction {
  name: 'writing'
  //element: Element
  //initialPoint: Point
  currentPoint: Point
  text?: string
}

export interface StateSelectingAction {
  name: 'selecting'
  ids: string[]
}

export interface StateNoneAction {
  name: 'none'
}

export type StateMainAction = StateDrawingAction | StateWritingAction | StateMovingAction | StateResizingAction | StateSelectingAction | StateNoneAction
