import { describe, it, expect } from 'vitest'
import { parseDocument } from '../parse'
import { applyV1toV2Migration } from './v1-to-v2'

describe('applyMigration function', () => {
  it('should correctly migrate a document from v1 to v2', () => {
    const documentV1 = {
      name: 'MyDocument',
      version: 1,
      elements: [
        {
          name: 'rectangle',
          version: 2,
          color: 'blue',
          id: 'uniqueId',
          x: 10,
          y: 20,
          width: 100,
          height: 50,
          angle: 45,
          opacity: 0.8,
          fill: { style: 'Solid' },
          stroke: { style: 'Dashed', width: 2 },
          selected: true
        },
      ],
      author: 'John Doe'
    }

    const migratedDocument = applyV1toV2Migration(documentV1)

    expect(migratedDocument).toHaveProperty('created_at')
    expect(migratedDocument.version).toBe(2)

    // Parse migrated document using the DocumentSchemaV2
    const parsedMigratedDocument = parseDocument(migratedDocument)

    // Ensure the migrated document matches the DocumentSchemaV2
    expect(parsedMigratedDocument).toEqual(migratedDocument)
  })

  it('should not migrate if document version is already at the latest version', () => {
    const documentV2 = {
      name: 'MyDocument',
      version: 2,
      elements: [
        // ... elements for version 2
      ],
      author: 'John Doe',
      created_at: 'some_date'
    }

    const nonMigratedDocument = applyV1toV2Migration(documentV2)

    // Expect the document remains unchanged as it's already at version 2
    expect(nonMigratedDocument).toEqual(documentV2)
  })
})
