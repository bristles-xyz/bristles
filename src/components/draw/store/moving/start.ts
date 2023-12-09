import { getObjects } from '../../lib/history/history'
import { type Point } from '../../lib/math/types'
import { type DrawingState } from '../type'

export const MOVING_START_ACTION = 'START_MOVING'

export interface StartMovingAction {
  type: 'START_MOVING'
  payload: {
    currentPoint: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {StartMovingAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function movingStartReducer (state: DrawingState, action: StartMovingAction): DrawingState {
  const objects = getObjects(state.elements)

  if (state.selection !== undefined) {
    const currentPoint = action.payload.currentPoint
    const selectionIds = state.selection.ids
    const elems: Array<{ offset: Point, id: string }> = []
    objects.forEach(el => {
      if (selectionIds.includes(el.id)) {
        elems.push({ id: el.id, offset: { x: currentPoint.x - el.x, y: currentPoint.y - el.y } })
      }
    })

    return {
      ...state,
      action: {
        name: 'moving',
        initialPoint: action.payload.currentPoint,
        currentPoint: action.payload.currentPoint,
        elements: elems,
        offset: { x: currentPoint.x - state.selection.initialPosition.x, y: currentPoint.y - state.selection.initialPosition.y }
      }
    }
  }
  return { ...state }
}

export function createStartMovingAction (currentPoint: Point): StartMovingAction {
  return { type: MOVING_START_ACTION, payload: { currentPoint } }
}
