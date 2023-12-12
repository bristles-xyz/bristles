import { type RectangleSchemaType, RectangleSchema, RECTANGLE_LATEST_VERSION } from './index'
import { applyMigration } from './migrations'

export const parseRectangle = (data: any): RectangleSchemaType => {
  const version = data.version ?? 1

  try {
    if (version === RECTANGLE_LATEST_VERSION) {
      return RectangleSchema.parse(data)
    } else if (version < RECTANGLE_LATEST_VERSION) {
      // Apply migrations based on version
      const migratedData = applyMigration(data, version)
      return RectangleSchema.parse(migratedData)
    }

    throw new Error('Unsupported rectangle version.')
  } catch (error) {
    throw new Error('Invalid rectangle data.')
  }
}
