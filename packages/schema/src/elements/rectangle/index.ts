import { z } from 'zod'
import { FillPropertiesSchema } from '../../properties/fill'
import { StrokePropertiesSchema } from '../../properties/stroke'

export const RectangleSchema = z.object({
  id: z.string(),
  name: z.literal('rectangle'),
  version: z.literal(2),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  angle: z.number(),
  opacity: z.number(),
  color: z.string(),
  fill: FillPropertiesSchema,
  stroke: StrokePropertiesSchema,
  selected: z.boolean()
})

export const RECTANGLE_LATEST_VERSION = 2

export type RectangleSchemaType = z.infer<typeof RectangleSchema>
