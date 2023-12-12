import { getObjects, updateElements } from '../../lib/history/history'
import { type Point } from '../../lib/math/types'
import { ShapeHandler } from '../../shapes'
import { type DrawingState } from '../type'

export const RESIZING_ON_ACTION = 'ON_RESIZING'

export interface OnResizingAction {
  type: 'ON_RESIZING'
  payload: {
    currentPoint: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {OnResizingAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function resizingOnReducer (state: DrawingState, action: OnResizingAction): DrawingState {
  const objects = getObjects(state.elements)
  const setElements = updateElements(state.elements)

  if (state.action.name === 'resizing') {
    const elementId = state.action.elementId
    const currentElement = objects.find(el => el.id === elementId)
    if (currentElement !== undefined) {
      // @ts-expect-error find out how to call generic method based on element
      const newElement = ShapeHandler(currentElement.name).updateAction(currentElement, { ...state.action, currentPoint: action.payload.currentPoint })
      //MUTATE_HISTORY
      return {
        ...state,
        elements: setElements(prev => prev.map(el => el.id === newElement.id ? newElement : el), true)
      }
    }
  }

  return { ...state }
}

export function createOnResizingAction (currentPoint: Point): OnResizingAction {
  return { type: RESIZING_ON_ACTION, payload: { currentPoint } }
}
