import { type TOOL_LIST } from '../types'
import { type Properties } from '../shapes/types/handler'
import type { ObjectWithHistory } from '../lib/history/types'
import type { SelectionState } from '../lib/selection/types'
import type { StateMainAction } from './actions'
import type { ElementSchemaType } from '@bristles/schema'

export interface DrawingState {
  tool: TOOL_LIST
  elements: ObjectWithHistory<ElementSchemaType>
  selection?: SelectionState
  action: StateMainAction
  defaults: {
    properties: Properties
  }
}
