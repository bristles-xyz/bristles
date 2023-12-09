import { type DrawingState } from '../type'

export const ROTATION_END_ACTION = 'ROTATION_END'

export interface RotationEndAction {
  type: 'ROTATION_END'
  payload: {
    angle: number
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {RotationEndAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function rotationEndReducer (state: DrawingState, _action: RotationEndAction): DrawingState {
  return {
    ...state
  }
}

export function createRotationEndAction (angle: number): RotationEndAction {
  return { type: ROTATION_END_ACTION, payload: { angle } }
}
