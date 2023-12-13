import { z } from 'zod'

export const StrokePropertiesSchema = z.object({
  style: z.enum(['Solid', 'Dashed', 'Dotted', 'None']),
  width: z.number()
})

export type StrokePropertiesType = z.infer<typeof StrokePropertiesSchema>
