import {
  createBrowserRouter, isRouteErrorResponse, useRouteError
} from 'react-router-dom'
import { AppLayout } from './layout'
import { AppMainPage } from '@bristles/web/features/app/pages/home/main'
import { AppAboutPage } from './pages/about'
import { isDevMode } from '@bristles/web/config/const'

export function ErrorPage (): JSX.Element {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops ....!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{isRouteErrorResponse(error) && (error.statusText)}</i>
      </p>
    </div>
  )
}

export const routes = createBrowserRouter([
  {
    path: isDevMode ? '/bristles' : '/bristles',
    errorElement: <ErrorPage />,
    element: <AppLayout />,
    children: [{
      index: true,
      element: <AppMainPage />
    }, {
      path: 'about',
      element: <AppAboutPage />
    }]
  }
])
