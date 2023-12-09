import { type Properties, type DrawFunctionProps, type Position } from '../types/handler'
import { distance, nearPoints } from '../../lib/math/math'
import { type ElementDrawingAction, type ElementMainAction } from '../types/actions'
import { type LineElement } from './types'
import { Point } from '../../lib/math/types'

export function draw (props: DrawFunctionProps<LineElement>) {
  const { context, element } = props

  const fromPoint = { x: element.x, y: element.y }
  const toPoint = { x: element.x + element.width, y: element.y + element.height }

  context.lineWidth = element.stroke.width + 2
  context.strokeStyle = element.color

  /**
   * Draw the line
   */
  context.beginPath()
  context.moveTo(fromPoint.x, fromPoint.y)
  context.lineTo(toPoint.x, toPoint.y)
  context.stroke()


  /**
   * Draw arrow head
   */
  if (element.arrow.style === 'head') {
    const headlen = 15
    const angle = Math.atan2(toPoint.y - fromPoint.y, toPoint.x - fromPoint.x)

    context.beginPath()
    context.moveTo(toPoint.x, toPoint.y)
    context.lineTo(
      toPoint.x - headlen * Math.cos(angle - Math.PI / 7),
      toPoint.y - headlen * Math.sin(angle - Math.PI / 7)
    )

    context.closePath()
    context.stroke()

    context.moveTo(toPoint.x, toPoint.y)
    context.lineTo(
      toPoint.x - headlen * Math.cos(angle + Math.PI / 7),
      toPoint.y - headlen * Math.sin(angle + Math.PI / 7)
    )
    context.closePath()
    context.stroke()
  }

  //rc.linearPath([[690, 10], [790, 20], [750, 120], [690, 100]])


  if (element.selected) {
    context.lineWidth = 1

    // context.strokeStyle = '#0d83cd'
    // context.strokeRect(element.x - 4, element.y - 4, element.width + 8, element.height + 8)

    // context.fillStyle = '#0d83cd'
    // context.fillRect(element.x - 8, element.y - 8, 8, 8)

    // context.fillStyle = '#0d83cd'
    // context.fillRect(element.x + element.width, element.y - 8, 8, 8)

    // context.fillStyle = '#0d83cd'
    // context.fillRect(element.x + element.width, element.y + element.height, 8, 8)

    context.arc(element.x, element.y, 4, 0, 2 * Math.PI)
    context.arc(element.x + element.width, element.y + element.height, 4, 0, 2 * Math.PI)
    context.fillStyle = element.color
    context.fill()
    context.stroke()

    //context.fillStyle = '#0d83cd'
    //context.fillRect(element.x - 8, element.y + element.height, 8, 8)
  }
}


/**
 * Creates a LineElement based on a current point and LineProperties object.
 * Generates a trivial line from the current point to the same current point.
 * @param {Point} currentPoint - The current point representing the start and end of the line.
 * @param {LineProperties} properties - The properties defining the line (e.g., width, height, etc.).
 * @returns {LineElement} - A LineElement object created with the provided current point and properties.
 */
export function create (action: ElementDrawingAction): LineElement {
  const { currentPoint, properties } = action
  const line: LineElement = {
    id: crypto.randomUUID(),
    name: 'line',
    x: currentPoint.x,
    y: currentPoint.y,
    width: 0,
    height: 0,
    angle: 0,
    color: properties.color,
    opacity: properties.opacity,
    stroke: properties.stroke ?? { style: 'Dashed', width: 5 },
    arrow: properties.arrow ?? { style: 'arrow' },
    // points: [{ x: 0, y: 0 }, { x: 0, y: 0 }],

    selected: false
  }

  return line
}

/**
 * Updates the size of an Element based on a new current point and returns a new Element.
 * @param {LineElement} element - The Element whose size needs to be updated.
 * @param {Point} currentPoint - The new current point representing the final position.
 * @returns {LineElement} - A new Element with the updated size based on the new current point.
 */
function updateElement (oldElement: LineElement, currentPoint: Point): LineElement {
  const width = currentPoint.x - oldElement.x
  const height = currentPoint.y - oldElement.y
  const element = { ...oldElement, width, height }
  return element
}

/**
 * Rearranges the position, width, and height of an Element to position it in the top-left corner.
 * @param {LineElement} element - The Element to be rearranged.
 * @returns {LineElement} - The rearranged Element with position set in the top-left corner.
 */
function cleanup (oldElement: LineElement): LineElement {
  const toX = oldElement.x + oldElement.width
  const toY = oldElement.y + oldElement.height

  if ((oldElement.x < toX) || (oldElement.x === toX && oldElement.y < toY) ) {
    const width = oldElement.width
    const height = oldElement.height
    //const points = { ...oldElement.points }
    //points[1] = { x: width, y: height }
    const element = { ...oldElement, width, height/*, points*/ }
    return element
  } else {
    const width = oldElement.x - toX
    const height = oldElement.y - toY
    //const points = { ...oldElement.points }
    //points[1] = { x: width, y: height }
    const element = { ...oldElement, x: toX, y: toY, width, height /*, points*/ }
    return element
  }
}

/**
 * Moves an Element to a new position based on a current point and an offset point, returning a new Element.
 * @param {LineElement} element - The Element to be moved.
 * @param {Point} currentPoint - The current point representing the Element's current position.
 * @param {Point} offset - The offset point representing the change in position.
 * @returns {ElemenLineElementt} - A new Element moved to the new position based on the current point and offset.
 */
function moveLine (oldElement: LineElement, currentPoint: Point, offset: Point): LineElement {
  const x = currentPoint.x - offset.x
  const y = currentPoint.y - offset.y
  const width = oldElement.width
  const height = oldElement.height
  const element = { ...oldElement, x, y, width, height }
  return element
}

/**
 * Initializes a LineElement for resizing by reordering the start or end point based on the provided position.
 * @param {LineElement} lineElement - The LineElement to be adjusted.
 * @param {Position} position - The position ('start' or 'end') to reorder the initial point.
 * @returns {LineElement} - A new LineElement with the initial point reordered based on the position.
 */
function reoderForResizeFromPosition (oldElement: LineElement, position: Position): LineElement {
  if (position.position === 'start') {
    const toX = oldElement.x + oldElement.width
    const toY = oldElement.y + oldElement.height
    const element = { ...oldElement, x: toX, y: toY, width: -oldElement.width, height: -oldElement.height }
    return element
  }

  return { ...oldElement }
}


/**
 * Starts an action over an element.
 * @param {ElementMainAction} action - The action to perform over the element.
 * @returns {LineElement} - Returns the created/update element
 */
export function startAction (element: LineElement, action: ElementMainAction) {
  switch (action.name) {
    case 'drawing':
      return create(action)
    case 'resizing':
      return reoderForResizeFromPosition(element, action.position)
  }

  throw new Error('Not implemented')
}

/**
 * Continuos an action over an element following the mouse movement.
 * @param {ElementMainAction} action - The action to perform over the element.
 * @returns {LineElement} - Returns the updated element
 */
export function updateAction (element: LineElement, action: ElementMainAction) {
  switch (action.name) {
    case 'drawing':
      if (element !== undefined) {
        return updateElement(element, action.currentPoint)
      }
      break
    case 'resizing':
      return updateElement(element, action.currentPoint)
    case 'moving':
      return moveLine(element, action.currentPoint, action.offset)
  }

  throw new Error('Not implemented')
}

/**
 * Finishes an action over an element.
 * @param {ElementMainAction} action - The action to perform over the element.
 * @returns {LineElement} - Returns the updated element
 */
export function endAction (element: LineElement, action: ElementMainAction) {
  switch (action.name) {
    case 'drawing': {
      if (element !== undefined) {
        const updatedElement = updateElement(element, action.currentPoint)
        return cleanup(updatedElement)
      }
      break
    }
    case 'resizing': {
      const updatedElement = updateElement(element, action.currentPoint)
      return cleanup(updatedElement)
    }
    case 'moving': {
      return moveLine(element, action.currentPoint, action.offset)
    }
  }

  throw new Error('Not implemented')
}

/**
 * Determines the position of a point relative to a LineElement.
 * @param {LineElement} element - The LineElement to check the position against.
 * @param {Point} point - The point coordinates to be evaluated.
 * @returns {Position} - Returns the position relative to the LineElement: 'start', 'end' if near the beginning or end,
 *                      'inside' if inside the element, or 'outside' if outside the element.
 */
export function positionInElement (element: LineElement, point: Point): Position {
  const a: Point = { x: element.x, y: element.y }
  const b: Point = { x: element.x + element.width, y: element.y + element.height }

  if (nearPoints(a, point)) {
    return { type: 'border', cursor: 'nwse-resize', position: 'start' }
  }

  if (nearPoints(b, point)) {
    return { type: 'border', cursor: 'nwse-resize', position: 'end' }
  }

  const offset = distance(a, b) - distance(a, point) - distance(b, point)
  if (Math.abs(offset) < 2) {
    return { type: 'inside', cursor: 'grab', position: '' }
  }

  return { type: 'outside', cursor: 'default', position: '' }
}

export function toString (element: LineElement): string {
  return JSON.stringify(element, null, 2)
}

export function fromString (element: string): LineElement {
  return JSON.parse(element) as LineElement
}

export function copy (element: LineElement, point: Point): LineElement {
  return {
    ...element,
    id: crypto.randomUUID(),
    x: point.x,
    y: point.y
  }
}

export function update (element: LineElement, properties: Properties): LineElement {
  return {
    ...element,
    color: properties.color,
    opacity: properties.opacity,
    stroke: properties.stroke ?? element.stroke,
    arrow: properties.stroke ?? element.arrow
  }
}

export function allowedProperties (): string[] {
  return ['stroke', 'arrow']
}

export function properties (element: LineElement): Properties {
  return { color: element.color, opacity: element.opacity, arrow: element.arrow, stroke: element.stroke }
}
