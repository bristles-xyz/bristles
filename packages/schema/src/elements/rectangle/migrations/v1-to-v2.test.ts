import { describe, it, expect } from 'vitest'
import { applyV1toV2Migration } from './v1-to-v2'

describe('Rectangle migration from v1 to v2', () => {
  it('should correctly migrate a rectangle object from v1 to v2', () => {
    const rectangleV1 = {
      name: 'rectangle',
      version: 1,
      color: 'red',
      id: 'defaultId',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      angle: 0,
      opacity: 1,
      fill: { style: 'Solid' },
      stroke: { style: 'Dotted', width: 1 }
    }

    const expectedMigratedRectangle = {
      name: 'rectangle',
      version: 2,
      color: 'red',
      id: 'defaultId',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      angle: 0,
      opacity: 1,
      selected: false,
      fill: { style: 'Solid' },
      stroke: { style: 'Dotted', width: 1 }
    }

    const migratedRectangle = applyV1toV2Migration(rectangleV1)

    expect(migratedRectangle).toEqual(expectedMigratedRectangle)
  })
})
