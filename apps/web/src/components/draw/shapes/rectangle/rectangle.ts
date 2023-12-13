import { nearPoints } from '../../lib/math/math'
import { type Position, type DrawFunctionProps, type Properties } from '../types/handler'

import rough from 'roughjs'
import type { ElementDrawingAction, ElementMainAction } from '../types/actions'
import type { Point } from '../../lib/math/types'
import { RectangleSchema, RectangleSchemaType } from '@bristles/schema'

export function draw (element: RectangleSchemaType, props: DrawFunctionProps) {
  const { canvas, context } = props

  const rc = rough.canvas(canvas)
  const generator = rough.generator()

  let fillOptions
  let strokeOptions
  if (element.fill !== undefined && element.fill.style !== 'None') {
    fillOptions = {
      fill: element.color,
      fillStyle: element.fill.style === 'Solid' ? 'solid' : (element.fill.style === 'Semi1' ? 'hachure' : 'cross-hatch') 
    }
  }

  if (element.stroke !== undefined && element.stroke.style !== 'None') {
    strokeOptions = {
      color: element.color
    }
  }

  const rec = generator.rectangle(element.x, element.y, element.width, element.height, { 
    roughness: 0.5,
    fill: fillOptions?.fill ?? undefined,
    fillStyle: fillOptions?.fillStyle ?? undefined,
    stroke: strokeOptions?.color ?? undefined
  })
  rc.draw(rec)
  //rc.rectangle(element.x, element.y, element.width, element.height, { roughness: 0.5, fill: 'red' })


  /*
  context.fillStyle = element.color
  context.fillRect(element.x, element.y, element.width, element.height)
  context.roundRect(element.x, element.y, element.width, element.height, [5])
  // context.stroke()*/

  if (element.selected) {
    context.lineWidth = 1

    context.strokeStyle = '#0d83cd'
    context.strokeRect(element.x - 4, element.y - 4, element.width + 8, element.height + 8)

    context.fillStyle = '#0d83cd'
    context.fillRect(element.x - 8, element.y - 8, 8, 8)

    context.fillStyle = '#0d83cd'
    context.fillRect(element.x + element.width, element.y - 8, 8, 8)

    context.fillStyle = '#0d83cd'
    context.fillRect(element.x + element.width, element.y + element.height, 8, 8)

    context.fillStyle = '#0d83cd'
    context.fillRect(element.x - 8, element.y + element.height, 8, 8)
  }
}

/**
 * Moves an Element to a new position based on a current point and an offset point, returning a new Element.
 * @param {Element} element - The Element to be moved.
 * @param {Point} currentPoint - The current point representing the Element's current position.
 * @param {Point} offset - The offset point representing the change in position.
 * @returns {Element} - A new Element moved to the new position based on the current point and offset.
 */
function moveRectangle (oldElement: RectangleSchemaType, currentPoint: Point, offset: Point): RectangleSchemaType {
  const x = currentPoint.x - offset.x
  const y = currentPoint.y - offset.y
  const width = oldElement.width
  const height = oldElement.height
  const element = { ...oldElement, x, y, width, height }
  return element
}

/**
 * Creates a RectangleElement object based on given properties and an initial current point.
 * @param {RectangleProperties} properties - The properties of the rectangle (position, width, height, etc.).
 * @param {Point} currentPoint - The initial current point representing the starting position of the rectangle.
 * @returns {RectangleElement} - A RectangleElement object created with the provided properties and initial current point.
 */
export function create (props: ElementDrawingAction): RectangleSchemaType {
  const { properties, currentPoint } = props
  const rectangle: RectangleSchemaType = {
    version: 2,
    id: crypto.randomUUID(),
    name: 'rectangle',
    x: currentPoint.x,
    y: currentPoint.y,
    width: 1,
    height: 1,
    angle: 0,

    color: properties.color,
    opacity: properties.opacity,
    fill: {
      style: properties.fill?.style ?? 'Solid'
    },
    stroke: {
      style: properties.stroke?.style ?? 'Solid',
      width: properties.stroke?.width ?? 5
    },
    selected: false
  }

  return rectangle
}

/**
 * Updates the size of an Element based on a new current point and returns a new Element.
 * @param {Element} element - The Element whose size needs to be updated.
 * @param {Point} currentPoint - The new current point representing the final position.
 * @returns {Element} - A new Element with the updated size based on the new current point.
 */
function updateElement (oldElement: RectangleSchemaType, currentPoint: Point): RectangleSchemaType {
  const width = currentPoint.x - oldElement.x
  const height = currentPoint.y - oldElement.y

  const element = { ...oldElement, width, height }
  return element
}

/**
 * Rearranges the position, width, and height of an Element to position it in the top-left corner.
 * @param {Element} element - The Element to be rearranged.
 * @returns {Element} - The rearranged Element with position set in the top-left corner.
 */
function cleanup (oldElement: RectangleSchemaType): RectangleSchemaType {
  const minX = Math.min(oldElement.x, oldElement.x + oldElement.width)
  const minY = Math.min(oldElement.y, oldElement.y + oldElement.height)

  const element = { ...oldElement, x: minX, y: minY, width: Math.abs(oldElement.width), height: Math.abs(oldElement.height) }
  return element
}

/**
 * Starts an action over an element.
 * @param {ElementMainAction} action - The action to perform over the element.
 * @returns {Element} - Returns the created/update element
 */
export function startAction (element: RectangleSchemaType, action: ElementMainAction) {
  if (action.name === 'drawing') return create(action)

  if (action.name === 'resizing') {
    const { position } = action
    const tl = { x: element.x, y: element.y }
    const tr = { x: element.x + element.width, y: element.y }
    const bl = { x: element.x, y: element.y + element.height }
    const br = { x: element.x + element.width, y: element.y + element.height }

    if (position.position === 'bl') {
      const width = bl.x - tr.x
      const height = bl.y - tr.y
      return { ...element, x: tr.x, y: tr.y, width, height }
    }

    if (position.position === 'tr') {
      const width = tr.x - bl.x
      const height = tr.y - bl.y
      return { ...element, x: bl.x, y: bl.y, width, height }
    }

    if (position.position === 'tl') {
      const width = tl.x - br.x
      const height = tl.y - br.y
      return { ...element, x: br.x, y: br.y, width, height }
    }

    /*
    if (position.position === 'br') {
      const width = br.x - tl.x
      const height = br.y - tl.y
      return { ...action.element, x: tl.x, y: tl.y, width, height }
    }*/

    return { ...element }
  }

  throw new Error('Not implemented')
}

/**
 * Continuos an action over an element following the mouse movement.
 * @param {ElementMainAction} action - The action to perform over the element.
 * @returns {Element} - Returns the updated element
 */
export function updateAction (element: RectangleSchemaType, action: ElementMainAction) {
  switch (action.name) {
    case 'drawing':
      if (element !== undefined) {
        return updateElement(element, action.currentPoint)
      }
      break
    case 'resizing':
      return updateElement(element, action.currentPoint)
    case 'moving':
      return moveRectangle(element, action.currentPoint, action.offset)
  }

  throw new Error('Not implemented')
}

/**
 * Finishes an action over an element.
 * @param {ElementMainAction} action - The action to perform over the element.
 * @returns {Element} - Returns the updated element
 */
export function endAction (element: RectangleSchemaType, action: ElementMainAction) {
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
      return moveRectangle(element, action.currentPoint, action.offset)
    }
  }

  throw new Error('Not implemented')
}

/**
 * Determines the position of a point relative to an element.
 * @param {RectangleElement} element - The HTML element to check the position against.
 * @param {Point} point - The point coordinates to be evaluated.
 * @returns {Position} - Returns the position relative to the element
 */
export function positionInElement (element: RectangleSchemaType, point: Point): Position {
  if (element.name === 'rectangle') {
    if (nearPoints({ x: element.x, y: element.y }, point, 10)) {
      return { type: 'border', cursor: 'nwse-resize', position: 'tl' }
    }

    if (nearPoints({ x: element.x + element.width, y: element.y }, point, 10)) {
      return { type: 'border', cursor: 'nesw-resize', position: 'tr' }
    }

    if (nearPoints({ x: element.x, y: element.y + element.height }, point, 10)) {
      return { type: 'border', cursor: 'nesw-resize', position: 'bl' }
    }

    if (nearPoints({ x: element.x + element.width, y: element.y + element.height }, point, 10)) {
      return { type: 'border', cursor: 'nwse-resize', position: 'br' }
    }

    const insideXAxis = (element.x <= point.x) && (point.x < element.x + element.width)
    const insideYAxis = (element.y <= point.y) && (point.y < element.y + element.height)

    if (insideXAxis && insideYAxis) {
      return { type: 'inside', cursor: 'grab', position: '' }
    }
  }

  return { type: 'outside', cursor: 'default', position: '' }
}

export function toString (element: RectangleSchemaType): string {
  return JSON.stringify(element, null, 2)
}

export function fromString (element: string): RectangleSchemaType {
  const object = JSON.parse(element) 
  return RectangleSchema.parse(object)
}

export function copy (element: RectangleSchemaType, point: Point): RectangleSchemaType {
  return {
    ...element,
    id: crypto.randomUUID(),
    x: point.x,
    y: point.y
  }
}

export function update (element: RectangleSchemaType, properties: Properties): RectangleSchemaType {
  console.log('Properties ', { properties })
  return {
    ...element,
    color: properties.color,
    opacity: properties.opacity,
    fill: properties.fill ?? element.fill,
    stroke: properties.stroke ?? element.stroke
  }
}

export function allowedProperties (): string[] {
  return ['fill', 'stroke']
}

export function properties (element: RectangleSchemaType): Properties {
  return { color: element.color, opacity: element.opacity, fill: element.fill, stroke: element.stroke }
}
