import { z } from 'zod'
import { StrokePropertiesSchema } from '../../properties/stroke'
import { FontPropertiesSchema } from '../..'

export const TextSchema = z.object({
  id: z.string(),
  version: z.literal(2),
  name: z.literal('text'),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  angle: z.number(),
  opacity: z.number(),
  color: z.string(),
  stroke: StrokePropertiesSchema,
  font: FontPropertiesSchema,
  text: z.string(),
  selected: z.boolean()
})

export const TEXT_LATEST_VERSION = 2

export type TextSchemaType = z.infer<typeof TextSchema>
