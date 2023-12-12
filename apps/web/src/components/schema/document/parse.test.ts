import { describe, it, expect } from 'vitest'
import { parseDocument } from './parse'

describe('parseDocument function', () => {
  it('should parse a valid document object', () => {
    const validDocument = {
      name: 'MyDocument',
      version: 2,
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
        {
          name: 'line',
          version: 2,
          id: 'lineId',
          x: 5,
          y: 15,
          width: 150,
          height: 20,
          angle: 90,
          opacity: 0.6,
          color: 'blue',
          stroke: { style: 'Dashed', width: 2 },
          selected: false
        }
      ],
      author: 'John Doe',
      created_at: 'date'
    }

    const parsedDocument = parseDocument(validDocument)

    expect(parsedDocument).toEqual(validDocument)
  })

  it('should throw an error for an invalid document object', () => {
    const invalidDocument = {
      name: 'InvalidDocument',
      version: 1,
      elements: [
        {
          name: 'InvalidElement',
          version: 2
          // Missing required properties for the element
        }
      ],
      author: 'Jane Doe'
    }

    expect(() => parseDocument(invalidDocument)).toThrow()
  })
})
