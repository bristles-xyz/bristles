import { updateElements } from '../../lib/history/history'
import { type Point } from '../../lib/math/types'
import { ShapeHandler } from '../../shapes'
import { ElementDrawingAction, requestElementDrawing, type RequestElementDrawingProps } from '../../shapes/types/actions'
import { Shapes } from '../../types'
import { StateMainAction } from '../actions'
import { type DrawingState } from '../type'

export const DRAWING_START_ACTION = 'START_DRAWING'

export interface StartDrawingAction {
  type: 'START_DRAWING'
  payload: {
    currentPoint: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {StartDrawingAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function drawingStartReducer (state: DrawingState, action: StartDrawingAction): DrawingState {
  const setElements = updateElements(state.elements)

  if (state.tool === 'rectangle' || state.tool === 'line') {
    const tool = state.tool
    const shape = state.tool as Shapes

    const elementActionProps: RequestElementDrawingProps = {
      currentPoint: action.payload.currentPoint,
      properties: state.defaults.properties
    }

    const elementAction = requestElementDrawing(elementActionProps)
    const element = ShapeHandler(shape).create(elementAction)

    const generateStateDrawingAction = (_request: ElementDrawingAction): StateMainAction => {
      return { name: 'drawing', tool, elementActionProps, elementId: element.id }
    }

    const newAction = generateStateDrawingAction(elementAction)
    //const newAction: MainAction = { name: 'drawing', tool: state.tool, started: { ...started, elementId: element.id } }

    //SAVE_HISTORY
    return {
      ...state,
      action: newAction,
      selection: undefined,
      elements: setElements(prev => [...prev, element], false)
    }
  }

  return {
    ...state
  }
}

export function createStartDrawingAction (currentPoint: Point): StartDrawingAction {
  return { type: DRAWING_START_ACTION, payload: { currentPoint } }
}
