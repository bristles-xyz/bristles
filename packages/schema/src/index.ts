export { type FillPropertiesType, FillPropertiesSchema } from './properties/fill'
export { type StrokePropertiesType, StrokePropertiesSchema } from './properties/stroke'
export { type FontPropertiesType, FontPropertiesSchema } from './properties/font'

export { type DocumentSchemaType, DocumentSchema } from './document'
export { parseDocument } from './document/parse'

import { type LineSchemaType, LineSchema } from './elements/line'
import { type RectangleSchemaType, RectangleSchema } from './elements/rectangle'
import { type TextSchemaType, TextSchema } from './elements/text'

export {
  LineSchemaType, LineSchema,
  RectangleSchemaType, RectangleSchema,
  TextSchemaType, TextSchema
}

export type ElementSchemaType = LineSchemaType | RectangleSchemaType | TextSchemaType