import { describe, test, expect, vi } from 'vitest'
import { create, endAction, positionInElement, startAction, updateAction } from './line'
import { type ElementMainAction } from '../types/actions'

const fixedUUID = '550e8400-e29b-41d4-a716-446655440000'
// Mock the crypto.randomUUID function
const crypto = {
  randomUUID: vi.fn(() => fixedUUID) // Replace 'mocked-unique-id' with your desired mock ID
}

vi.stubGlobal('crypto', crypto)

// Test suite for stateReducer function
describe('Draw a line', () => {
  // Test case to check if state is updated correctly for 'UPDATE_DRAWING' action
  test('Draw a rectangle', () => {
    const drawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: 0, y: 0 },
      properties: {
        color: 'white',
        opacity: 1
      }
    }

    let element = create(drawingAction)

    expect(element.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(element.height).toEqual(0)
    expect(element.width).toEqual(0)

    const updateDrawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: -10, y: 15 },
      properties: {
        color: 'white',
        opacity: 1
      }
    }

    element = updateAction(element, updateDrawingAction)

    expect(element.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(element.height).toEqual(15)
    expect(element.width).toEqual(-10)
    expect(element.x).toEqual(0)
    expect(element.y).toEqual(0)

    const endDrawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: -12, y: -15 },
      properties: {
        color: 'white',
        opacity: 1
      }
    }

    element = endAction(element, endDrawingAction)

    expect(element.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(element.height).toEqual(15)
    expect(element.width).toEqual(12)
    expect(element.x).toEqual(-12)
    expect(element.y).toEqual(-15)
  })
})

describe('positionInElement for LineElement', () => {
  const drawingAction: ElementMainAction = {
    name: 'drawing',
    currentPoint: { x: 10, y: 10 },
    properties: {
      color: 'white',
      opacity: 1
    }
  }

  const lineElement = create(drawingAction)
  lineElement.width = 40
  lineElement.height = 40

  // Define test points for different scenarios (start, end, inside, outside)
  const startPoint = { x: 11, y: 8 } // Point at the start
  const insidePoint = { x: 30, y: 30 } // Point inside the LineElement
  const outsidePoint = { x: 5, y: 5 } // Point outside the LineElement
  // Calculate end point using initial position, width, and height
  const endPoint = {
    x: lineElement.x + lineElement.width,
    y: lineElement.y + lineElement.height
  }

  test('should return "start" for a point near the start of the line', () => {
    const result = positionInElement(lineElement, startPoint)
    expect(result.cursor).toBe('nwse-resize')
    expect(result.position).toBe('start')
    expect(result.type).toBe('border')
  })

  test('should return "end" for a point near the end of the line', () => {
    const result = positionInElement(lineElement, endPoint)
    expect(result.cursor).toBe('nwse-resize')
    expect(result.position).toBe('end')
    expect(result.type).toBe('border')
  })

  test('should return "inside" for a point inside the LineElement', () => {
    const result = positionInElement(lineElement, insidePoint)
    expect(result.cursor).toBe('grab')
    expect(result.type).toBe('inside')
    expect(result.position).toBe('')
  })

  test('should return "outside" for a point outside the LineElement', () => {
    const result = positionInElement(lineElement, outsidePoint)
    expect(result.cursor).toBe('default')
    expect(result.position).toBe('')
    expect(result.type).toBe('outside')
  })
})

describe('Draw and move a rectangle', () => {
  // Test case to check if state is updated correctly for 'UPDATE_DRAWING' action
  test('Draw a line and move', () => {
    /**
     * Rectangle creation
     */
    const drawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: 0, y: 0 },
      properties: {
        color: 'white',
        opacity: 1
      }
    }

    let element = create(drawingAction)

    expect(element.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(element.height).toEqual(0)
    expect(element.width).toEqual(0)

    const endDrawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: 10, y: 10 },
      properties: {
        color: 'white',
        opacity: 1
      }
    }

    element = endAction(element, endDrawingAction)

    expect(element.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(element.height).toEqual(10)
    expect(element.width).toEqual(10)
    expect(element.x).toEqual(0)
    expect(element.y).toEqual(0)

    /**
     * Line movement
     */
    const startMovingAction: ElementMainAction = {
      name: 'moving',
      currentPoint: { x: 11, y: 9 },
      offset: { x: 6, y: 4 }
    }

    element = updateAction(element, startMovingAction)

    expect(element.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(element.height).toEqual(10)
    expect(element.width).toEqual(10)
    expect(element.x).toEqual(5)
    expect(element.y).toEqual(5)
  })
})

describe('Draw and resize a line', () => {
  // Test case to check if state is updated correctly for 'UPDATE_DRAWING' action
  test('Draw a line', () => {
    /**
     * Rectangle creation
     */
    const drawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: 0, y: 0 },
      properties: {
        color: 'white',
        opacity: 1
      }
    }

    let element = create(drawingAction)

    expect(element.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(element.height).toEqual(0)
    expect(element.width).toEqual(0)

    const endDrawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: 10, y: 10 },
      properties: {
        color: 'white',
        opacity: 1
      }
    }

    element = endAction(element, endDrawingAction)

    expect(element.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(element.height).toEqual(10)
    expect(element.width).toEqual(10)
    expect(element.x).toEqual(0)
    expect(element.y).toEqual(0)

    /**
     * Line resizing from Start
     */
    const startSResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: 0, y: 0 }, // Useless
      position: { type: 'border', cursor: '', position: 'start' }
    }

    let elementResizeS = startAction(element, startSResizingAction)

    expect(elementResizeS.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeS.height).toEqual(-10)
    expect(elementResizeS.width).toEqual(-10)
    expect(elementResizeS.x).toEqual(10)
    expect(elementResizeS.y).toEqual(10)

    const updateSResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: -12, y: -12 },
      position: { type: 'border', cursor: '', position: 'start' } // Useless
    }

    elementResizeS = updateAction(elementResizeS, updateSResizingAction)

    expect(elementResizeS.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeS.height).toEqual(-22)
    expect(elementResizeS.width).toEqual(-22)
    expect(elementResizeS.x).toEqual(10)
    expect(elementResizeS.y).toEqual(10)

    const endSResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: -15, y: 14 },
      position: { type: 'border', cursor: '', position: 'start' } // Useless
    }

    elementResizeS = endAction(elementResizeS, endSResizingAction)

    expect(elementResizeS.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeS.height).toEqual(-4)
    expect(elementResizeS.width).toEqual(25)
    expect(elementResizeS.x).toEqual(-15)
    expect(elementResizeS.y).toEqual(14)

    /**
     * Line resizing from End
     */
    const startEResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: 0, y: 0 }, // Useless
      position: { type: 'border', cursor: '', position: 'end' }
    }

    let elementResizeE = startAction(element, startEResizingAction)

    expect(elementResizeE.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeE.height).toEqual(10)
    expect(elementResizeE.width).toEqual(10)
    expect(elementResizeE.x).toEqual(0)
    expect(elementResizeE.y).toEqual(0)

    const updateEResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: -12, y: -12 },
      position: { type: 'border', cursor: '', position: 'end' } // Useless
    }

    elementResizeE = updateAction(elementResizeE, updateEResizingAction)

    expect(elementResizeE.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeE.height).toEqual(-12)
    expect(elementResizeE.width).toEqual(-12)
    expect(elementResizeE.x).toEqual(0)
    expect(elementResizeE.y).toEqual(0)

    const endEResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: -15, y: 14 },
      position: { type: 'border', cursor: '', position: 'end' } // Useless
    }

    elementResizeE = endAction(elementResizeE, endEResizingAction)

    expect(elementResizeE.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeE.height).toEqual(-14)
    expect(elementResizeE.width).toEqual(15)
    expect(elementResizeE.x).toEqual(-15)
    expect(elementResizeE.y).toEqual(14)
  })
})
