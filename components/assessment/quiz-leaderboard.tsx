"use client"

import { useQuery } from "convex/react"
import { Medal, Trophy } from "lucide-react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LeaderboardLoading } from "@/components/loading/loading-states"
import { cn } from "@/lib/utils"

interface QuizLeaderboardProps {
  assessmentId: Id<"assessments">
  title?: string
  className?: string
}

export function QuizLeaderboard({ assessmentId, title, className }: QuizLeaderboardProps) {
  const latest = useQuery(api.attempts.leaderboard, { assessmentId, mode: "latest" })
  const first = useQuery(api.attempts.leaderboard, { assessmentId, mode: "first" })

  return (
    <Card className={cn("mb-8 min-w-0", className)}>
      <CardHeader className="min-w-0 px-4 pr-12 sm:px-6 sm:pr-6">
        <CardTitle className="flex min-w-0 items-start gap-2 leading-snug">
          <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <span className="min-w-0 break-words">
            {title ? `${title} leaderboard` : "Quiz leaderboard"}
          </span>
        </CardTitle>
        <CardDescription>One ranked result per student. Pending grades appear after scored attempts.</CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 px-4 sm:px-6">
        <Tabs defaultValue="latest" className="min-w-0">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="latest">Latest scores</TabsTrigger>
            <TabsTrigger value="first">First attempts</TabsTrigger>
          </TabsList>
          <TabsContent value="latest" className="min-w-0 pt-4">
            <LeaderboardTable rows={latest} mode="latest" />
          </TabsContent>
          <TabsContent value="first" className="min-w-0 pt-4">
            <LeaderboardTable rows={first} mode="first" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

type LeaderboardRows =
  | Array<{
      name: string
      score: number | null
      status: "submitted" | "graded" | "pending"
      completedAt: string
      attemptNumber: number
      isCurrentUser: boolean
      rank: number
    }>
  | undefined

function LeaderboardTable({ rows, mode }: { rows: LeaderboardRows; mode: "latest" | "first" }) {
  if (rows === undefined) return <LeaderboardLoading />
  if (rows.length === 0) return <p className="py-6 text-center text-sm text-muted-foreground">No attempts yet.</p>

  return (
    <>
      <div className="divide-y rounded-lg border md:hidden" role="list" aria-label="Leaderboard rankings">
        {rows.map((row) => (
          <div
            key={`${row.name}-${row.completedAt}`}
            className={cn(
              "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 p-3",
              row.isCurrentUser && "bg-primary/5",
            )}
            role="listitem"
          >
            <span className="flex min-w-8 items-center gap-1 font-semibold" aria-label={`Rank ${row.rank}`}>
              {row.rank <= 3 && row.score !== null && <Medal className="h-4 w-4 shrink-0 text-amber-500" />}
              {row.rank}
            </span>
            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                <span className="min-w-0 break-words font-medium">{row.name}</span>
                {row.isCurrentUser && <Badge variant="secondary">You</Badge>}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {mode === "latest" ? "Latest" : "First"} attempt #{row.attemptNumber}
                <span aria-hidden="true"> · </span>
                {new Date(row.completedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right font-semibold">
              {row.score === null ? <Badge variant="secondary">Pending</Badge> : `${row.score}%`}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>{mode === "latest" ? "Latest attempt" : "First attempt"}</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={`${row.name}-${row.completedAt}`}
                className={row.isCurrentUser ? "bg-primary/5" : undefined}
              >
                <TableCell className="font-semibold">
                  <span className="flex items-center gap-1">
                    {row.rank <= 3 && row.score !== null && <Medal className="h-4 w-4 text-amber-500" />}
                    {row.rank}
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  {row.name} {row.isCurrentUser && <Badge variant="secondary">You</Badge>}
                </TableCell>
                <TableCell>#{row.attemptNumber}</TableCell>
                <TableCell>{new Date(row.completedAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right font-semibold">
                  {row.score === null ? <Badge variant="secondary">Pending</Badge> : `${row.score}%`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
