import { describe, it, expect } from 'vitest'
import { LineSchema } from './index'
import { parseLine } from './parse'

describe('parseLine function', () => {
  it('should parse a valid line object of version 2 without migration', () => {
    const validLineV2 = {
      name: 'line',
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
      stroke: { style: 'Dashed', width: 2 }
    }

    const parsedLine = parseLine(validLineV2)

    expect(parsedLine).toEqual(validLineV2)
  })

  it('should parse a valid line object of version 1 with migration to version 2', () => {
    const validLineV1 = {
      name: 'line',
      version: 1,
      color: 'red',
      id: 'defaultId',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      angle: 0,
      opacity: 1,
      stroke: { style: 'Dotted', width: 1 }
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
      selected: false,
      stroke: { style: 'Dotted', width: 1 }
    }

    const parsedLine = parseLine(validLineV1)

    expect(parsedLine).toEqual(expectedMigratedLine)
    expect(() => LineSchema.parse(validLineV1)).toThrow() // Ensure object of version 1 fails schema validation
  })

  it('should throw an error for an invalid line object', () => {
    const invalidLine = {
      name: 'line',
      version: 2,
      color: 'green', // Missing 'id' property
      fill: { style: 'Solid' },
      stroke: { style: 'Solid', width: 1 }
    }

    expect(() => parseLine(invalidLine)).toThrow()
  })
})
