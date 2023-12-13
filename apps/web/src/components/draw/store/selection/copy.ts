import { getObjects, updateElements } from '../../lib/history/history'
import { type DrawingState } from '../type'
import { ShapeHandler } from '../../shapes'
import { type Point } from '../../lib/math/types'
import { type ElementSchemaType } from '@bristles/schema'

export const SELECTION_COPY_ACTION = 'SELECTION_COPY'

export interface SelectionCopyAction {
  type: 'SELECTION_COPY'
  payload: {
    point?: Point
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {SelectionCopyAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function selectionCopyReducer (state: DrawingState, action: SelectionCopyAction): DrawingState {
  if (state.selection === undefined) {
    return { ...state }
  }

  const elements = getObjects(state.elements)
  const newElements: ElementSchemaType[] = []
  elements.forEach(element => {
    if (state.selection !== undefined && state.selection.ids.includes(element.id)) {
      const origin = action.payload.point ?? { x: element.x + 10, y: element.y + 10 }
      // @ts-expect-error find out how to call generic method based on element
      newElements.push(ShapeHandler(element.name).copy(element, origin))
    }
  })

  const setElements = updateElements(state.elements)
  return {
    ...state,
    elements: setElements(prev => prev.concat(newElements), false)
  }
}

export function createSelectionCopyAction (point?: Point): SelectionCopyAction {
  return { type: SELECTION_COPY_ACTION, payload: { point } }
}
