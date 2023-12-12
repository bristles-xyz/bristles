import { type Point } from '../../lib/math/types'
import { type ViewportState } from './state'

/**
 * Interfaces representing the payload for zoom-related actions in the reducer.
 * These interfaces define the shape of the payloads for managing zoom operations,
 * including actions for zooming in, zooming out, and resetting the zoom level.
 */
export interface ZoomInAction {
  type: 'ZOOM_IN'
}

export interface ZoomOutAction {
  type: 'ZOOM_OUT'
}

export interface ZoomResetAction {
  type: 'ZOOM_RESET'
}


/**
 * Interfaces representing the payload for pan-related actions in the reducer.
 * These interfaces define the shape of the payloads for managing pan functionality,
 * including actions for starting, ongoing, and ending pan movement,
 * as well as vertical and horizontal pan scroll actions.
 */
export interface StartPanMoveAction {
  type: 'START_PAN_MOVE'
}

export interface OnPanMoveAction {
  type: 'ON_PAN_MOVE'
}

export interface EndPanMoveAction {
  type: 'END_PAN_MOVE'
}

export interface PanWheelScrollAction {
  type: 'PAN_WHEEL_SCROLL'
  payload: {
    delta: Point
  }
}

export interface ViewportZoomAction {
  type: 'VIEWPORT_ZOOM'
  payload: {
    delta: number
  }
}
export type DispatchViewportAction = ViewportZoomAction | PanWheelScrollAction | EndPanMoveAction | OnPanMoveAction | StartPanMoveAction


/**
 * Update PAN offet
 * @param {ViewportState} selection - Current pan state.
 * @returns {ViewportState} - Returns the new pan state.
 */
export const updateWheelPan = (state: ViewportState, delta: Point): ViewportState => {
  const panOffset = {
    x: state.panOffset.x - delta.x,
    y: state.panOffset.y - delta.y
  }
  return {
    ...state,
    panOffset
  }
}

// new Intl.NumberFormat('en-GB', {style: 'percent'}).format(scale)
export const onZoom = (state: ViewportState, delta: number): ViewportState => {
  const newScale = Math.min(Math.max(state.scale + delta, 0.1), 2)
  return {
    ...state,
    scale: newScale
  }
}

/**
 * Reducer function for managing the state of a drawing application.
 * @param {ViewportState} state - The current state of the drawing application.
 * @param {DispatchStateAction} action - The action dispatched to update the state.
 * @returns {ViewportState} - The updated state after applying the action.
 */
export function viewportReducer (state: ViewportState, action: DispatchViewportAction): ViewportState {
  switch (action.type) {
    case 'PAN_WHEEL_SCROLL':
      return updateWheelPan(state, action.payload.delta)
    case 'VIEWPORT_ZOOM':
      return onZoom(state, action.payload.delta)
  }

  throw Error('Unknown action: ' + action.type)
}
