import { describe, test, expect, vi } from 'vitest'
import { stateReducer, initState } from './state'
import { getObjects } from '../lib/history/history'
import { type DispatchStateAction } from './store.actions'

const fixedUUID = '550e8400-e29b-41d4-a716-446655440000'
// Mock the crypto.randomUUID function
const crypto = {
  randomUUID: vi.fn(() => fixedUUID) // Replace 'mocked-unique-id' with your desired mock ID
}

vi.stubGlobal('crypto', crypto)

// Test suite for stateReducer function
describe('stateReducer', () => {
  // Test case to check if state is updated correctly for 'UPDATE_DRAWING' action
  test('Should draw (start,end) and remove one element', () => {
    const actionStartDrawing: DispatchStateAction = {
      type: 'START_DRAWING',
      payload: {
        currentPoint: { x: 10, y: 11 }
      }
    }

    const stateWithDraw = stateReducer(initState, actionStartDrawing)
    expect(getObjects(stateWithDraw.elements).length).toEqual(1)
    expect(getObjects(stateWithDraw.elements)[0].id).toEqual(fixedUUID)
    expect(stateWithDraw.selection).toEqual(undefined)

    const actionEndDrawing: DispatchStateAction = {
      type: 'END_DRAWING',
      payload: {
        currentPoint: { x: 12, y: 13 }
      }
    }

    const stateWithElement = stateReducer(stateWithDraw, actionEndDrawing)
    expect(getObjects(stateWithElement.elements).length).toEqual(1)
    expect(stateWithElement.selection).toBeDefined()
    expect(stateWithElement.selection?.ids[0]).toEqual(fixedUUID)

    // After drawing the element is selected

    const action: DispatchStateAction = {
      type: 'REMOVE_SELECTION'
    }

    const updatedState = stateReducer(initState, action)
    expect(getObjects(updatedState.elements).length).toEqual(0)
  })

  // Test case to check if state is reset correctly for 'REMOVE_SELECTED' action
  test('should reset state for "REMOVE_SELECTED" action', () => {
    const action: DispatchStateAction = {
      type: 'REMOVE_SELECTION'
    }

    const updatedState = stateReducer(initState, action)
    expect(updatedState.selection).toEqual(undefined)
  })

  // Test case to check if state is reset correctly for 'REMOVE_SELECTED' action
  test('should reset state for "SET_TOOL" action', () => {
    const action: DispatchStateAction = {
      type: 'TOOL_SET',
      payload: { tool: 'rectangle' }
    }

    const updatedState = stateReducer(initState, action)
    expect(updatedState.tool).toEqual('rectangle')
  })
})
