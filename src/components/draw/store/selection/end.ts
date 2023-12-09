import { type Point } from '../../lib/math/types'
import { type DrawingState } from '../type'

export const SELECTION_END_ACTION = 'SELECTION_END'

export interface SelectionEndAction {
  type: 'SELECTION_END'
  payload: {
    currentPoint: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {SelectionEndAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function selectionEndReducer (state: DrawingState, _action: SelectionEndAction): DrawingState {
  return {
    ...state
  }
}

export function createSelectionEndAction (currentPoint: Point): SelectionEndAction {
  return { type: SELECTION_END_ACTION, payload: { currentPoint } }
}
