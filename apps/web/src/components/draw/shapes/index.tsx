import { Rectangle, type RectangleHandler } from './rectangle'
import { Line, type LineHandler } from './line'
import { Text, type TextHandler } from './text'
import { type Shapes } from '../types'

type Handlers = RectangleHandler | TextHandler | LineHandler

export const ShapeHandler = (shape: Shapes): Handlers=> {
  switch (shape) {
    case 'rectangle':
      return Rectangle
    case 'text':
      return Text
    case 'line':
      return Line
    default:
      throw new Error('Unsupported Shape')
  }
}
