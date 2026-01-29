import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GradesOverview } from "@/components/grades/grades-overview"
import { GradesList } from "@/components/grades/grades-list"

export default function GradesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Grades</h1>
          <p className="text-muted-foreground">Track your assessment performance and academic progress</p>
        </div>

        <GradesOverview />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Assessment History</h2>
          <GradesList />
        </div>
      </main>
    </div>
  )
}
