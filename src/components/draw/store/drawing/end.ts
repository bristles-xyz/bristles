import { getObjects, updateElements } from '../../lib/history/history'
import { type Point } from '../../lib/math/types'
import { selectElement } from '../../lib/selection/selection'
import { ShapeHandler } from '../../shapes'
import { type DrawingState } from '../type'

export const DRAWING_END_ACTION = 'END_DRAWING'

export interface EndDrawingAction {
  type: 'END_DRAWING'
  payload: {
    currentPoint: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {EndDrawingAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function drawingEndReducer (state: DrawingState, action: EndDrawingAction): DrawingState {
  const objects = getObjects(state.elements)
  const setElements = updateElements(state.elements)
  if (state.action.name === 'drawing' && state.action.elementId !== undefined) {
    const elementId = state.action.elementId
    const index = objects.findIndex(el => el.id === elementId)
    if (index !== -1) {
      const oldElement = objects[index]

      // @ts-expect-error find out how to call generic method based on element
      const newElement = ShapeHandler(oldElement.name).endAction(oldElement, { ...state.action, name: 'drawing', currentPoint: action.payload.currentPoint })
      
      //MUTATE_HISTORY
      const newElements = setElements(prev => prev.map(el => el.id === newElement.id ? newElement : el), true)
      const selection = selectElement(getObjects(newElements), newElement.id, state.selection)
      return {
        ...state,
        selection,
        elements: newElements,
        tool: 'selector',
        action: { name: 'none' }
      }
    }
  }

  return {
    ...state
  }
}

export function createEndDrawingAction (currentPoint: Point): EndDrawingAction {
  return { type: DRAWING_END_ACTION, payload: { currentPoint } }
}
