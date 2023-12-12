import { type Point } from '../../lib/math/types'
import { type DrawingState } from '../type'

export const WRITING_START_ACTION = 'START_WRITING'

export interface StartWritingAction {
  type: 'START_WRITING'
  payload: {
    currentPoint: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {StartWritingAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function writingStartReducer (state: DrawingState, action: StartWritingAction): DrawingState {
  if (['text'].includes(state.tool)) {
    return {
      ...state,
      action: { name: 'writing', text: '', currentPoint: action.payload.currentPoint }
    }
  }
  return {
    ...state
  }
}

export function createStartWritingAction (currentPoint: Point): StartWritingAction {
  return { type: WRITING_START_ACTION, payload: { currentPoint } }
}
