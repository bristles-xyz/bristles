import { updateElements } from '../../lib/history/history'
import { type DrawingState } from '../type'

export const SELECTION_REMOVE_ACTION = 'REMOVE_SELECTION'

export interface RemoveSelectionAction {
  type: 'REMOVE_SELECTION'
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {RemoveSelectionAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function selectionRemoveReducer (state: DrawingState, _action: RemoveSelectionAction): DrawingState {
  const setElements = updateElements(state.elements)
  return {
    ...state,
    selection: undefined,
    elements: setElements(prev => prev.filter(e => !(state.selection?.ids ?? []).includes(e.id)), false)
  }
}

export function createRemoveSelectionAction (): RemoveSelectionAction {
  return { type: SELECTION_REMOVE_ACTION }
}
