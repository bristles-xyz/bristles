import { describe, test, expect } from 'vitest'
import { type ObjectWithHistory } from './types'
import { getObjects, redo, undo, updateElements } from './history'

const initState: ObjectWithHistory<string> = {
  history: [[]],
  index: 0
}

describe('updateElements', () => {
  // Test case to check if state is updated correctly for update with new history
  test('Set elements with history', () => {
    const setElements = updateElements(initState)

    const state = setElements(['text1', 'text2'], false)

    expect(getObjects(state).length).toEqual(2)
    expect(state.history.length).toEqual(2)
    expect(state.index).toEqual(1)
  })

  // Test case to check if state is updated correctly for update with overwrite history
  test('Set elements with overwrite history', () => {
    const setElements = updateElements(initState)

    const state = setElements(['text1', 'text2'], true)

    expect(getObjects(state).length).toEqual(2)
    expect(state.history.length).toEqual(1)
    expect(state.index).toEqual(0)
  })

  // Test case to check if state is updated correctly for update with overwrite history
  test('Undo history within empty initial state', () => {
    const state = undo(initState)

    expect(getObjects(state).length).toEqual(0)
    expect(state.history.length).toEqual(1)
    expect(state.index).toEqual(0)
  })

  // Test case to check if state is updated correctly for update with overwrite history
  test('Redo history within empty initial state', () => {
    const state = redo(initState)

    expect(getObjects(state).length).toEqual(0)
    expect(state.history.length).toEqual(1)
    expect(state.index).toEqual(0)
  })

  // Test case to check if state is updated correctly for update with overwrite history
  test('Update history and call undo/redo in edge cases', () => {
    const setElements = updateElements(initState)

    const testState = setElements(['text1', 'text2'], false)

    expect(getObjects(testState).length).toEqual(2)
    expect(testState.history.length).toEqual(2)
    expect(testState.index).toEqual(1)

    const afterUndo1 = undo(testState)

    expect(getObjects(afterUndo1).length).toEqual(0)
    expect(afterUndo1.history.length).toEqual(2)
    expect(afterUndo1.index).toEqual(0)

    const afterUndo2 = undo(afterUndo1)

    expect(getObjects(afterUndo2).length).toEqual(0)
    expect(afterUndo2.history.length).toEqual(2)
    expect(afterUndo2.index).toEqual(0)

    const afterRedo1 = redo(afterUndo2)

    expect(getObjects(afterRedo1).length).toEqual(2)
    expect(afterRedo1.history.length).toEqual(2)
    expect(afterRedo1.index).toEqual(1)

    const afterRedo2 = redo(afterRedo1)

    expect(getObjects(afterRedo2).length).toEqual(2)
    expect(afterRedo2.history.length).toEqual(2)
    expect(afterRedo2.index).toEqual(1)
  })

  // Test case to check if state is updated correctly for update with overwrite history
  test('Update history (overwrite) and call undo/redo in edge cases', () => {
    const setElements = updateElements(initState)

    const testState = setElements(['text1', 'text2'], true)

    expect(getObjects(testState).length).toEqual(2)
    expect(testState.history.length).toEqual(1)
    expect(testState.index).toEqual(0)

    const afterUndo1 = undo(testState)

    expect(getObjects(afterUndo1).length).toEqual(2)
    expect(afterUndo1.history.length).toEqual(1)
    expect(afterUndo1.index).toEqual(0)

    const afterRedo1 = redo(afterUndo1)

    expect(getObjects(afterRedo1).length).toEqual(2)
    expect(afterRedo1.history.length).toEqual(1)
    expect(afterRedo1.index).toEqual(0)
  })
})

describe('getObjects', () => {
  // Test case to check if state is updated correctly for update with new history
  test('Test getObject', () => {
    const setElements = updateElements(initState)

    expect(getObjects(initState).length).toEqual(0)

    const state = setElements(['text1', 'text2'], false)

    expect(getObjects(state).length).toEqual(2)
    expect(state.history.length).toEqual(2)
    expect(state.index).toEqual(1)
  })
})
