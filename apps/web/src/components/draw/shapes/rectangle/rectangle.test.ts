import { describe, test, expect, vi } from 'vitest'
import { type ElementMainAction } from '../types/actions'
import { type RectangleElement } from './types'
import { create, endAction, positionInElement, startAction, updateAction } from './rectangle'

const fixedUUID = '550e8400-e29b-41d4-a716-446655440000'
// Mock the crypto.randomUUID function
const crypto = {
  randomUUID: vi.fn(() => fixedUUID) // Replace 'mocked-unique-id' with your desired mock ID
}

vi.stubGlobal('crypto', crypto)

// Test suite for stateReducer function
describe('Draw a rectangle', () => {
  // Test case to check if state is updated correctly for 'UPDATE_DRAWING' action
  test('Draw a rectangle', () => {
    const drawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: 0, y: 0 },
      properties: {
        color: '#fff',
        opacity: 1
      }
    }

    let element = create(drawingAction)

    expect(element.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(element.height).toEqual(1)
    expect(element.width).toEqual(1)

    const updateDrawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: -10, y: 15 },
      properties: {
        color: '#fff',
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
        color: '#fff',
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

describe('positionInElement', () => {
  const rectangle: RectangleElement = {
    id: '',
    name: 'rectangle',
    x: 10,
    y: 10,
    width: 50,
    height: 30,
    angle: 0,

    color: '#fff',
    opacity: 1,
    stroke: {
      style: 'Dashed',
      width: 1
    },
    fill: {
      style: 'Solid'
    },
    selected: false
  }

  // Test case for top-left corner of the rectangle
  test('should return "tl" for a point in top-left corner', () => {
    const point = { x: rectangle.x, y: rectangle.y }
    const result = positionInElement(rectangle, point)
    expect(result.type).toBe('border')
    expect(result.position).toBe('tl')
  })

  // Test case for top-right corner of the rectangle
  test('should return "tr" for a point in top-right corner', () => {
    const point = { x: rectangle.x + rectangle.width, y: rectangle.y }
    const result = positionInElement(rectangle, point)
    expect(result.type).toBe('border')
    expect(result.position).toBe('tr')
  })

  // Test case for bottom-left corner of the rectangle
  test('should return "bl" for a point in bottom-left corner', () => {
    const point = { x: rectangle.x, y: rectangle.y + rectangle.height }
    const result = positionInElement(rectangle, point)
    expect(result.type).toBe('border')
    expect(result.position).toBe('bl')
  })

  // Test case for bottom-right corner of the rectangle
  test('should return "br" for a point in bottom-right corner', () => {
    const point = { x: rectangle.x + rectangle.width, y: rectangle.y + rectangle.height }
    const result = positionInElement(rectangle, point)
    expect(result.type).toBe('border')
    expect(result.position).toBe('br')
  })

  // Test case for a point inside the rectangle
  test('should return "inner" for a point inside the rectangle', () => {
    const point = { x: rectangle.x + 12, y: rectangle.y + 12 } // Inside the rectangle
    const result = positionInElement(rectangle, point)
    expect(result.type).toBe('inside')
  })

  // Test case for a point outside the rectangle
  test('should return "outside" for a point outside the rectangle', () => {
    const point = { x: -1, y: -1 } // Outside the rectangle
    const result = positionInElement(rectangle, point)
    expect(result.type).toBe('outside')
  })
})

describe('Draw and move a rectangle', () => {
  // Test case to check if state is updated correctly for 'UPDATE_DRAWING' action
  test('Draw a rectangle', () => {
    /**
     * Rectangle creation
     */
    const drawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: 0, y: 0 },
      properties: {
        color: 'red',
        opacity: 1
      }
    }

    let element = create(drawingAction)

    expect(element.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(element.height).toEqual(1)
    expect(element.width).toEqual(1)

    const endDrawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: 10, y: 10 },
      properties: {
        color: 'red',
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
     * Rectangle movement
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

describe('Draw and resize a rectangle', () => {
  // Test case to check if state is updated correctly for 'UPDATE_DRAWING' action
  test('Draw a rectangle', () => {
    /**
     * Rectangle creation
     */
    const drawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: 0, y: 0 },
      properties: {
        color: 'red',
        opacity: 1
      }
    }

    let element = create(drawingAction)

    expect(element.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(element.height).toEqual(1)
    expect(element.width).toEqual(1)

    const endDrawingAction: ElementMainAction = {
      name: 'drawing',
      currentPoint: { x: 10, y: 10 },
      properties: {
        color: 'red',
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
     * Rectangle resizing Top Left
     */
    const startTLResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: 0, y: 0 }, // Useless
      position: { type: 'border', cursor: '', position: 'tl' }
    }

    let elementResizeTL = startAction(element, startTLResizingAction)

    expect(elementResizeTL.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeTL.height).toEqual(-10)
    expect(elementResizeTL.width).toEqual(-10)
    expect(elementResizeTL.x).toEqual(10)
    expect(elementResizeTL.y).toEqual(10)

    const updateTLResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: -12, y: -12 },
      position: { type: 'border', cursor: '', position: 'tl' } // Useless
    }

    elementResizeTL = updateAction(elementResizeTL, updateTLResizingAction)

    expect(elementResizeTL.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeTL.height).toEqual(-22)
    expect(elementResizeTL.width).toEqual(-22)
    expect(elementResizeTL.x).toEqual(10)
    expect(elementResizeTL.y).toEqual(10)

    const endTLResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: -15, y: 14 },
      position: { type: 'border', cursor: '', position: 'tl' } // Useless
    }

    elementResizeTL = endAction(elementResizeTL, endTLResizingAction)

    expect(elementResizeTL.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeTL.height).toEqual(4)
    expect(elementResizeTL.width).toEqual(25)
    expect(elementResizeTL.x).toEqual(-15)
    expect(elementResizeTL.y).toEqual(10)

    /**
     * Rectangle resizing Top Right
     */
    const startTRResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: 0, y: 0 }, // Useless
      position: { type: 'border', cursor: '', position: 'tr' }
    }

    let elementResizeTR = startAction(element, startTRResizingAction)

    expect(elementResizeTR.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeTR.height).toEqual(-10)
    expect(elementResizeTR.width).toEqual(10)
    expect(elementResizeTR.x).toEqual(0)
    expect(elementResizeTR.y).toEqual(10)

    const updateTRResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: -12, y: -12 },
      position: { type: 'border', cursor: '', position: 'TR' } // Useless
    }

    elementResizeTR = updateAction(elementResizeTR, updateTRResizingAction)

    expect(elementResizeTR.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeTR.height).toEqual(-22)
    expect(elementResizeTR.width).toEqual(-12)
    expect(elementResizeTR.x).toEqual(0)
    expect(elementResizeTR.y).toEqual(10)

    const endTRResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: -15, y: 14 },
      position: { type: 'border', cursor: '', position: 'tr' } // Useless
    }

    elementResizeTR = endAction(elementResizeTR, endTRResizingAction)

    expect(elementResizeTR.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeTR.height).toEqual(4)
    expect(elementResizeTR.width).toEqual(15)
    expect(elementResizeTR.x).toEqual(-15)
    expect(elementResizeTR.y).toEqual(10)

    /**
     * Rectangle resizing Bottom Left
     */
    const startBLResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: 0, y: 0 }, // Useless
      position: { type: 'border', cursor: '', position: 'bl' }
    }

    let elementResizeBL = startAction(element, startBLResizingAction)

    expect(elementResizeBL.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeBL.height).toEqual(10)
    expect(elementResizeBL.width).toEqual(-10)
    expect(elementResizeBL.x).toEqual(10)
    expect(elementResizeBL.y).toEqual(0)


    const updateBLResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: -12, y: -12 },
      position: { type: 'border', cursor: '', position: 'bl' } // Useless
    }

    elementResizeBL = updateAction(elementResizeBL, updateBLResizingAction)

    expect(elementResizeBL.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeBL.height).toEqual(-12)
    expect(elementResizeBL.width).toEqual(-22)
    expect(elementResizeBL.x).toEqual(10)
    expect(elementResizeBL.y).toEqual(0)

    const endBLResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: -15, y: 14 },
      position: { type: 'border', cursor: '', position: 'bl' } // Useless
    }

    elementResizeBL = endAction(elementResizeBL, endBLResizingAction)

    expect(elementResizeBL.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeBL.height).toEqual(14)
    expect(elementResizeBL.width).toEqual(25)
    expect(elementResizeBL.x).toEqual(-15)
    expect(elementResizeBL.y).toEqual(0)

    /**
     * Rectangle resizing Bottom Right
     */
    const startBRResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: 0, y: 0 }, // Useless
      position: { type: 'border', cursor: '', position: 'br' }
    }

    let elementResizeBR = startAction(element, startBRResizingAction)

    expect(elementResizeBR.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeBR.height).toEqual(10)
    expect(elementResizeBR.width).toEqual(10)
    expect(elementResizeBR.x).toEqual(0)
    expect(elementResizeBR.y).toEqual(0)

    const updateBRResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: -12, y: -12 },
      position: { type: 'border', cursor: '', position: 'br' } // Useless
    }

    elementResizeBR = updateAction(elementResizeBR, updateBRResizingAction)

    expect(elementResizeBR.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeBR.height).toEqual(-12)
    expect(elementResizeBR.width).toEqual(-12)
    expect(elementResizeBR.x).toEqual(0)
    expect(elementResizeBR.y).toEqual(0)

    const endBRResizingAction: ElementMainAction = {
      name: 'resizing',
      currentPoint: { x: -15, y: 14 },
      position: { type: 'border', cursor: '', position: 'br' } // Useless
    }

    elementResizeBR = endAction(elementResizeBR, endBRResizingAction)

    expect(elementResizeBR.id).toEqual('550e8400-e29b-41d4-a716-446655440000')
    expect(elementResizeBR.height).toEqual(14)
    expect(elementResizeBR.width).toEqual(15)
    expect(elementResizeBR.x).toEqual(-15)
    expect(elementResizeBR.y).toEqual(0)
  })
})
