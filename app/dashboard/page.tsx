import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CourseGrid } from "@/components/courses/course-grid"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your learning overview.</p>
        </div>

        <StatsCards />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
            <CourseGrid />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  )
}
