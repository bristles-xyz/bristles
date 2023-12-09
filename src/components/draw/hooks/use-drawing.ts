import { useEffect, useReducer, useRef } from 'react'
import { useCanvasRerender } from './use-canvas-rerender'
import { getIndexElementAtPosition } from '../factory'
import { pointInsideRectangle } from '../lib/math/math'
import { initState, stateReducer, getElements, getSelectedProperties } from '../store/state'
import { ShapeHandler } from '../shapes'
import { type TOOL_LIST } from '../types'
import { type Point } from '../lib/math/types'
import { createStartDrawingAction } from '../store/drawing/start'
import { createOnDrawingAction } from '../store/drawing/on'
import { createEndDrawingAction } from '../store/drawing/end'
import { createStartWritingAction } from '../store/writing/start'
import { createEndWritingAction } from '../store/writing/end'
import { createStartResizingAction } from '../store/resizing/start'
import { createOnResizingAction } from '../store/resizing/on'
import { createEndResizingAction } from '../store/resizing/end'
import { createEndMovingAction } from '../store/moving/end'
import { createOnMovingAction } from '../store/moving/on'
import { createStartMovingAction } from '../store/moving/start'
import { createRemoveSelectionAction } from '../store/selection/remove'
import { createStorageLoadAction } from '../store/storage/load'
import { createSelectionSelectAction } from '../store/selection/select'
import { createSelectionStartAction } from '../store/selection/start'
import { createToolSetAction } from '../store/tool/set'
import { createSelectionUpdateAction } from '../store/selection/update'
import { type Properties } from '../shapes/types/handler'
import { createSelectionCopyAction } from '../store/selection/copy'
import { createHistoryUndoAction } from '../store/history/undo'
import { createHistoryRedoAction } from '../store/history/redo'

export function useDrawing () {
  const [state, dispatch] = useReducer(stateReducer, initState)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const {
    canvasRef,
    onZoom,
    zoom,
    getMouseCoordinates,
    getRelativeCoordinates
  } = useCanvasRerender({ elements: getElements(state), selection: state.selection })

  const removeCurrentElement = () => {
    dispatch(createRemoveSelectionAction())
  }

  const onSaveLocalStorage = () => {
    localStorage.setItem('pointout', JSON.stringify(getElements(state)))
  }

  const onRestoreLocalStorage = () => {
    const elementString = localStorage.getItem('pointout')

    if (elementString != null) {
      const savedElements = JSON.parse(elementString)
      dispatch(createStorageLoadAction(savedElements))
    }
  }

  const tool = state.tool
  const setTool = (tool: TOOL_LIST) => {
    dispatch(createToolSetAction(tool))
  }
  const endWriting = (text: string) => {
    dispatch(createEndWritingAction(text))
  }

  const updateSelection = (properties: Properties) => {
    dispatch(createSelectionUpdateAction(properties))
  }
  const copySelection = () => {
    dispatch(createSelectionCopyAction())
  }

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (e.button === 0) {
      const currentPoint = getMouseCoordinates({ x: e.clientX, y: e.clientY })

      if (state.action.name === 'none') {
        if (state.tool === 'move') {
          //dispatch({ type: 'START_PAN_MOVE', payload: { currentPoint }})
          return
        }

        if (['rectangle', 'line', 'circle', 'triangle'].includes(state.tool)) {
          dispatch(createStartDrawingAction(currentPoint))
          return
        }

        if (state.tool === 'selector') {
          /**
           * Revisar
           */
          // Comenzamos a mover la seleccion si el boton primary se presiona dentro de la seleccion y sin shift (posible deseleccion)
          if (state.selection !== undefined && !e.shiftKey) {
            if (pointInsideRectangle(currentPoint, state.selection.initialPosition, state.selection.width, state.selection.height)) {
              dispatch(createStartMovingAction(currentPoint))
              return
            }
          }

          const index = getIndexElementAtPosition(getElements(state), currentPoint)

          if (index !== -1) {
            const selectedElement = getElements(state)[index] ?? undefined
            if (selectedElement !== undefined) {
              // @ts-expect-error find out how to call generic method based on element
              const position = ShapeHandler(selectedElement.name).positionInElement(selectedElement, currentPoint)

              if (e.shiftKey || state.selection === undefined) {
                dispatch(createSelectionSelectAction(currentPoint, selectedElement.id)) 
                return
              } else {
                if (position.type === 'inside') {
                  //dispatch({ type: 'NEW_SELECTED', payload: { currentPoint, elementId: selectedElement.id } })
                  return
                } else if (position.type === 'border') {
                  dispatch(createStartResizingAction(currentPoint, selectedElement.id, position))
                  return
                }
              }
            }
          } else {
            // NO IMPLEMENTADO pero desactiva la seleccion actual
            dispatch(createSelectionStartAction(currentPoint))
          }
        }

        if (state.tool === 'text') {
          dispatch(createStartWritingAction(currentPoint))
          if (e !== undefined) {
            e.preventDefault()
          }
        }
      }

      /*
      if (state.action.name === 'selecting') {
        const index = getIndexElementAtPosition(elements, currentPoint)

        if (index !== -1) {
          const selectedElement = elements[index] ?? undefined

          if (selectedElement !== undefined) {
            const position = ShapeHandler(selectedElement.name).positionInElement({ element: selectedElement, point: currentPoint })
            if (action.ids.includes(selectedElement.id)) {
              if (position.type === 'inside') {
                selectedElement.selected = true
                const offset = { x: currentPoint.x - selectedElement.x, y: currentPoint.y - selectedElement.y }

                setAction({ name: 'moving', offset, initialPoint: currentPoint, elementId: selectedElement.id, currentPoint })
              } else if (position.type === 'border') {
                const newAction: MainAction = { name: 'resizing', initialPoint: currentPoint, position, elementId: selectedElement.id, currentPoint }
                setAction(newAction)
                const element = ShapeHandler(selectedElement.name).startAction({...newAction, element: selectedElement})
                element.selected = true
                setElements(prev => prev.map(el => (el.id === element.id ? element : ({...el, selected: true }) ) ))
                // Completar, quizas se necesite guardar position
              }
            } else {
              selectedElement.selected = true
              const offset = { x: currentPoint.x - selectedElement.x, y: currentPoint.y - selectedElement.y }

              setAction({ name: 'moving', offset, initialPoint: currentPoint, element: selectedElement, currentPoint })

              setElements(prev => prev.map(el => (el.id === selectedElement.id ? selectedElement : ({...el, selected: true }) ) ))
            }
          }
        } else {
          setAction({ ...action, ids: [] })
        }
      }*/
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const currentPoint = getMouseCoordinates({ x: e.clientX, y: e.clientY })

    if (state.action.name === 'none' && state.tool === 'selector') {
      if (state.selection !== undefined && pointInsideRectangle(currentPoint, state.selection.initialPosition, state.selection.width, state.selection.height)) {
        // @ts-expect-error todo
        e.target.style.cursor = 'grab'
      } else {
        // @ts-expect-error todo
        e.target.style.cursor = 'default' // 'default'
      }
    }

    switch (state.action.name) {
      case 'drawing':
        dispatch(createOnDrawingAction(currentPoint))
        break
      case 'moving':
        dispatch(createOnMovingAction(currentPoint))
        break
      case 'resizing':
        dispatch(createOnResizingAction(currentPoint))
        break
    }
  }

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const currentPoint = getMouseCoordinates({ x: e.clientX, y: e.clientY })

    switch (state.action.name) {
      case 'drawing':
        dispatch(createEndDrawingAction(currentPoint))
        break
      case 'moving':
        dispatch(createEndMovingAction(currentPoint))
        break
      case 'resizing':
        dispatch(createEndResizingAction(currentPoint))
        break
    }
  }

  useEffect(() => {
    const elementString = localStorage.getItem('pointout')

    if (elementString != null) {
      const savedElements = JSON.parse(elementString)
      dispatch(createStorageLoadAction(savedElements))
    }
  }, [])

  const controls: ControlProps = {
    elements: {
      count: getElements(state).length
    },
    tools: {
      selected: tool,
      onChange: setTool
    },
    selection: {
      properties: getSelectedProperties(state),
      onUpdateProperties: updateSelection,
      onCopy: copySelection,
      onRemove: removeCurrentElement
    },
    viewport: {
      scale: zoom,
      onZoom,
      getCanvasCoordinates: getMouseCoordinates,
      getScreenCoordinates: getRelativeCoordinates
    },
    storage: {
      onSave: onSaveLocalStorage,
      onRestore: onRestoreLocalStorage
    },
    history: {
      undo: () => { dispatch(createHistoryUndoAction()) },
      redo: () => { dispatch(createHistoryRedoAction()) }
    },
    properties: {
      default: state.defaults.properties
    },
    mouse: {
      onMouseDown,
      onMouseMove,
      onMouseUp
    }
  }

  return {
    action: state.action,
    selection: state.selection,

    endWriting,
    canvasRef,
    textareaRef,

    controls
  }
}

export interface ControlProps {
  tools: {
    selected: TOOL_LIST
    onChange: (tool: TOOL_LIST) => void
  }
  elements: {
    count: number
  }
  selection: {
    properties: Properties
    onUpdateProperties: (properties: Properties) => void
    onCopy: () => void
    onRemove: () => void
  }
  viewport: {
    scale: number
    onZoom: (delta: number) => void
    getCanvasCoordinates: (point: Point) => Point
    getScreenCoordinates: (point: Point) => Point
  }
  storage: {
    onSave: () => void
    onRestore: () => void
  }
  history: {
    undo: () => void
    redo: () => void
  }
  properties: {
    default: Properties
  }
  mouse: {
    onMouseDown: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
    onMouseMove: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
    onMouseUp: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
  }
}
