import { describe, it, expect } from 'vitest'
import { applyV1toV2Migration } from './v1-to-v2'

describe('Line migration from v1 to v2', () => {
  it('should correctly migrate a line object from v1 to v2', () => {
    const lineV1 = {
      name: 'line',
      version: 1,
      color: 'red',
      id: 'defaultId',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      angle: 0,
      opacity: 1
    }

    const expectedMigratedLine = {
      name: 'line',
      version: 2,
      color: 'red',
      id: 'defaultId',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      angle: 0,
      opacity: 1,
      selected: false
    }

    const migratedRectangle = applyV1toV2Migration(lineV1)

    expect(migratedRectangle).toEqual(expectedMigratedLine)
  })
})
