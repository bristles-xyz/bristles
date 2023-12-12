import { describe, expect, test } from 'vitest'
import { distance, nearPoints, pointInsideRectangle } from './math'

describe('distance', () => {
  // Test for distance function - Case 1: Calculate distance between two points
  test('calculate distance between two points', () => {
    const pointA = { x: 0, y: 0 }
    const pointB = { x: 3, y: 4 }
    const result = distance(pointA, pointB)
    expect(result).toBe(5) // Expected distance for 3,4,0,0 points is 5
  })

  // Test for distance function - Case 2: Calculate distance between two points with negative coordinates
  test('calculate distance between two points with negative coordinates', () => {
    const pointA = { x: -2, y: -3 }
    const pointB = { x: 1, y: 2 }
    const result = distance(pointA, pointB)
    expect(result).toBeCloseTo(5.83, 2) // Expected distance for -2,-3,1,2 points is approximately 5.83
  })
})

describe('nearPoints', () => {
  // Test for nearPoints function - Case 1: Check if points are close within a given tolerance
  test('check if points are close within tolerance', () => {
    const pointA = { x: 0, y: 0 }
    const pointB = { x: 3, y: 4 }
    const tolerance = 6 // Tolerance set to 6 for this test
    const result = nearPoints(pointA, pointB, tolerance)
    expect(result).toBe(true) // Points 3,4 and 0,0 are within tolerance of 6
  })

  // Test for nearPoints function - Case 2: Check if points are not close within a given tolerance
  test('check if points are not close within tolerance', () => {
    const pointA = { x: 0, y: 0 }
    const pointB = { x: 10, y: 10 }
    const tolerance = 8 // Tolerance set to 8 for this test
    const result = nearPoints(pointA, pointB, tolerance)
    expect(result).toBe(false) // Points 10,10 and 0,0 are not within tolerance of 8
  })
})

// Test suite for pointInsideRectangle function
describe('pointInsideRectangle', () => {
  // Test case where the point is inside the rectangle
  test('should return true when point is inside the rectangle', () => {
    const point = { x: 3, y: 4 } // Point inside the rectangle
    const startRectangle = { x: 1, y: 1 } // Top-left corner of the rectangle
    const width = 6
    const height = 4

    const result = pointInsideRectangle(point, startRectangle, width, height)
    expect(result).toBe(true)
  })

  // Test case where the point is outside the rectangle
  test('should return false when point is outside the rectangle', () => {
    const point = { x: 8, y: 6 } // Point outside the rectangle
    const startRectangle = { x: 1, y: 1 } // Top-left corner of the rectangle
    const width = 6
    const height = 4

    const result = pointInsideRectangle(point, startRectangle, width, height)
    expect(result).toBe(false)
  })
})
