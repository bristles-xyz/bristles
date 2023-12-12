import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from '@/components/ui/menubar'
import { useTheme } from '@/context/theme-provider'
import { CursorArrowIcon, DoubleArrowRightIcon, DownloadIcon, DragHandleDots2Icon, FileIcon, MoonIcon, QuestionMarkCircledIcon, Share1Icon, SlashIcon, SquareIcon, SunIcon, TextIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { type ControlProps } from './hooks/use-drawing'

// https://www.svgrepo.com/svg/450678/brush-mark
const BrushIcon = () => (
  <svg className='h-5 w-5 fill-current' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.334 21.39a6.166 6.166 0 0 1-1.151-.317 4.233 4.233 0 0 1-2.014-1.575 3.945 3.945 0 0 1 .575-4.804 13.407 13.407 0 0 1 3.549-2.401c1.133-.607 2.337-1.328 2.458-2.122.073-.41-.072-.67-.52-1.024a7.441 7.441 0 0 0-1.631-.82c-.61-.243-1.249-.463-1.903-.766a5.268 5.268 0 0 1-.99-.578 1.985 1.985 0 0 1-.786-1.19 1.525 1.525 0 0 1 .09-.828 1.803 1.803 0 0 1 .426-.606 3.477 3.477 0 0 1 1.022-.645 7.69 7.69 0 0 1 2.105-.529 10.898 10.898 0 0 1 4.193.338.5.5 0 0 1-.265.965 9.856 9.856 0 0 0-3.786-.207 6.592 6.592 0 0 0-1.775.49 2.352 2.352 0 0 0-.665.433c-.164.187-.174.241-.154.37.023.236.537.597 1.107.822.572.244 1.21.443 1.854.675a8.645 8.645 0 0 1 1.979.932 2.905 2.905 0 0 1 .907.96 2.275 2.275 0 0 1 .25 1.423 3.454 3.454 0 0 1-1.347 2.122 14.096 14.096 0 0 1-1.778 1.182 12.174 12.174 0 0 0-3.041 2.157 2.45 2.45 0 0 0-.617 1.33 1.794 1.794 0 0 0 .295 1.28A3.3 3.3 0 0 0 5.5 19.5a.99.99 0 0 1 .363.063 2.958 2.958 0 0 1-.755.639 1.493 1.493 0 0 0-.774 1.189zM22.11 6.018L18.4 9.35l-7.45 7.25 1.4 1.4 7.25-7.449 3.383-3.661a.626.626 0 0 0-.873-.873zM9.368 17.619l1.439 1.738a2.94 2.94 0 0 1-1.63 2.234 3.92 3.92 0 0 1-1.626.359 3.598 3.598 0 0 1-1.733-.427s1.8-.968 1.809-2.464c.006-1.38 1.451-1.44 1.703-1.44zm.35 1.99l-.78-.94a.379.379 0 0 0-.311.395 3.191 3.191 0 0 1-.633 1.85 3.042 3.042 0 0 0 .772-.234 1.823 1.823 0 0 0 .952-1.07z"/>
    <path fill="none" d="M0 0h24v24H0z"/>
  </svg>
)

interface MenuProps {
  controls: ControlProps
}
export function Menu (props: MenuProps) {
  const { setTheme, theme } = useTheme()
  const { controls } = props
  const { selected, onChange } = controls.tools

  /*
  const exportAsJson = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`
    const link = document.createElement('a')
    link.href = jsonString
    link.download = 'data.json'

    link.click()
  }*/
  const onToggleMode = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <Menubar className="px-0 py-0 flex p-0 rounded-sm bg-card" >
      <div className='flex pl-2'>
        <DragHandleDots2Icon className='h-4 w-4' />
      </div>
      <MenubarMenu>
        <MenubarTrigger className='logo-text text-lg rounded-none'>Bristles</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={controls.storage.onRestore}>
            <FileIcon className='h-4 w-4 mr-2'/> Open <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={controls.storage.onSave}>
            <DownloadIcon className='h-4 w-4 mr-2'/> Save to ... <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled >
            <Share1Icon className='h-4 w-4 mr-2'/> Share link ... <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={onToggleMode}>
            <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 h-4 w-4 mr-2" />
            <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 h-4 w-4 mr-2" />
            Toggle  ... <MenubarShortcut>⌘J</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            <QuestionMarkCircledIcon className='h-4 w-4 mr-2'/> About ... <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <div className='flex items-center justify-between'>
      <div className='flex items-center'>
      <div className={`flex border-l ${selected === 'selector' ? 'border-b border-b-primary border-b-2' : ''}`}>
        <Button variant='ghost' size='icon' className='rounded-none'>
          <CursorArrowIcon className="h-5 w-5" onClick={() => { onChange('selector') }}/>
        </Button>
      </div>
      <div className={`flex border-l ${selected === 'rectangle' ? 'border-b border-b-primary border-b-2' : ''}`}>
        <Button variant='ghost' size='icon' onClick={() => { onChange('rectangle') }} className='rounded-none'>
          <SquareIcon className="h-5 w-5"/>
        </Button>
      </div>
      <div className={`flex border-l ${selected === 'line' ? 'border-b border-b-primary border-b-2' : ''}`}>
        <Button variant='ghost' size='icon' onClick={() => { onChange('line') }} className='rounded-none'>
          <SlashIcon className="h-5 w-5"/>
        </Button>
      </div>
      <div className={`flex border-l border-r ${selected === 'text' ? 'border-b border-b-primary border-b-2' : ''}`}>
        <Button variant='ghost' size='icon' onClick={() => { onChange('text') }} className='rounded-none'>
          <TextIcon className="h-5 w-5"/>
        </Button>
      </div>
      <div className='flex border-l'>
        <Button variant='ghost' size='icon' className='rounded-none' disabled>
          <BrushIcon />
        </Button>
      </div>
      <div className='flex border-l'>
        <Button variant='ghost' size='icon' className='rounded-none' disabled>
          <DoubleArrowRightIcon/>
        </Button>
      </div>
      </div>
      </div>
    </Menubar>
  )
}
