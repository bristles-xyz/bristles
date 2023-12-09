import { type Point } from '../../lib/math/types'
import { type DrawingState } from '../type'

export const MOVING_END_ACTION = 'END_MOVING'

export interface EndMovingAction {
  type: 'END_MOVING'
  payload: {
    currentPoint: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {EndMovingAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function movingEndReducer (state: DrawingState, _action: EndMovingAction): DrawingState {
  if (state.action.name === 'moving') {
    //const selection = selectElement(state.elements, state.action.elementId, state.selection)
    return {
      ...state,
      //selection,
      tool: 'selector',
      action: { name: 'none' }
    }
  }
  return { ...state }
}

export function createEndMovingAction (currentPoint: Point): EndMovingAction {
  return { type: MOVING_END_ACTION, payload: { currentPoint } }
}
