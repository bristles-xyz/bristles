import { z } from 'zod'
import { StrokePropertiesSchema } from '../../properties/stroke'

export const LineSchema = z.object({
  id: z.string(),
  version: z.literal(2),
  name: z.literal('line'),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  angle: z.number(),
  opacity: z.number(),
  color: z.string(),
  stroke: StrokePropertiesSchema,
  selected: z.boolean()
})

export const LINE_LATEST_VERSION = 2

export type LineSchemaType = z.infer<typeof LineSchema>
