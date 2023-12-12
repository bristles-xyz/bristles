import { type TextSchemaType, TextSchema, TEXT_LATEST_VERSION } from './index'
import { applyMigration } from './migrations'

export const parseText = (data: any): TextSchemaType => {
  const version = data.version ?? 1

  try {
    if (version === TEXT_LATEST_VERSION) {
      return TextSchema.parse(data)
    } else if (version < TEXT_LATEST_VERSION) {
      // Apply migrations based on version
      const migratedData = applyMigration(data, version)
      return TextSchema.parse(migratedData)
    }

    throw new Error('Unsupported rectangle version.')
  } catch (error) {
    throw new Error('Invalid rectangle data.')
  }
}
