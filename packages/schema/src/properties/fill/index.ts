import { z } from 'zod'

export const FillPropertiesSchema = z.object({
  style: z.enum(['Solid', 'Semi1', 'Semi2', 'None'])
})

export type FillPropertiesType = z.infer<typeof FillPropertiesSchema>