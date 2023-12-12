import { ArrowLeftIcon, ArrowRightIcon, CaretSortIcon, CopyIcon, DragHandleDots2Icon, LayersIcon, TrashIcon } from '@radix-ui/react-icons'
import { FillSelector } from './selector'
import { Button } from '../ui/button'
import { type ControlProps } from './hooks/use-drawing'

interface ToolsProps {
  controls: ControlProps
}

export function Tools (props: ToolsProps) {
  const { selection, history } = props.controls

  return (
    <div className='flex items-center w-full bg-card border rounded-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <div className='flex px-2'>
            <DragHandleDots2Icon className='h-4 w-4' />
          </div>
          <div className='flex border-l'>
            <Button variant='ghost' size='icon' onClick={history.undo} className='rounded-none'>
              <ArrowLeftIcon className="h-5 w-5"/>
            </Button>
          </div>
          <div className='flex border-l'>
            <Button variant='ghost' size='icon' onClick={history.redo} className='rounded-none'>
              <ArrowRightIcon className="h-5 w-5"/>
            </Button>
          </div>
          <div className='flex border-l'>
            <Button variant='ghost' size='icon' onClick={selection.onCopy} className='rounded-none'>
              <CopyIcon className="h-5 w-5"/>
            </Button>
          </div>

          <div className='flex border-l p-0 items-center'>
            <Button variant='ghost' size='sm' className='rounded-none' disabled>
              <LayersIcon className="h-5 w-5"/>
              <CaretSortIcon />
            </Button>
          </div>
          <div className='flex border-l p-0 items-center'>
            <FillSelector selection={selection}/>
          </div>
          <div className='flex border-l p-0'>
            <Button variant='ghost' size='icon' className='rounded-none'>
              <TrashIcon className="h-5 w-5 stroke-red-500" onClick={selection.onRemove}/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
