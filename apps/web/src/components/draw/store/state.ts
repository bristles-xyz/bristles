import { type Element } from '../shapes/types/element'
import { getObjects } from '../lib/history/history'
import type { DrawingState } from './type'
import type { ObjectWithHistory } from '../lib/history/types'
import { HISTORY_UNDO_ACTION, historyUndoReducer } from './history/undo'
import { HISTORY_REDO_ACTION, historyRedoReducer } from './history/redo'
import { DRAWING_START_ACTION, drawingStartReducer } from './drawing/start'
import { DRAWING_ON_ACTION, drawingOnReducer } from './drawing/on'
import { DRAWING_END_ACTION, drawingEndReducer } from './drawing/end'
import { WRITING_START_ACTION, writingStartReducer } from './writing/start'
import { WRITING_END_ACTION, writingEndReducer } from './writing/end'
import { RESIZING_START_ACTION, resizingStartReducer } from './resizing/start'
import { RESIZING_ON_ACTION, resizingOnReducer } from './resizing/on'
import { RESIZING_END_ACTION, resizingEndReducer } from './resizing/end'
import { MOVING_ON_ACTION, movingOnReducer } from './moving/on'
import { MOVING_END_ACTION, movingEndReducer } from './moving/end'
import { MOVING_START_ACTION, movingStartReducer } from './moving/start'
import { SELECTION_REMOVE_ACTION, selectionRemoveReducer } from './selection/remove'
import { STORAGE_LOAD_ACTION, storageLoadReducer } from './storage/load'
import { SELECTION_SELECT_ACTION, selectionSelectReducer } from './selection/select'
import { SELECTION_START_ACTION, selectionStartReducer } from './selection/start'
import { SELECTION_END_ACTION, selectionEndReducer } from './selection/end'
import { SELECTION_ON_ACTION, selectionOnReducer } from './selection/on'
import { ROTATION_START_ACTION, rotationStartReducer } from './rotating/start'
import { ROTATION_ON_ACTION, rotationOnReducer } from './rotating/on'
import { ROTATION_END_ACTION, rotationEndReducer } from './rotating/end'
import { TOOL_SET_ACTION, toolSetReducer } from './tool/set'
import { SELECTION_UPDATE_ACTION, selectionUpdateReducer } from './selection/update'
import { SELECTION_COPY_ACTION, selectionCopyReducer } from './selection/copy'
import { type Properties } from '../shapes/types/handler'
import { DispatchStateAction } from './store.actions'

export const initElementsWithHistory: ObjectWithHistory<Element> = {
  history: [[]],
  index: 0
}

export const initState: DrawingState = {
  tool: 'rectangle',
  elements: initElementsWithHistory,
  selection: undefined,
  action: { name: 'none' },
  defaults: {
    properties: {
      color: 'red',
      fill: {
        style: 'Semi1'
      },
      stroke: {
        width: 1,
        style: 'Dashed'
      },
      font: {
        size: 32,
        family: 'sans-serif',
        align: 'center'
      },
      text: 'Text',
      opacity: 100,
      arrow: {
        style: 'head'
      }
    }
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {DispatchStateAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function stateReducer (state: DrawingState, action: DispatchStateAction): DrawingState {
  switch (action.type) {
    case TOOL_SET_ACTION:
      return toolSetReducer(state, action)

    /**
     * LocalStorage actions.
     */
    case STORAGE_LOAD_ACTION:
      return storageLoadReducer(state, action)

    /**
     * Interfaces representing the payload for selecting-related actions in the reducer.
     * These interfaces define the shape of the payloads for various selecting actions,
     * including starting the selection process, ongoing selection updates, and ending the selection.
     */
    case SELECTION_START_ACTION:
      return selectionStartReducer(state, action)

    case SELECTION_ON_ACTION:
      return selectionOnReducer(state, action)

    case SELECTION_END_ACTION:
      return selectionEndReducer(state, action)

    case SELECTION_REMOVE_ACTION:
      return selectionRemoveReducer(state, action)

    case SELECTION_SELECT_ACTION:
      return selectionSelectReducer(state, action)

    case SELECTION_UPDATE_ACTION:
      return selectionUpdateReducer(state, action)

    case SELECTION_COPY_ACTION:
      return selectionCopyReducer(state, action)
      /*
      SELECT + MOVE 
    case 'NEW_SELECTED': {
      const currentPoint = action.payload.currentPoint
      const selection = selectElement(objects, action.payload.elementId, undefined)
      const element = objects.find(el => el.id === action.payload.elementId)
      if (element !== undefined) {
        const offset = { x: currentPoint.x - element.x, y: currentPoint.y - element.y }

        return {
          ...state,
          selection,
          action: {
            name: 'moving',
            initialPoint: action.payload.currentPoint,
            currentPoint: action.payload.currentPoint,
            elements: [{ id: action.payload.elementId, offset }],
            offset
          }
        }
      }
      return {
        ...state
      }
    }
    */

    /**
     * Interfaces representing the payload for writing-related actions in the reducer.
     * These interfaces define the shape of the payloads for various writing actions,
     * including starting the writing process, ongoing writing updates, and ending the writing.
     */
    case WRITING_START_ACTION:
      return writingStartReducer(state, action)
    case WRITING_END_ACTION:
      return writingEndReducer(state, action)

    /**
     * Interfaces representing the payload for drawing-related actions in the reducer.
     * These interfaces define the shape of the payloads for various drawing actions,
     * such as starting drawing, ongoing drawing, and ending drawing.
     */
    case DRAWING_START_ACTION:
      return drawingStartReducer(state, action)

    case DRAWING_ON_ACTION:
      return drawingOnReducer(state, action)

    case DRAWING_END_ACTION:
      return drawingEndReducer(state, action)

    /**
     * Interfaces representing the payload for resizing-related actions in the reducer.
     * These interfaces define the shape of the payloads for various resizing actions,
     * such as starting the resizing, ongoing resizing, and ending the resizing.
     */
    case RESIZING_START_ACTION:
      return resizingStartReducer(state, action)
    case RESIZING_ON_ACTION:
      return resizingOnReducer(state, action)
    case RESIZING_END_ACTION:
      return resizingEndReducer(state, action)

    /**
     * History-related actions.
     */
    case HISTORY_UNDO_ACTION:
      return historyUndoReducer(state, action)
    case HISTORY_REDO_ACTION:
      return historyRedoReducer(state, action)

    /**
     * Interfaces representing the payload for moving-related actions in the reducer.
     * These interfaces define the shape of the payloads for various moving actions,
     * such as starting the movement, ongoing movement, and ending the movement.
     */
    case MOVING_START_ACTION:
      return movingStartReducer(state, action)
    case MOVING_ON_ACTION:
      return movingOnReducer(state, action)

    case MOVING_END_ACTION:
      return movingEndReducer(state, action)

    /**
     * Interfaces representing the payload for rotating-related actions in the reducer.
     * These interfaces define the shape of the payloads for various rotating actions,
     * such as starting the rotation process, ongoing rotation updates, and ending the rotation.
     */
    case ROTATION_START_ACTION:
      return rotationStartReducer(state, action)

    case ROTATION_ON_ACTION:
      return rotationOnReducer(state, action)

    case ROTATION_END_ACTION:
      return rotationEndReducer(state, action)
  }

  throw Error('Unknown action')
}

export function getElements (state: DrawingState): Element[] {
  return getObjects(state.elements)
}

export function getSelectedProperties (state: DrawingState): Properties {
  return state.selection?.properties ?? state.defaults.properties
}
