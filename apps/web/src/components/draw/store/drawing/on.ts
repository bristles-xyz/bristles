import { ElementSchemaType } from '@bristles/schema'
import { getObjects, updateElements } from '../../lib/history/history'
import { type Point } from '../../lib/math/types'
import { ShapeHandler } from '../../shapes'
import { requestElementDrawing } from '../../shapes/types/actions'
import { type DrawingState } from '../type'

export const DRAWING_ON_ACTION = 'ON_DRAWING'

export interface OnDrawingAction {
  type: 'ON_DRAWING'
  payload: {
    currentPoint: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {OnDrawingAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function drawingOnReducer (state: DrawingState, action: OnDrawingAction): DrawingState {
  const objects = getObjects<ElementSchemaType>(state.elements)
  const setElements = updateElements<ElementSchemaType>(state.elements)
  if (state.action.name === 'drawing' && state.action.elementId !== undefined) {
    const elementId = state.action.elementId
    const currentElement = objects.find(el => el.id === elementId)
    if (currentElement !== undefined) {
      const elementAction = requestElementDrawing({ ...state.action.elementActionProps, currentPoint: action.payload.currentPoint })
      // @ts-expect-error find out how to call generic method based on element
      const newElement = ShapeHandler(currentElement.name).updateAction(currentElement, elementAction)

      //MUTATE_HISTORY
      return {
        ...state,
        elements: setElements(prev => prev.map(el => el.id === newElement.id ? newElement : el), true)
      }
    }
  }

  return {
    ...state
  }
}

export function createOnDrawingAction (currentPoint: Point): OnDrawingAction {
  return { type: DRAWING_ON_ACTION, payload: { currentPoint } }
}
