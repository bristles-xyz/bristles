import { type Point } from '../../lib/math/types'
import { type DrawingState } from '../type'

export const SELECTION_ON_ACTION = 'SELECTION_ON'

export interface SelectionOnAction {
  type: 'SELECTION_ON'
  payload: {
    currentPoint: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {SelectionOnAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function selectionOnReducer (state: DrawingState, _action: SelectionOnAction): DrawingState {
  return {
    ...state
  }
}

export function createSelectionOnAction (currentPoint: Point): SelectionOnAction {
  return { type: SELECTION_ON_ACTION, payload: { currentPoint } }
}
