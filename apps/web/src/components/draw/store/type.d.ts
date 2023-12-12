import { type TOOL_LIST } from '../types'
import { type Properties } from '../shapes/types/handler'
import { type Element } from '../shapes/types/element'
import type { ObjectWithHistory } from '../lib/history/types'
import type { SelectionState } from '../lib/selection/types'
import type { StateMainAction } from './actions'

export interface DrawingState {
  tool: TOOL_LIST
  elements: ObjectWithHistory<Element>
  selection?: SelectionState
  action: StateMainAction
  defaults: {
    properties: Properties
  }
}
