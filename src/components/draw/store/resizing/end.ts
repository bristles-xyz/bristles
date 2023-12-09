import { getObjects, updateElements } from '../../lib/history/history'
import { type Point } from '../../lib/math/types'
import { selectElement } from '../../lib/selection/selection'
import { ShapeHandler } from '../../shapes'
import { type DrawingState } from '../type'

export const RESIZING_END_ACTION = 'END_RESIZING'

export interface EndResizingAction {
  type: 'END_RESIZING'
  payload: {
    currentPoint: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {EndResizingAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function resizingEndReducer (state: DrawingState, action: EndResizingAction): DrawingState {
  const objects = getObjects(state.elements)
  const setElements = updateElements(state.elements)

  if (state.action.name === 'resizing') {
    const elementId = state.action.elementId
    const currentElement = objects.find(el => el.id === elementId)
    const selection = selectElement(objects, state.action.elementId, state.selection)
    if (currentElement !== undefined) {
      // @ts-expect-error find out how to call generic method based on element
      const newElement = ShapeHandler(currentElement.name).endAction(currentElement, { ...state.action, currentPoint: action.payload.currentPoint })
      //MUTATE_HISTORY
      return {
        ...state,
        tool: 'selector',
        selection,
        elements: setElements(prev => prev.map(el => el.id === newElement.id ? newElement : el), true),
        action: { name: 'none' }
      }
    }
  }

  
/*
  if (state.action.name === 'resizing') {
    const selection = selectElement(objects, state.action.elementId, state.selection)
    return {
      ...state,
      tool: 'selector',
      selection,
      action: { name: 'none' }
      
    }
  }*/
  return { ...state }
}

export function createEndResizingAction (currentPoint: Point): EndResizingAction {
  return { type: RESIZING_END_ACTION, payload: { currentPoint } }
}
