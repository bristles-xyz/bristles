import { type SelectionState } from './types'
import { ShapeHandler } from '../../shapes'
import { type ElementSchemaType } from '@bristles/schema'

/**
 * Update selection structure
 * @param {ElementSchemaType[]} elements - List of existing elements.
 * @param {string} elementId - Element to be selected.
 * @param {SelectionState | undefined} selection - Current selection state.
 * @returns {SelectionState | undefined} - Returns the new selection state, otherwise undefined.
 */
export const selectElement = (elements: ElementSchemaType[], elementId: string, selection: SelectionState | undefined): SelectionState | undefined => {
  const currentElement = elements.find(el => el.id === elementId)

  if (currentElement === undefined) {
    return selection
  }

  if (selection === undefined && currentElement !== undefined) {
    // @ts-expect-error find out how to call generic method based on element
    const elementProperties = ShapeHandler(currentElement.name).properties(currentElement)

    return {
      type: 'simple',
      width: currentElement.width,
      height: currentElement.height,
      initialPosition: { x: currentElement.x, y: currentElement.y },
      ids: [currentElement.id],
      properties: elementProperties
    }
  } else if (currentElement !== undefined && selection !== undefined) {
    if (!selection.ids.includes(elementId)) {
      const minX = Math.min(selection.initialPosition.x, currentElement.x)
      const minY = Math.min(selection.initialPosition.y, currentElement.y)
      const maxX = Math.max(selection.initialPosition.x + selection.width, currentElement.x + currentElement.width)
      const maxY = Math.max(selection.initialPosition.y + selection.height, currentElement.y + currentElement.height)

      return {
        ...selection,
        type: 'multiple',
        initialPosition: { x: minX, y: minY },
        width: maxX - minX,
        height: maxY - minY,
        ids: [...selection.ids, elementId]
      }
    }
  }

  return selection
}
