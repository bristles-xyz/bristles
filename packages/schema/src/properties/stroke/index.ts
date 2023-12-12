import { z } from 'zod'

export const StrokePropertiesSchema = z.object({
  style: z.enum(['Solid', 'Dashed', 'Dotted', 'None']),
  width: z.number()
})

export type StrokeProperties = z.infer<typeof StrokePropertiesSchema>
