import { type DrawingState } from '../type'

export const ROTATION_ON_ACTION = 'ROTATION_ON'

export interface RotationOnAction {
  type: 'ROTATION_ON'
  payload: {
    angle: number
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {RotationOnAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function rotationOnReducer (state: DrawingState, _action: RotationOnAction): DrawingState {
  return {
    ...state
  }
}

export function createRotationOnAction (angle: number): RotationOnAction {
  return { type: ROTATION_ON_ACTION, payload: { angle } }
}
