import { updateElements } from '../../lib/history/history'
import { type Properties } from '../../shapes/types/handler'
import { type DrawingState } from '../type'
import { ShapeHandler } from '../../shapes'
import { type ElementSchemaType } from '@bristles/schema'

export const SELECTION_UPDATE_ACTION = 'SELECTION_UPDATE'

export interface SelectionUpdateAction {
  type: 'SELECTION_UPDATE'
  payload: {
    properties: Properties
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {SelectionUpdateAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function selectionUpdateReducer (state: DrawingState, action: SelectionUpdateAction): DrawingState {
  if (state.selection === undefined) {
    return { ...state }
  }

  const applyUpdate = (element: ElementSchemaType): ElementSchemaType => {
    if (state.selection !== undefined && state.selection.ids.includes(element.id)) {
      // @ts-expect-error find out how to call generic method based on element
      return ShapeHandler(element.name).update(element, action.payload.properties)
    }
    return { ...element }
  }
  const setElements = updateElements(state.elements)
  console.log('hay que actualizar algo')
  return {
    ...state,
    elements: setElements(prev => prev.map(applyUpdate), false)
  }
}

export function createSelectionUpdateAction (properties: Properties): SelectionUpdateAction {
  return { type: SELECTION_UPDATE_ACTION, payload: { properties } }
}
