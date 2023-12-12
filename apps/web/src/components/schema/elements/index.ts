import { z } from 'zod'
import { RectangleSchema } from './rectangle'
import { LineSchema } from './line'
import { TextSchema } from './text'
import { parseRectangle } from './rectangle/parse'
import { parseLine } from './line/parse'
import { parseText } from './text/parse'

export const ElementSchema = z.union([RectangleSchema, LineSchema, TextSchema])
export type ElementSchemaType = z.infer<typeof ElementSchema>

// TODO: ?
export const elementProcessors = { Rectangle: parseRectangle, Line: parseLine, Text: parseText }
