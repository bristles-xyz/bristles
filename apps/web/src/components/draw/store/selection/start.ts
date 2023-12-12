import { type Point } from '../../lib/math/types'
import { type DrawingState } from '../type'

export const SELECTION_START_ACTION = 'SELECTION_START'

export interface SelectionStartAction {
  type: 'SELECTION_START'
  payload: {
    currentPoint: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {SelectionStartAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function selectionStartReducer (state: DrawingState, _action: SelectionStartAction): DrawingState {
  return {
    ...state,
    selection: undefined
  }
}

export function createSelectionStartAction (currentPoint: Point): SelectionStartAction {
  return { type: SELECTION_START_ACTION, payload: { currentPoint } }
}
