import { type GenericHandler } from '../types/handler'
import { type RectangleElement } from './types'

import {
  draw,
  create,
  fromString,
  toString,
  copy,
  update,
  allowedProperties,
  properties,
  startAction,
  updateAction,
  endAction,
  positionInElement
} from './rectangle'

export interface RectangleHandler extends GenericHandler<RectangleElement> {
  //clone: VoidFunction
}

export const Rectangle: RectangleHandler = {
  name: 'rectangle',

  draw,

  create,
  fromString,
  toString,
  copy,
  update,
  allowedProperties,
  properties,

  startAction,
  updateAction,
  endAction,

  positionInElement

}
