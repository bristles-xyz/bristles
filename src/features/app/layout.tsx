import { Outlet } from 'react-router-dom'

export function AppLayout () {
  return (
    <div className="h-full w-full bg-slate-50 dark:bg-background">
      <div className="flex min-h-screen flex-col ">
        <main className="flex-1 border-b">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
