import { BookOpen, ClipboardList, FileText, LoaderCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-md bg-muted", className)} />
}

function LoadingLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground" role="status">
      <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
      <span>{children}</span>
    </div>
  )
}

export function CourseGridLoading() {
  return (
    <div className="space-y-4" role="status" aria-label="Loading courses">
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-9 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <span className="sr-only">Loading courses…</span>
    </div>
  )
}

export function CoursePageLoading() {
  return (
    <div role="status" aria-label="Loading course">
      <div className="border-b bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-start gap-4">
            <Skeleton className="h-14 w-14 shrink-0 rounded-2xl" />
            <div className="w-full max-w-xl space-y-3">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto space-y-6 px-4 py-8">
        <LoadingLabel>Preparing your course…</LoadingLabel>
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function NotePageLoading() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading note">
      <Skeleton className="h-9 w-36" />
      <Card>
        <CardHeader className="space-y-3 border-b">
          <div className="flex items-center gap-3 text-muted-foreground">
            <FileText className="h-5 w-5 text-primary" />
            <LoadingLabel>Opening your notes…</LoadingLabel>
          </div>
          <Skeleton className="h-8 w-3/5" />
          <Skeleton className="h-4 w-44" />
        </CardHeader>
        <CardContent className="space-y-4 pt-7">
          <Skeleton className="h-5 w-2/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="mt-7 h-5 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </CardContent>
      </Card>
    </div>
  )
}

export function AssessmentPageLoading() {
  return (
    <main className="container mx-auto max-w-4xl space-y-6 px-4 py-8" role="status" aria-label="Loading assessment">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <ClipboardList className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-2">
          <LoadingLabel>Preparing your assessment…</LoadingLabel>
          <Skeleton className="h-3 w-52" />
        </div>
      </div>
      <Card>
        <CardHeader className="space-y-3 border-b">
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="h-4 w-4/5" />
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-3 rounded-xl border p-4">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  )
}

export function ResultsPageLoading() {
  return (
    <main className="container mx-auto max-w-4xl space-y-6 px-4 py-8" role="status" aria-label="Loading results">
      <Card>
        <CardContent className="space-y-6 py-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-7 w-7 animate-pulse text-primary" />
          </div>
          <div className="mx-auto max-w-md space-y-3">
            <div className="flex justify-center">
              <LoadingLabel>Calculating your results…</LoadingLabel>
            </div>
            <Skeleton className="mx-auto h-7 w-2/3" />
            <Skeleton className="mx-auto h-4 w-full" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-24 rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export function ResourcePageLoading() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading resources">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <LoadingLabel>Gathering course resources…</LoadingLabel>
          <Skeleton className="h-7 w-56" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-24 w-full rounded-xl" />
      ))}
    </div>
  )
}

export function InlineLoading({ label }: { label: string }) {
  return (
    <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed bg-muted/20 p-6">
      <LoadingLabel>{label}</LoadingLabel>
    </div>
  )
}

export function LeaderboardLoading() {
  return (
    <div className="space-y-3 py-4" role="status" aria-label="Loading leaderboard">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 rounded-lg border p-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
      <span className="sr-only">Loading leaderboard…</span>
    </div>
  )
}
