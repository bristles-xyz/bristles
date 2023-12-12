import { type LineSchemaType, LineSchema, LINE_LATEST_VERSION } from './index'
import { applyMigration } from './migrations'

export const parseLine = (data: any): LineSchemaType => {
  const version = data.version ?? 1

  try {
    if (version === LINE_LATEST_VERSION) {
      return LineSchema.parse(data)
    } else if (version < LINE_LATEST_VERSION) {
      // Apply migrations based on version
      const migratedData = applyMigration(data, version)
      return LineSchema.parse(migratedData)
    }

    throw new Error('Unsupported rectangle version.')
  } catch (error) {
    throw new Error('Invalid rectangle data.')
  }
}
