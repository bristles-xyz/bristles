import { describe, it, expect } from 'vitest'
import { TextSchema } from './index'
import { parseText } from './parse'

describe('parseLine function', () => {
  it('should parse a valid line object of version 2 without migration', () => {
    const validTextV2 = {
      name: 'text',
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
      stroke: { style: 'Dashed', width: 2 },
      text: 'Hello world'
    }

    const parsedText = parseText(validTextV2)

    expect(parsedText).toEqual(validTextV2)
  })

  it('should parse a valid line object of version 1 with migration to version 2', () => {
    const validTextV1 = {
      name: 'text',
      version: 1,
      color: 'red',
      id: 'defaultId',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      angle: 0,
      opacity: 1,
      stroke: { style: 'Dotted', width: 1 },
      text: 'Hello world'
    }

    const expectedMigratedText = {
      name: 'text',
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
      stroke: { style: 'Dotted', width: 1 },
      text: 'Hello world'
    }

    const parsedText = parseText(validTextV1)

    expect(parsedText).toEqual(expectedMigratedText)
    expect(() => TextSchema.parse(validTextV1)).toThrow() // Ensure object of version 1 fails schema validation
  })

  it('should throw an error for an invalid line object', () => {
    const invalidText = {
      name: 'text',
      version: 2,
      color: 'green', // Missing 'id' property
      fill: { style: 'Solid' },
      stroke: { style: 'Solid', width: 1 }
    }

    expect(() => parseText(invalidText)).toThrow()
  })
})
