import { redo } from '../../lib/history/history'
import { type DrawingState } from '../type'

export const HISTORY_REDO_ACTION = 'REDO'

export interface RedoAction {
  type: 'REDO'
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {DispatchStateAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function historyRedoReducer (state: DrawingState, _action: RedoAction): DrawingState {
  const elements = redo(state.elements)
  return {
    ...state,
    elements,
    selection: undefined
  }
}

export function createHistoryRedoAction (): RedoAction {
  return { type: HISTORY_REDO_ACTION }
}
