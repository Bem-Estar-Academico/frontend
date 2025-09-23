import { createFileRoute } from '@tanstack/react-router'
import { StudentDataTable } from '@/components/student-table'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" w-full h-full flex items-center justify-center">
        <StudentDataTable />
      </div>
    </div>
  )
}
