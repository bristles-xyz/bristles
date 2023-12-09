import { undo } from '../../lib/history/history'
import { type DrawingState } from '../type'

export const HISTORY_UNDO_ACTION = 'UNDO'

export interface UndoAction {
  type: 'UNDO'
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {DispatchStateAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function historyUndoReducer (state: DrawingState, _action: UndoAction): DrawingState {
  const elements = undo(state.elements)
  return {
    ...state,
    elements,
    selection: undefined
  }
}

export function createHistoryUndoAction (): UndoAction {
  return { type: HISTORY_UNDO_ACTION }
}
