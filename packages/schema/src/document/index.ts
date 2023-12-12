import { z } from 'zod'
import { ElementSchema } from '../elements'

export const DOCUMENT_LATEST_VERSION = 2

export const DocumentSchema = z.object({
  name: z.string(),
  version: z.literal(DOCUMENT_LATEST_VERSION), // Document schema version
  elements: z.array(ElementSchema), // Array of different element schemas
  author: z.string(),
  created_at: z.string()
})

export type DocumentSchemaType = z.infer<typeof DocumentSchema>
