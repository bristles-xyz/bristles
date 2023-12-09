import { getObjects, updateElements } from '../../lib/history/history'
import { type Point } from '../../lib/math/types'
import { ShapeHandler } from '../../shapes'
import { type Position } from '../../shapes/types/handler'
import { type DrawingState } from '../type'

export const RESIZING_START_ACTION = 'START_RESIZING'

export interface StartResizingAction {
  type: 'START_RESIZING'
  payload: {
    currentPoint: Point
    elementId: string
    position: Position
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {StartResizingAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function resizingStartReducer (state: DrawingState, action: StartResizingAction): DrawingState {
  const elementId = action.payload.elementId
  const objects = getObjects(state.elements)
  const setElements = updateElements(state.elements)

  const currentElement = objects.find(el => el.id === elementId)

  if (currentElement !== undefined) {
    // @ts-expect-error find out how to call generic method based on element
    const newElement = ShapeHandler(currentElement.name).startAction(currentElement, { name: 'resizing', currentPoint: action.payload.currentPoint, position: action.payload.position })
    //MUTATE_HISTORY
    return {
      ...state,
      action: {
        name: 'resizing',
        initialPoint: action.payload.currentPoint,
        currentPoint: action.payload.currentPoint,
        elementId: action.payload.elementId,
        position: action.payload.position
        //elements: [{ offset: action.payload.currentPoint, id: action.payload.elementId }],
        //offset: { x: 0, y: 0 }
      },
      elements: setElements(prev => prev.map(el => el.id === newElement.id ? newElement : el), true)
    }
  }
  return { ...state }
}

export function createStartResizingAction (currentPoint: Point, elementId: string, position: Position): StartResizingAction {
  return { type: RESIZING_START_ACTION, payload: { currentPoint, elementId, position } }
}
