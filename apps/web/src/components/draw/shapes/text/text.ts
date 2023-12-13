import type { ElementSchemaType, TextSchemaType } from '@bristles/schema'
import { nearPoints } from '../../lib/math/math'
import { Point } from '../../lib/math/types'
import { ElementDrawingAction, ElementMainAction } from '../types/actions'
import type { DrawFunctionProps, Position, Properties } from '../types/handler'

export function draw (element: ElementSchemaType, props: DrawFunctionProps) {
  const { context } = props

  if (element.name === 'text') {
    context.textBaseline = 'top'
    //context.strokeStyle = 'red' //element.strokeColor
    context.fillStyle = element.color
    context.font = `${element.font.size}px ${element.font.family}`
    context.fillText(element.text, element.x, element.y)
    //context.lineWidth = 10 //element.lineWidth

    //const measure = context.measureText(element.text)
    //measure.width
    //height = 48  (48px)

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
}

/**
 * Creates a LineElement based on a current point and LineProperties object.
 * Generates a trivial line from the current point to the same current point.
 * @param {Point} currentPoint - The current point representing the start and end of the line.
 * @param {LineProperties} properties - The properties defining the line (e.g., width, height, etc.).
 * @returns {TextElement} - A LineElement object created with the provided current point and properties.
 */
export function create (action: ElementDrawingAction): TextSchemaType {
  const { currentPoint, properties } = action
  const userText = properties.text ?? 'Text'
  const element = document.createElement('canvas')
  const context = element.getContext('2d')

  if (context == null) {
    throw new Error('Unable to create a context to measure text')
  }
  context.font = '32px sans-serif'
  const width = context.measureText(userText).width

  const text: TextSchemaType = {
    version: 2,
    id: crypto.randomUUID(),
    name: 'text',
    x: currentPoint.x,
    y: currentPoint.y,
    width: width ?? 30,
    height: 32,
    angle: 0,
    color: properties.color,
    font: properties.font ?? { family: 'sans-serif', size: 32, align: 'center' },
    text: userText,
    opacity: 1,
    selected: false
  }

  return text
}

/**
 * Moves an Element to a new position based on a current point and an offset point, returning a new Element.
 * @param {TextElement} element - The Element to be moved.
 * @param {Point} currentPoint - The current point representing the Element's current position.
 * @param {Point} offset - The offset point representing the change in position.
 * @returns {TextElement} - A new Element moved to the new position based on the current point and offset.
 */
function moveText (oldElement: TextSchemaType, currentPoint: Point, offset: Point): TextSchemaType {
  const x = currentPoint.x - offset.x
  const y = currentPoint.y - offset.y
  const width = oldElement.width
  const height = oldElement.height
  const element = { ...oldElement, x, y, width, height }
  return element
}


/**
 * Starts an action over an element.
 * @param {ElementMainAction} action - The action to perform over the element.
 * @returns {TextElement} - Returns the created/update element
 */
export function startAction (element: TextSchemaType, action: ElementMainAction) {
  switch (action.name) {
    //case 'writing':
    //  return create(action)
    case 'moving':
      return { ...element }
    case 'resizing':
      return { ...element }
      // return reoderForResizeFromPosition(action.element, action.position)
  }

  throw new Error('Not implemented')
}

/**
 * Continuos an action over an element following the mouse movement.
 * @param {ElementMainAction} action - The action to perform over the element.
 * @returns {TextElement} - Returns the updated element
 */
export function updateAction (element: TextSchemaType, action: ElementMainAction) {
  switch (action.name) {
    case 'drawing':
      if (element !== undefined) {
        return { ...element }
        //return updateElement(action.element, action.currentPoint)
      }
      break
    case 'resizing':
      break
      //return updateElement(action.element, action.currentPoint)
    case 'moving':
      return moveText(element, action.currentPoint, action.offset)
  }

  throw new Error('Not implemented')
}

/**
 * Finishes an action over an element.
 * @param {ElementMainAction} action - The action to perform over the element.
 * @returns {TextElement} - Returns the updated element
 */
export function endAction (element: TextSchemaType, action: ElementMainAction) {
  switch (action.name) {
    case 'drawing':
      if (element !== undefined) {
        return { ...element }
        //return updateElement(action.element, action.currentPoint)
      }
      break
    case 'resizing': {
      //const updatedElement = updateElement(action.element, action.currentPoint)
      //return cleanup(updatedElement)
      break
    }
    case 'moving': {
      //return moveRectangle(action.element, action.currentPoint, action.offset)
    }
  }

  throw new Error('Not implemented')
}

/**
 * Determines the position of a point relative to a LineElement.
 * @param {TextElement} element - The LineElement to check the position against.
 * @param {Point} point - The point coordinates to be evaluated.
 * @returns {Position} - Returns the position relative to the LineElement: 'start', 'end' if near the beginning or end,
 *                      'inside' if inside the element, or 'outside' if outside the element.
 */
export function positionInElement (element: TextSchemaType, point: Point): Position {
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

  return { type: 'outside', cursor: 'default', position: '' }
}


export function toString (element: TextSchemaType): string {
  return JSON.stringify(element, null, 2)
}

export function fromString (element: string): TextSchemaType {
  return JSON.parse(element) as TextSchemaType
}

export function copy (element: TextSchemaType, point: Point): TextSchemaType {
  return {
    ...element,
    id: crypto.randomUUID(),
    x: point.x,
    y: point.y
  }
}

export function update (element: TextSchemaType, properties: Properties): TextSchemaType {
  return {
    ...element,
    color: properties.color,
    opacity: properties.opacity,
    text: properties.text ?? element.text,
    font: properties.font ?? element.font
  }
}

export function allowedProperties (): string[] {
  return ['text', 'font']
}

export function properties (element: TextSchemaType): Properties {
  return { color: element.color, opacity: element.opacity, text: element.text, font: element.font }
}
