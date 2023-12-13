import { type RectangleSchemaType } from '@bristles/schema'
import { type GenericHandler } from '../types/handler'

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

export interface RectangleHandler extends GenericHandler<RectangleSchemaType> {
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
