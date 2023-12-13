import { ModeToggle } from '@bristles/ui/components/mode-toggle'

export function AppAboutPage () {
  return (
    <div className="container mx-auto min-h-screen">
      <div className="w-full px-6 py-12 shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28">
        <ModeToggle />
        <article className="prose lg:prose-xl dark:prose-invert">

        </article>
      </div>
    </div>
  )
}
