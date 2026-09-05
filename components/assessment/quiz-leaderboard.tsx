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

interface QuizLeaderboardProps {
  assessmentId: Id<"assessments">
}

export function QuizLeaderboard({ assessmentId }: QuizLeaderboardProps) {
  const latest = useQuery(api.attempts.leaderboard, { assessmentId, mode: "latest" })
  const first = useQuery(api.attempts.leaderboard, { assessmentId, mode: "first" })

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          Quiz leaderboard
        </CardTitle>
        <CardDescription>One ranked result per student. Pending grades appear after scored attempts.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="latest">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="latest">Latest scores</TabsTrigger>
            <TabsTrigger value="first">First attempts</TabsTrigger>
          </TabsList>
          <TabsContent value="latest" className="pt-4">
            <LeaderboardTable rows={latest} mode="latest" />
          </TabsContent>
          <TabsContent value="first" className="pt-4">
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
          <TableRow key={`${row.name}-${row.completedAt}`} className={row.isCurrentUser ? "bg-primary/5" : undefined}>
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
  )
}
