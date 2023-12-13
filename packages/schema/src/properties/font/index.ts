import { z } from 'zod'

export const FontPropertiesSchema = z.object({
  size: z.number(),
  family: z.string(),
  align: z.string()
})

export type FontPropertiesType = z.infer<typeof FontPropertiesSchema>
