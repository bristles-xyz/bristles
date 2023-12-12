import { getObjects } from '../../lib/history/history'
import { type Point } from '../../lib/math/types'
import { selectElement } from '../../lib/selection/selection'
import { type DrawingState } from '../type'

export const SELECTION_SELECT_ACTION = 'SELECTION_SELECT'

export interface SelectionSelectAction {
  type: 'SELECTION_SELECT'
  payload: {
    currentPoint: Point
    elementId: string
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {SelectionSelectAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function selectionSelectReducer (state: DrawingState, action: SelectionSelectAction): DrawingState {
  const objects = getObjects(state.elements)
  return {
    ...state,
    selection: selectElement(objects, action.payload.elementId, state.selection)
  }
}

export function createSelectionSelectAction (currentPoint: Point, elementId: string): SelectionSelectAction {
  return { type: SELECTION_SELECT_ACTION, payload: { currentPoint, elementId } }
}
