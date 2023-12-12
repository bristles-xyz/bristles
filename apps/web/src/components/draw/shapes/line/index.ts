import { type GenericHandler } from '../types/handler'
import { type LineElement } from './types'

import {
  draw,
  create,
  toString,
  fromString,
  copy,
  update,
  allowedProperties,
  properties,
  startAction,
  updateAction,
  endAction,
  positionInElement
} from './line'

export interface LineHandler extends GenericHandler<LineElement> {
  //clone: VoidFunction
}


export const Line: LineHandler = {
  name: 'line',
  draw,

  create,
  toString,
  fromString,
  copy,
  update,
  allowedProperties,
  properties,

  startAction,
  updateAction,
  endAction,

  positionInElement

}
