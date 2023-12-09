import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { CheckIcon } from "@radix-ui/react-icons"

const colors = [
  {
    color: 'rose',
    key: 'rose',
    active: true
  },
  {
    color: 'red',
    key: 'red',
    active: false
  },  
  {
    color: 'orange',
    key: 'orange',
    active: false
  }
]
export function ColorSelector () {

  return (
    <TooltipProvider>

    <div className="mr-2 hidden items-center space-x-0.5 lg:flex">
      {colors.map((color) => {
        return (
          <Tooltip key={color.key}>
            <TooltipTrigger asChild>
              <button
                onClick={() => console.log('button') }
                className={cn("flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs",
                          color.active
                            ? "border-[--theme-primary]"
                            : "border-transparent"
                )}
                style={{
                        "--theme-primary": `hsl(20 14.3% 4.1%)`,
                } as React.CSSProperties }
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full bg-[--theme-primary]"
                  )}
                >
                  {color.active && (
                    <CheckIcon className="h-4 w-4 text-white" />
                  )}
                </span>
                <span className="sr-only">{color.color}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent
              align="center"
              className="rounded-[0.5rem] bg-zinc-900 text-zinc-50"
            >
              {color.color}
            </TooltipContent>
          </Tooltip>
        )
      })}
    </div>
          
    </TooltipProvider>
  )
}