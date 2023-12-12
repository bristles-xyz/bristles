import { type GenericHandler } from '../types/handler'
import { type TextElement } from './types'

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
} from './text'

export interface TextHandler extends GenericHandler<TextElement> {
  //clone: VoidFunction
}


export const Text: TextHandler = {
  name: 'text',

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

  positionInElement,

}
