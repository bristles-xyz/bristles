import { type Element } from '../../shapes/types/element'
import { selectElement } from './selection'
import { type SelectionState } from './types'
import { describe, test, expect } from 'vitest'

const elements: Element[] = [
  // Example elements data (replace with actual data or mock data as needed)
  { id: '1', name: 'rectangle', width: 50, height: 30, x: 10, y: 10, color: '#fff', selected: false, angle: 0, opacity: 1, fill: { style: 'Solid' }, stroke: { style: 'Dashed', width: 1 } },
  { id: '2', name: 'text', width: 70, height: 20, x: 10, y: 10, selected: false, angle: 0, text: 'Hello World', opacity: 1, color: 'red', font: { family: 'sans-serif', size: 12, align: 'center' } }
  // Add more elements as necessary for testing different scenarios
]

// Sample SelectionState data
const initialSelection: SelectionState = {
  type: 'simple',
  ids: ['1'], // Initial selected element IDs
  initialPosition: { x: 10, y: 10 },
  height: 30,
  width: 50
}

describe('selectElement function', () => {
  test('should add a new element ID to an empty selection and update width and height', () => {
    // Given: Sample element ID to add
    const elementIdToAdd = '2' // ID of the element to be added to the selection

    // When: Calling the function to add an element to the selection
    const updatedSelection = selectElement(elements, elementIdToAdd, undefined)

    // Then: Validate the updated SelectionState
    expect(updatedSelection).toBeDefined()

    if (updatedSelection !== undefined) {
      expect(updatedSelection.type).toBe('simple') // Expected type after adding more elements
      expect(updatedSelection.ids).toContain(elementIdToAdd) // Check if the new ID is added to the selection
      expect(updatedSelection.width).toBe(70)
      expect(updatedSelection.height).toBe(20)
      expect(updatedSelection.initialPosition.x).toBe(10)
      expect(updatedSelection.initialPosition.y).toBe(10)
      expect(updatedSelection.ids.length).toBe(1)
    }
  })
  test('should add a new element ID to the selection and update width and height', () => {
    // Given: Sample element ID to add
    const elementIdToAdd = '2' // ID of the element to be added to the selection

    // When: Calling the function to add an element to the selection
    const updatedSelection = selectElement(elements, elementIdToAdd, initialSelection)

    // Then: Validate the updated SelectionState
    expect(updatedSelection).toBeDefined()

    if (updatedSelection !== undefined) {
      expect(updatedSelection.type).toBe('multiple') // Expected type after adding more elements
      expect(updatedSelection.ids).toContain(elementIdToAdd) // Check if the new ID is added to the selection
      expect(updatedSelection.width).toBe(70)
      expect(updatedSelection.height).toBe(30)
      expect(updatedSelection.initialPosition.x).toBe(10)
      expect(updatedSelection.initialPosition.y).toBe(10)
      expect(updatedSelection.ids.length).toBe(2)
    }
  })
  test('should fail to add a new element not found ID to an empty selection', () => {
    // Given: Sample element ID to add
    const elementIdToAdd = '3' // ID of the element to be added to the selection

    // When: Calling the function to add an element to the selection
    const updatedSelection = selectElement(elements, elementIdToAdd, undefined)

    // Then: Validate the updated SelectionState
    expect(updatedSelection).toBe(undefined)
  })

  test('should fail to add a new element not found ID to the selection and update width and height', () => {
    // Given: Sample element ID to add
    const elementIdToAdd = '3' // ID of the element to be added to the selection

    // When: Calling the function to add an element to the selection
    const updatedSelection = selectElement(elements, elementIdToAdd, initialSelection)

    // Then: Validate the updated SelectionState
    expect(updatedSelection).toBeDefined()

    if (updatedSelection !== undefined) {
      expect(updatedSelection).toBe(initialSelection) // Expected type after adding more elements
    }
  })
})
