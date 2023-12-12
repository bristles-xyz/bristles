import { type TOOL_LIST } from '../../types'
import { type DrawingState } from '../type'

export const TOOL_SET_ACTION = 'TOOL_SET'

export interface ToolSetAction {
  type: 'TOOL_SET'
  payload: {
    tool: TOOL_LIST
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {DrawingState} state - The current state of the drawing application.
 * @param {ToolSetAction} action - The action dispatched to update the state.
 * @returns {DrawingState} - The updated state after applying the action.
 */
export function toolSetReducer (state: DrawingState, action: ToolSetAction): DrawingState {
  return { ...state, tool: action.payload.tool, action: { name: 'none' } }
}

export function createToolSetAction (tool: TOOL_LIST): ToolSetAction {
  return { type: TOOL_SET_ACTION, payload: { tool } }
}
