import { Button } from '@/components/ui/button'

interface OptionDataProps {
  value: string
  label: string
  icon: JSX.Element
}

interface AppRadioGroupProps {
  options: OptionDataProps[]
  onChange: (value: string) => void
  selected: string
}

export function AppRadioGroup (props: AppRadioGroupProps) {
  const { options, onChange, selected } = props
  const len = options.length

  return (
    <div className='flex items-center w-full'>
      {options.map((option, index) => (
        <div key={option.value} className={`flex ${selected === option.value ? 'border-b border-b-primary border-b-1 box-content' : ''} ${index !== len - 1 ? 'border-r' : ''}`}>
          <Button variant='ghost' size='icon' className='rounded-none' onClick={() => { onChange(option.value) }}>
            {option.icon}
          </Button>
        </div>
      ))}
    </div>
  )
}

export function AppRadioGroup2 (props: AppRadioGroupProps) {
  const { options, onChange, selected } = props
  const buttonClass = (value: string) => `${selected === value ? 'bg-accent text-accent-foreground' : ''}`

  return (
    <div className='flex items-center w-full'>
      {options.map((option) => (
        <div key={option.value} className='flex'>
          <Button variant='ghost' size='icon' className={`rounded-none ${buttonClass(option.value)}`} onClick={() => { onChange(option.value) }}>
            {option.icon}
          </Button>
        </div>
      ))}
    </div>
  )
}
