import { type DrawingState } from '../type'

export const ROTATION_START_ACTION = 'ROTATION_START'

export interface RotationStartAction {
  type: 'ROTATION_START'
  payload: {
    angle: number
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {RotationStartAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function rotationStartReducer (state: DrawingState, _action: RotationStartAction): DrawingState {
  return {
    ...state
  }
}

export function createRotationStartAction (angle: number): RotationStartAction {
  return { type: ROTATION_START_ACTION, payload: { angle } }
}
