import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'

interface ZoomProps {
  scale: number
  onZoom: (delta: number) => void
}

export function Zoom (props: ZoomProps) {
  return (
    <div className='rounded-sm cursor-none flex items-center bg-card border'>
      <Button variant='ghost' size='icon' className='rounded-none' onClick={() => { props.onZoom(-0.1) }}><MinusIcon /></Button>
      <Separator orientation='vertical'/>
      <span className='px-2'>{(new Intl.NumberFormat('en-GB', { style: 'percent' })).format(props.scale)}</span>
      <Separator orientation='vertical'/>
      <Button variant='ghost' size='icon' className='rounded-none' onClick={() => { props.onZoom(0.1) }}><PlusIcon /></Button>
    </div>
  )
}
