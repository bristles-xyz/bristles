import { describe, test, expect, vi } from 'vitest'
import { positionInElement } from './text'
import { TextSchemaType } from '@bristles/schema'

const fixedUUID = '550e8400-e29b-41d4-a716-446655440000'
// Mock the crypto.randomUUID function
const crypto = {
  randomUUID: vi.fn(() => fixedUUID) // Replace 'mocked-unique-id' with your desired mock ID
}

vi.stubGlobal('crypto', crypto)

describe('positionInElement', () => {
  const text: TextSchemaType = {
    version: 2,
    id: fixedUUID,
    name: 'text',
    x: 0,
    y: 0,
    width: 50,
    height: 30,
    angle: 0,

    text: 'Hello Word',
    font: {
      family: 'sans-serif',
      size: 12,
      align: 'center'
    },
    color: '#fff',
    opacity: 1,
    selected: false
  }

  // Test case for top-left corner of the rectangle
  test('should return "tl" for a point in top-left corner', () => {
    const point = { x: text.x, y: text.y }
    const result = positionInElement(text, point)
    expect(result.type).toBe('border')
    expect(result.position).toBe('tl')
  })

  // Test case for top-right corner of the rectangle
  test('should return "tr" for a point in top-right corner', () => {
    const point = { x: text.x + text.width, y: text.y }
    const result = positionInElement(text, point)
    expect(result.type).toBe('border')
    expect(result.position).toBe('tr')
  })

  // Test case for bottom-left corner of the rectangle
  test('should return "bl" for a point in bottom-left corner', () => {
    const point = { x: text.x, y: text.y + text.height }
    const result = positionInElement(text, point)
    expect(result.type).toBe('border')
    expect(result.position).toBe('bl')
  })

  // Test case for bottom-right corner of the rectangle
  test('should return "br" for a point in bottom-right corner', () => {
    const point = { x: text.x + text.width, y: text.y + text.height }
    const result = positionInElement(text, point)
    expect(result.type).toBe('border')
    expect(result.position).toBe('br')
  })

  // Test case for a point inside the rectangle
  test('should return "inner" for a point inside the rectangle', () => {
    const point = { x: text.x + 12, y: text.y + 12 } // Inside the rectangle
    const result = positionInElement(text, point)
    expect(result.type).toBe('inside')
  })

  // Test case for a point outside the rectangle
  test('should return "outside" for a point outside the rectangle', () => {
    const point = { x: -11, y: -11 } // Outside the rectangle
    const result = positionInElement(text, point)
    expect(result.type).toBe('outside')
  })
})
