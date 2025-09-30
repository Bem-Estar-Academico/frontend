import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" w-full h-full flex items-center justify-center">
        Home
      </div>
    </div>
  )
}
