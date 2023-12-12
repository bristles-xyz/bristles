import { type ObjectWithHistory, type SetterWithHistory } from './types'

/**
 * Update selection structure
 * @param {ObjectWithHistory[]} state - List of existing elements.
 * @returns {SetterWithHistory} - Returns a setter function to update elements like state.
 */
export function updateElements<T> (state: ObjectWithHistory<T>): SetterWithHistory<T> {
  return (action: T[] | ((prev: T[]) => T[]), overwrite = false) => {
    const newElements = typeof action === 'function' ? action(getObjects(state)) : action

    if (overwrite) {
      const newHistory = [...state.history.slice(0, state.index + 1)]
      newHistory[state.index] = newElements
      return {
        history: newHistory,
        index: state.index
      }
    }

    const updatedHistory = state.history.slice(0, state.index + 1)
    return {
      history: [...updatedHistory, newElements],
      index: state.index + 1
    }
  }
}

export function getObjects<T> (state: ObjectWithHistory<T>): T[] {
  return state.history[state.index]
}

export function undo<T> (state: ObjectWithHistory<T>): ObjectWithHistory<T> {
  const newIndex = state.index > 0 ? state.index - 1 : state.index
  return {
    ...state,
    index: newIndex
  }
}

export function redo<T> (state: ObjectWithHistory<T>): ObjectWithHistory<T> {
  const newIndex = (state.index < state.history.length - 1) ? state.index + 1 : state.index
  return {
    ...state,
    index: newIndex
  }
}
