import { useEffect, useLayoutEffect, useReducer, useRef } from 'react'

import { ShapeHandler } from '../shapes'
import { type Element } from '../shapes/types/element'
import { type Point } from '../lib/math/types'
import { viewportReducer } from '../store/viewport/reducer'
import { type ViewportState, initState } from '../store/viewport/state'

interface SelectionState {
  type: 'simple' | 'multiple'
  ids: string[]
  initialPosition: Point
  height: number
  width: number
}

interface UseCanvasRerenderProps {
  elements: Element[]
  selection?: SelectionState
}

export const getCoordinatesFromClientScreen = (state: ViewportState, point: Point) => {
  return ({ x: point.x - state.panOffset.x, y: point.y - state.panOffset.y })
}


export function useCanvasRerender ({ elements, selection }: UseCanvasRerenderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [viewport, dispatch] = useReducer(viewportReducer, initState)

  useLayoutEffect(() => {
    /**
     * Validate canvas's references
     */
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (canvas == null || context == null) {
      throw new Error('No canvas element')
    }

    // canvas.style.cursor = 'crosshair'
    /**
     * Clear canvas
     */
    context.clearRect(0, 0, canvas.width, canvas.height)

    if (!(canvasRef.current instanceof HTMLCanvasElement)) {
      return
    }

    const scaledWidth = canvasRef.current?.width * viewport.scale
    const scaledHeight = canvasRef.current?.height * viewport.scale
    const scaleOffsetX = (scaledWidth - canvasRef.current?.width) / 2
    const scaleOffsetY = (scaledHeight - canvasRef.current?.height) / 2
    //
    // dispatch() 
    //update setScaleOffset { x: scaleOffsetX, y: scaleOffsetY}



    context.save()
    context.translate(viewport.panOffset.x * viewport.scale - scaleOffsetX, viewport.panOffset.y * viewport.scale - scaleOffsetY)
    context.scale(viewport.scale, viewport.scale)

    /**
     * Draw all elements
     */
    elements.forEach(element => {
      if (selection !== undefined && selection.type === 'simple' && (selection.ids ?? []).includes(element.id)) {
        // @ts-expect-error find out how to call generic method based on element
        ShapeHandler(element.name).draw({ ...element, selected: true }, { canvas, context })
      } else {
        // @ts-expect-error find out how to call generic method based on element
        ShapeHandler(element.name).draw({ ...element, selected: false }, { canvas, context,  })
      }
    })

    if (selection !== undefined && selection.type === 'multiple') {
      context.lineWidth = 1

      context.strokeStyle = '#0d83cd'
      context.strokeRect(selection.initialPosition.x - 4, selection.initialPosition.y - 4, selection.width + 8, selection.height + 8)

      context.fillStyle = '#0d83cd'
      context.fillRect(selection.initialPosition.x - 8, selection.initialPosition.y - 8, 8, 8)

      context.fillStyle = '#0d83cd'
      context.fillRect(selection.initialPosition.x + selection.width, selection.initialPosition.y - 8, 8, 8)

      context.fillStyle = '#0d83cd'
      context.fillRect(selection.initialPosition.x + selection.width, selection.initialPosition.y + selection.height, 8, 8)

      context.fillStyle = '#0d83cd'
      context.fillRect(selection.initialPosition.x - 8, selection.initialPosition.y + selection.height, 8, 8)
    }

    context.restore()
  }, [canvasRef, elements, selection, viewport])

  const onZoom = (delta: number) => {
    dispatch({ type: 'VIEWPORT_ZOOM', payload: { delta } })
  }

  useEffect(() => {
    const panFunction = (event: WheelEvent) => {
      if (event.ctrlKey) {
        const dir = Math.sign(event.deltaY)
        const step = -0.1
        dispatch({ type: 'VIEWPORT_ZOOM', payload: { delta: step * dir } })
        event.preventDefault()
      } else {
        if (event.shiftKey) {
          dispatch({ type: 'PAN_WHEEL_SCROLL', payload: { delta: { x: event.deltaY, y: event.deltaX } } })
        } else {
          dispatch({ type: 'PAN_WHEEL_SCROLL', payload: { delta: { x: event.deltaX, y: event.deltaY } } })
        }
      }
    }

    window.addEventListener('wheel', panFunction, { passive: false })
    return () => {
      window.removeEventListener('wheel', panFunction)
    }
  }, [dispatch])

  const getMouseCoordinates = (point: Point) => {
    if (canvasRef.current != null) {
      const scaledWidth = canvasRef.current?.width * viewport.scale
      const scaledHeight = canvasRef.current?.height * viewport.scale
      const scaleOffsetX = (scaledWidth - canvasRef.current?.width) / 2
      const scaleOffsetY = (scaledHeight - canvasRef.current?.height) / 2

      return {
        x: (point.x - viewport.panOffset.x * viewport.scale + scaleOffsetX) / viewport.scale,
        y: (point.y - viewport.panOffset.y * viewport.scale + scaleOffsetY) / viewport.scale
      }
    }

    return ({ x: point.x - viewport.panOffset.x, y: point.y - viewport.panOffset.y })
  }

  const getRelativeCoordinates = (point: Point) => {
    if (canvasRef.current != null) {
      const scaledWidth = canvasRef.current?.width * viewport.scale
      const scaledHeight = canvasRef.current?.height * viewport.scale
      const scaleOffsetX = (scaledWidth - canvasRef.current?.width) / 2
      const scaleOffsetY = (scaledHeight - canvasRef.current?.height) / 2

      return {
        x: viewport.scale * point.x - scaleOffsetX + viewport.panOffset.x * viewport.scale,
        y: viewport.scale * point.y - scaleOffsetY + viewport.panOffset.y * viewport.scale
      }
    }

    return ({ x: point.x + viewport.panOffset.x, y: point.y + viewport.panOffset.y })
  }

  return { canvasRef, viewport, onZoom, zoom: viewport.scale, getMouseCoordinates, getRelativeCoordinates }
}
