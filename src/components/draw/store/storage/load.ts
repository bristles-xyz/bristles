import { updateElements } from '../../lib/history/history'
import { type DrawingState } from '../type'
import { type Element } from '../../shapes/types/element'

export const STORAGE_LOAD_ACTION = 'STORAGE_LOAD'

export interface StorageLoadAction {
  type: 'STORAGE_LOAD'
  payload: {
    elements: Element[]
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {StorageLoadAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function storageLoadReducer (state: DrawingState, action: StorageLoadAction): DrawingState {
  const setElements = updateElements(state.elements)
  return {
    ...state,
    elements: setElements(action.payload.elements, false)
  }
}

export function createStorageLoadAction (elements: Element[]): StorageLoadAction {
  return { type: STORAGE_LOAD_ACTION, payload: { elements } }
}
