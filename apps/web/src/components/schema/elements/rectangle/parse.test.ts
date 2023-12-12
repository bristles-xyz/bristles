import { describe, it, expect } from 'vitest'
import { RectangleSchema } from './index'
import { parseRectangle } from './parse'

describe('parseRectangle function', () => {
  it('should parse a valid rectangle object of version 2 without migration', () => {
    const validRectangleV2 = {
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
      selected: true,
      fill: { style: 'Solid' },
      stroke: { style: 'Dashed', width: 2 }
    }

    const parsedRectangle = parseRectangle(validRectangleV2)

    expect(parsedRectangle).toEqual(validRectangleV2)
  })

  it('should parse a valid rectangle object of version 1 with migration to version 2', () => {
    const validRectangleV1 = {
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

    const parsedRectangle = parseRectangle(validRectangleV1)

    expect(parsedRectangle).toEqual(expectedMigratedRectangle)
    expect(() => RectangleSchema.parse(validRectangleV1)).toThrow() // Ensure object of version 1 fails schema validation
  })

  it('should throw an error for an invalid rectangle object', () => {
    const invalidRectangle = {
      name: 'rectangle',
      version: 2,
      color: 'green', // Missing 'id' property
      fill: { style: 'Solid' },
      stroke: { style: 'Solid', width: 1 }
    }

    expect(() => parseRectangle(invalidRectangle)).toThrow()
  })
})
