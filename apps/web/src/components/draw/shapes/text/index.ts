import { type TextSchemaType } from '@bristles/schema'
import { type GenericHandler } from '../types/handler'

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

export interface TextHandler extends GenericHandler<TextSchemaType> {
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
