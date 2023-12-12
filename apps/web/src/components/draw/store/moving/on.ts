import { updateElements } from '../../lib/history/history'
import { type Point } from '../../lib/math/types'
import { ShapeHandler } from '../../shapes'
import { type DrawingState } from '../type'

export const MOVING_ON_ACTION = 'ON_MOVING'

export interface OnMovingAction {
  type: 'ON_MOVING'
  payload: {
    currentPoint: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {OnMovingAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function movingOnReducer (state: DrawingState, action: OnMovingAction): DrawingState {
  const setElements = updateElements(state.elements)

  if (state.action.name === 'moving' && state.selection !== undefined) {
    const currentPoint = action.payload.currentPoint
    const movData = state.action
    const selection = state.selection
    const newElements = setElements(prev => {
      //const elements = structuredClone(prev)
      const elements = prev.map((el, _idx) => {
        if (selection.ids.includes(el.id)) {
          const offset = movData.elements.find(a => a.id === el.id)
          if (offset !== undefined) {
            // @ts-expect-error find out how to call generic method based on element
            return ShapeHandler(el.name).updateAction(el, { ...movData, currentPoint, offset: offset.offset })
          }
        }

        return el
      })

      return elements
    }, true)

    const x = currentPoint.x - movData.offset.x
    const y = currentPoint.y - movData.offset.y
    const width = selection.width
    const height = selection.height

    return {
      ...state,
      elements: newElements,
      selection: {
        ...selection,
        initialPosition: { x, y },
        width,
        height
      }
    }
  }

  return { ...state }
}

export function createOnMovingAction (currentPoint: Point): OnMovingAction {
  return { type: MOVING_ON_ACTION, payload: { currentPoint } }
}
