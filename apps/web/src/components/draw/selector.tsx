import { buttonVariants } from '@bristles/ui/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@bristles/ui/components/ui/popover'
import { BorderDashedIcon, BorderDottedIcon, BorderSolidIcon, BorderStyleIcon, CaretSortIcon, GroupIcon, PaddingIcon, TransparencyGridIcon } from '@radix-ui/react-icons'
import { AppRadioGroup2 } from '@bristles/ui/components/radio-group'
import { cn } from '@bristles/ui/lib/utils'
import { type ControlProps } from './hooks/use-drawing'

const colorsStyleOptions = [
  { label: 'Solid', value: 'red', icon: <span className="h-4 w-4 bg-red-500 rounded-sm border-white ring-1 ring-white hover:ring-1 hover:ring-white" /> },
  { label: 'Pattern', value: 'yellow', icon: <span className="h-4 w-4 bg-yellow-500 rounded-sm border-white ring-1 ring-white hover:ring-1 hover:ring-white" />},
  { label: 'None', value: 'blue', icon: <span className="h-4 w-4 bg-blue-500 rounded-sm border-white ring-1 ring-white hover:ring-1 hover:ring-white" /> },
  { label: 'None', value: 'green', icon: <span className="h-4 w-4 bg-green-500 rounded-sm border-white ring-1 ring-white hover:ring-1 hover:ring-white" /> }
]

const colorsStyleOptions2 = [
  { label: 'Solid', value: 'purple', icon: <span className="h-4 w-4 bg-purple-500 rounded-sm border-white ring-1 ring-white hover:ring-1 hover:ring-white" /> },
  { label: 'Pattern', value: 'gray', icon: <span className="h-4 w-4 bg-gray-500 rounded-sm border-white ring-1 ring-white hover:ring-1 hover:ring-white" />},
  { label: 'None', value: 'orange', icon: <span className="h-4 w-4 bg-orange-500 rounded-sm border-white ring-1 ring-white hover:ring-1 hover:ring-white" /> },
  { label: 'None', value: 'violet', icon: <span className="h-4 w-4 bg-violet-500 rounded-sm border-white ring-1 ring-white hover:ring-1 hover:ring-white" /> }
]

const sizeStyleOptions = [
  { label: 'Small', value: 'sm', icon: <span className="h-4 w-4 items-center"> S </span> },
  { label: 'Medium', value: 'md', icon: <span className="h-4 w-4"> M </span> },
  { label: 'Large', value: 'lg', icon: <span className="h-4 w-4"> L </span> },
  { label: 'X Large', value: 'xl', icon: <span className="h-4 w-4"> XL </span> }
]

const fillStyleOptions = [
  { label: 'Solid', value: 'Solid', icon: <span className="h-4 w-4 bg-black rounded-sm"/> },
  { label: 'Pattern', value: 'Semi1', icon: <PaddingIcon className="h-4 w-4" /> },
  { label: 'Pattern2', value: 'Semi2', icon: <GroupIcon className="h-4 w-4" /> },
  { label: 'None', value: 'None', icon: <TransparencyGridIcon className="h-4 w-4" /> }
]

const borderStyleOptions = [
  { label: 'Solid', value: 'Solid', icon: <BorderSolidIcon className="h-4 w-4"/> },
  { label: 'Dashed', value: 'Dashed', icon: <BorderDashedIcon className="h-4 w-4"/> },
  { label: 'Dotted', value: 'Dotted', icon: <BorderDottedIcon className="h-4 w-4" /> },
  { label: 'None', value: 'None', icon: <TransparencyGridIcon className="h-4 w-4" /> }
]


// https://www.svgrepo.com/svg/480279/paint-1
const PaintIcon = () => (
  <svg className='h-5 w-5 fill-current ill-red-500' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
    <g>
      <path d="M433.803,171.939c-2.142-3.556-4.324-7.127-6.72-10.714c-11.636-17.458-26.107-35.154-43.181-52.22   c-22.65-22.65-46.637-40.976-69.525-53.804c-11.483-6.366-22.728-11.482-33.503-15.015c-10.776-3.465-21.237-5.507-31.222-5.507   c-6.529,0-12.903,0.86-19.033,2.987c-6.06,2.043-11.882,5.507-16.598,10.223l-24.778,24.778l-13.087,13.088   c-34.372-8.011-66.86-13.318-94.749-13.349C65.039,72.421,50.17,74.21,37.19,78.834c-12.926,4.57-24.202,12.389-31.33,24.002   C2.043,108.98-0.023,115.97,0,122.913c0,7.396,2.227,14.502,5.791,20.984c6.298,11.352,16.544,21.352,29.617,30.976   c19.639,14.354,45.961,27.726,76.438,39.731c30.461,11.982,65.032,22.52,100.901,30.715L218,222.324v-0.008   c-52.997-12.09-103.166-29.579-139.312-48.542c-18.057-9.448-32.582-19.324-42.006-28.495c-4.716-4.57-8.126-8.941-10.208-12.75   c-2.104-3.833-2.872-6.967-2.88-9.617c0.031-2.511,0.606-4.816,2.35-7.696c3.848-6.183,9.839-10.784,19.187-14.163   c9.285-3.349,21.682-5.069,36.276-5.054c21.283-0.023,47.105,3.618,74.986,9.525l-13.311,13.31l-46.33,46.322   c9.516,4.638,19.977,9.125,31.068,13.449l78.734-78.735c2.888,14.532,9.202,30.124,18.265,46.414   c12.626,22.543,30.684,46.252,53.134,68.711c22.458,22.45,46.168,40.5,68.711,53.135c16.406,9.132,32.098,15.484,46.722,18.341   L240.996,438.465l0.868-0.944c-2.435,2.519-5.661,4.485-9.986,5.975c-4.247,1.498-9.601,2.366-15.891,2.366   c-14.078,0.077-32.558-4.562-51.99-14.078c-19.425-9.516-39.871-23.91-58.673-42.627c-18.948-18.956-33.58-39.878-43.335-59.779   c-9.831-19.901-14.623-38.849-14.547-53.166c0-6.214,0.86-11.406,2.282-15.577c1.413-4.162,3.302-7.235,5.66-9.593l30.361-30.361   c-10.776-4.716-20.845-9.594-29.97-14.547l-22.65,22.65c-6.137,6.137-10.461,13.61-13.211,21.706   c-2.758,8.104-3.932,16.675-3.932,25.723c0,20.837,6.367,43.726,17.773,67.006c11.406,23.28,27.996,46.798,49.394,68.19   c21.152,21.16,44.202,37.443,67.006,48.61c22.812,11.168,45.301,17.22,65.83,17.304c9.125,0,17.935-1.259,26.114-4.094   c8.18-2.75,15.807-7.235,22.02-13.448L405.093,319.2c-0.062,3.334-0.093,6.114-0.093,8.395c0,17.835-1.981,50.523,23.78,50.523   c7.027,0,17.834-4.953,17.834-29.716c0-15.231,15.853-10.038,15.853-0.998c0,13.879,0,18.18,0,26.744   c0,27.742,8.917,37.658,23.779,37.658c14.862,0,25.753-10.9,25.753-36.66c0-25.761,0-80.247,0-115.917   C512,227.816,478.443,186.425,433.803,171.939z M311.428,213.998c-5.638-4.923-11.26-10.146-16.79-15.684   c-21.037-21.038-37.858-43.227-49.225-63.557c-11.429-20.27-17.15-38.841-17.058-51.269c0-2.189,0.192-4.124,0.484-5.898   l7.443-7.443c1.183-1.098,2.519-2.042,4.638-2.75c2.128-0.791,5.039-1.259,8.734-1.259c5.66,0,13.056,1.175,21.467,4.009   c12.665,4.094,27.612,11.559,43.18,21.867c15.577,10.376,31.776,23.672,47.351,39.248c11.79,11.752,22.175,23.872,31.03,35.808   C365.738,169.397,337.434,183.014,311.428,213.998z"/>
      <path d="M244.806,258.231c9.409,0,17.036-7.626,17.036-17.036c0-9.417-7.627-17.043-17.036-17.043   c-9.417,0-17.044,7.626-17.044,17.043C227.762,250.605,235.389,258.231,244.806,258.231z"/>
    </g>
</svg>
)

const PaletteIcon = () => (
  <svg className='h-5 w-5 fill-current' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
    <g>
      <path d="M231.137,410.58c-37.33,0-71.105-10.204-96.871-28.027c-25.832-17.955-43.85-43.075-50.826-74.464   c-2.002-9.037-2.971-18.214-2.971-27.447c0-30.676,10.785-62.316,30.481-90.672c-8.524-6.136-16.53-13.754-23.571-22.729   c-24.669,34.031-39.136,73.36-39.2,113.401c0,11.498,1.227,22.994,3.746,34.359c8.653,39.65,32.095,72.136,63.934,94.09   c31.903,21.96,72.073,33.779,115.277,33.779c23.506,0,47.982-3.488,72.588-10.848l-21.31-27.643   C264.913,408.58,247.671,410.58,231.137,410.58z"/>
      <path d="M452.068,133.078c-15.824-23.638-38.298-41.852-64.647-54.055c-26.412-12.21-56.637-18.473-88.41-18.536   c-24.54,0-50.05,3.746-75.558,11.56c-10.788,3.292-21.184,7.17-31.193,11.686c0.129,0.196,0.258,0.328,0.388,0.517   c6.328,8.912,11.431,18.34,15.048,27.838c8.072-3.488,16.467-6.528,25.12-9.17c22.54-6.849,44.885-10.142,66.195-10.142   c27.576,0,53.216,5.487,74.785,15.565c21.698,10.009,39.265,24.476,51.406,42.684c4.585,6.849,6.329,12.79,6.329,17.312   c-0.063,2.97-0.646,5.424-2.194,8.136c-1.164,2-2.907,4.2-5.62,6.395c-4.005,3.356-10.204,6.906-19.05,9.814   c-8.785,2.908-20.15,5.234-34.163,6.458c-16.792,1.425-30.805,7.555-40.558,17.242c-9.75,9.561-14.723,22.414-14.723,34.939   c0,13.755,5.812,27.384,16.533,37.329c10.655,10.009,26.091,16.013,43.914,15.95c1.097,0,2.194,0,3.358-0.062h0.129   c1.034-0.064,2.132-0.064,3.163-0.064c6.587,0,11.431,0.839,14.855,2c5.102,1.747,7.105,3.746,8.46,5.682   c1.29,1.936,2.066,4.522,2.066,7.624c0,2.384-0.451,4.907-1.227,6.969c-0.709,2.132-1.744,3.746-2.132,4.2   c-10.525,12.204-22.732,23.574-36.424,33.647l17.889,26.866c16.082-11.623,30.484-24.993,43.012-39.461   c3.68-4.326,6.266-9.233,8.202-14.594c1.807-5.423,2.97-11.302,2.97-17.627c0-5.493-0.905-11.371-3.1-17.116   c-3.292-8.652-9.946-16.984-19.438-22.344c-9.495-5.487-21.184-8.136-35.134-8.136c-1.486,0-3.034,0.063-4.714,0.126h-1.936   c-10.913-0.062-17.63-3.355-21.893-7.296c-4.26-4.006-6.2-8.975-6.263-13.692c0.063-4.326,1.549-8.394,5.165-12.008   c3.617-3.557,9.817-7.045,20.667-8.01c28.349-2.522,49.792-8.848,65.483-19.374c7.817-5.297,14.146-11.756,18.472-19.311   c4.39-7.492,6.521-15.95,6.521-24.281C463.82,155.744,459.235,143.799,452.068,133.078z"/>
      <path d="M393.485,176.72c5.291-5.298,8.325-12.607,8.325-20.093c0-7.486-3.034-14.802-8.325-20.1   c-5.298-5.285-12.608-8.318-20.093-8.318c-7.486,0-14.802,3.033-20.094,8.318c-5.291,5.298-8.324,12.613-8.324,20.1   c0,7.486,3.033,14.795,8.324,20.093c5.292,5.291,12.608,8.324,20.094,8.324C380.877,185.045,388.187,182.012,393.485,176.72z"/>
      <path d="M159.79,245.262c4.27-12.859-2.699-26.747-15.565-31.023c-12.859-4.27-26.747,2.692-31.022,15.558   c-4.27,12.859,2.699,26.747,15.565,31.029C141.62,265.09,155.514,258.128,159.79,245.262z"/>
      <path d="M160.137,342.631c8.823-9.327,8.413-24.041-0.908-32.864c-9.328-8.829-24.041-8.419-32.864,0.909   c-8.83,9.321-8.426,24.035,0.902,32.864C136.587,352.362,151.307,351.952,160.137,342.631z"/>
      <path d="M281.932,162.915c14.877-1.728,25.542-15.193,23.808-30.071c-1.728-14.878-15.193-25.536-30.071-23.808   c-14.884,1.728-25.542,15.187-23.808,30.071C253.589,153.985,267.048,164.649,281.932,162.915z"/>
      <path d="M99.435,151.078c15.133,21.096,36.721,35.172,56.348,36.762l0.823,0.075l36.85-26.438l0.195-0.801   c4.774-19.103-1.646-44.071-16.772-65.155c-14.357-20.004-31.076-33.728-47.253-47.01c-11.037-9.056-22.459-18.434-33.117-29.78   C87.685,9.334,84.715,4.692,84.705,4.68L81.845,0l-2.4,2.826c-11.14,13.156-15.593,36.869-12.238,65.048   C70.723,97.464,82.179,127.024,99.435,151.078z M107.649,116.056c12.018,13.598,17.631,4.692,10.4-9.17   c-9.079-17.388,0.097-18.012,5.682-12.601c5.566,5.392,12.541,17.476,18.548,14.014c3.61-2.081-0.268-9.568-5.38-20.913   c-2.933-6.496-0.4-16.24,14.701-3.236c5.515,5.544,10.747,11.523,15.619,18.309c10.563,14.707,15.564,32.428,13.121,46.329   l-31.55,22.642c-13.963-2.132-29.121-12.551-39.697-27.284c-4.049-5.651-7.761-11.768-11.078-18.201   c-0.356-0.921-0.763-1.904-1.236-2.946C91.51,111.402,95.632,102.472,107.649,116.056z"/>
      <path d="M215.431,183.86c-7.707-3.147-15.038-2.794-20.266,0.952l-16.993,12.197   c-5.235,3.746-7.909,10.589-7.408,18.888c0.511,8.306,4.156,17.363,10.078,25.05l26.851,34.813l52.614-37.746l-24.375-36.579   C230.551,193.351,223.137,187.007,215.431,183.86z"/>
      <path d="M268.971,251.026l-51.722,37.103l160.229,207.73c11.109,14.411,27.509,20.182,37.323,13.156l0.116-0.101   c9.807-7.032,9.586-24.42-0.501-39.562L268.971,251.026z"/>
    </g>
  </svg>
)

interface StyleSelectorProps {
  selection: ControlProps['selection']
}
export function FillSelector (props: StyleSelectorProps) {
  const { properties, onUpdateProperties } = props.selection
  const defaultFillProperties = properties?.fill ?? {}
  const defaultStrokeProperties = properties?.stroke ?? {}
  const setColor = (color: string) => {
    onUpdateProperties({ ...properties, color })
  }
  const setFillStyle = (style: string) => {
    if (style === 'Solid' || style === 'Semi1' || style === 'Semi2' || style === 'None') {
      onUpdateProperties({ ...properties, fill: { ...defaultFillProperties, style } })
    }
  }
  const setStrokeStyle = (style: string) => {
    if (style === 'Solid' || style === 'Dashed' || style === 'Dotted' || style === 'None') {
      onUpdateProperties({ ...properties, stroke: { width: 1, ...defaultStrokeProperties, style } })
    }
  }
  return (
    <Popover>
      <PopoverTrigger >
        <div className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'rounded-none')}>
          <PaletteIcon />
          <CaretSortIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className="mt-2 p-2 w-50 rounded-none" align='center'>
        <div className="flex justify-between space-x-4 items-center">
          <div className='flex flex-col gap-2'>
            <div className='items-center'>
              <div className='order w-full  mb-1 pb-1'>
                <div className="logo-text underline flex items-center justify-between border-b pb-1 mb-1">Colors <PaintIcon /></div>
                <AppRadioGroup2 options={colorsStyleOptions} selected='hachure' onChange={setColor}/>
                <AppRadioGroup2 options={colorsStyleOptions2} selected='hachure' onChange={setColor}/>
              </div>
              <div className='order w-full'>
              <div className="logo-text underline flex items-center justify-between border-b pb-1 mb-1">Fill / Stroke <BorderStyleIcon /></div>
                <AppRadioGroup2 options={fillStyleOptions} selected='hachure' onChange={setFillStyle}/>
              </div>
              <div className='order w-full mt-2'>
                <AppRadioGroup2 options={borderStyleOptions} selected='hachure' onChange={setStrokeStyle}/>
              </div>
              <div className='order w-full mt-2'>
                <AppRadioGroup2 options={sizeStyleOptions} selected='hachure' onChange={setStrokeStyle}/>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
