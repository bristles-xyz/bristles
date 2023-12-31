import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@bristles/ui/context/theme-provider'
import { Toaster } from '@bristles/ui/components/ui/toaster'
import { routes } from './features/app/routes'

export default function App (): JSX.Element {
  return (
      <ThemeProvider defaultTheme="system" storageKey="bristles-ui-theme">
        <RouterProvider router={routes} />
        <Toaster />
      </ThemeProvider>
  )
}
