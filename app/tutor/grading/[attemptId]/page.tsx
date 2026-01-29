import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GradingInterface } from "@/components/tutor/grading-interface"

interface GradingPageProps {
  params: Promise<{
    attemptId: string
  }>
}

export default async function GradingPage({ params }: GradingPageProps) {
  const { attemptId } = await params

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <GradingInterface attemptId={attemptId} />
    </div>
  )
}
