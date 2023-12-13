import { Zoom } from './zoom'
import { Tools } from './tools'
import { useDrawing } from './hooks/use-drawing'
import { useHotkeys } from './hooks/hotkeys/use-hotkeys'
import { Menu } from './menu'
import { useEffect, useRef } from 'react'
import { isDebugEnable } from '@bristles/web/config/const'


export function Draw () {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const {
    canvasRef,
    endWriting,

    action,
    controls
  } = useDrawing()


  useHotkeys([
    ['1', () => { controls.tools.onChange('selector') }],
    ['2', () => { controls.tools.onChange('rectangle') }],
    ['3', () => { controls.tools.onChange('line') }],
    ['Delete', () => { controls.selection.onRemove() }],
    ['ctrl+z', () => { controls.history.undo() }],
    ['mod+J', () => console.log('Toggle color scheme')],
    ['ctrl+K', () => console.log('Trigger search')],
  ])

  useEffect(() => {
    if (action.name === 'writing' && textAreaRef.current != null) {
      textAreaRef.current.focus()
    }
  }, [action])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-hero-pattern2 dark:bg-hero-pattern">
      <canvas
        ref={canvasRef}
        onMouseDown={controls.mouse.onMouseDown}
        onMouseMove={controls.mouse.onMouseMove}
        onMouseUp={controls.mouse.onMouseUp}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        Canvas is not supported
      </canvas>

      {action.name === 'writing' && (
        <textarea
          ref={textAreaRef}
          style={{
            position: 'fixed',
            top: controls.viewport.getScreenCoordinates(action.currentPoint).y,
            left: controls.viewport.getScreenCoordinates(action.currentPoint).x,
            margin: 0,
            padding: 0,
            border: 0,
            outline: 0,
            resize: 'none',
            overflow: 'hidden',
            whiteSpace: 'pre',
            background: 'transparent',
            font: '32px sans-serif'
          }}
          onBlur={(e) => { endWriting(e.target.value)} }/>
      )}

      <div className="absolute bottom-0 left-0 p-2 ">
        <div className='flex'>
          <Zoom {...controls.viewport}/>
        </div>
      </div>

      <div className='absolute top-0 left-1/2 transform -translate-x-1/2  p-2'>
        <Tools controls={controls} />
      </div>

      <div className="absolute top-0 left-0 p-2">
          <Menu controls={controls}/>
      </div>

      {isDebugEnable && (
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2  p-2 bg-card'>
          <div className='flex w-full items-center justify-between min-w-[200px]'>
            <div>
              {action.name}
            </div>
            <div>
              {controls.elements.count}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
