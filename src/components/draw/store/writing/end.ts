import { updateElements } from '../../lib/history/history'
import { ShapeHandler } from '../../shapes'
import { type ElementDrawingAction } from '../../shapes/types/actions'
import { type DrawingState } from '../type'

export const WRITING_END_ACTION = 'END_WRITING'

export interface EndWritingAction {
  type: 'END_WRITING'
  payload: {
    text: string
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {EndWritingAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function writingEndReducer (state: DrawingState, action: EndWritingAction): DrawingState {
  const setElements = updateElements(state.elements)
  if (state.action.name === 'writing') {
    const elementAction: ElementDrawingAction = {
      name: 'drawing',
      currentPoint: state.action.currentPoint,
      properties: { ...state.defaults.properties, text: action.payload.text }
    }
    const element = ShapeHandler('text').create(elementAction)
    return {
      ...state,
      action: { name: 'none' },
      selection: undefined,
      elements: setElements(prev => [...prev, element], false)
    }
  }
  return {
    ...state
  }
}

export function createEndWritingAction (text: string): EndWritingAction {
  return { type: WRITING_END_ACTION, payload: { text } }
}
