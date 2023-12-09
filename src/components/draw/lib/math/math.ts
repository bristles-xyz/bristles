import { type Point } from './types'

/**
 * Calculates the Euclidean distance between two points in a 2D plane.
 * @param {Point} point1 - The first point with properties x and y.
 * @param {Object} point2 - The second point with properties x and y.
 * @returns {number} - The distance between the two points.
 */
export function distance (a: Point, b: Point) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

/**
 * Checks if two points are close to each other within a specified tolerance.
 * @param {Point} point1 - The first point with properties x and y.
 * @param {Point} point2 - The second point with properties x and y.
 * @param {number} tolerance - The allowed tolerance for points to be considered close.
 * @returns {boolean} - Returns true if the points are within the specified tolerance, otherwise false.
 */
export function nearPoints (a: Point, b: Point, tolerance: number = 5) {
  return distance(a, b) < tolerance
}

/**
 * Checks if a point is inside the rectangle formed by its starting point, width, and height.
 * @param {Point} a - The point to check if it lies inside the rectangle.
 * @param {Point} startRectangle - The starting point (top-left corner) of the rectangle.
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @returns {boolean} - Returns true if the point is inside the rectangle, otherwise false.
 */
export function pointInsideRectangle (a: Point, startRectangle: Point, width: number, height: number) {
  const insideX = startRectangle.x <= a.x && a.x <= startRectangle.x + width
  const insideY = startRectangle.y <= a.y && a.y <= startRectangle.y + height

  return insideX && insideY
}
