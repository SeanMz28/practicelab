"use client"

import { Trophy } from "lucide-react"
import type { Id } from "@/convex/_generated/dataModel"
import { QuizLeaderboard } from "@/components/assessment/quiz-leaderboard"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface LeaderboardDialogProps {
  assessmentId: Id<"assessments">
  assessmentTitle: string
}

export function LeaderboardDialog({ assessmentId, assessmentTitle }: LeaderboardDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trophy className="h-4 w-4 text-amber-500" />
          View Leaderboard
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto p-0 sm:max-w-4xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{assessmentTitle} leaderboard</DialogTitle>
          <DialogDescription>
            Compare the latest scores and first attempts for this quiz.
          </DialogDescription>
        </DialogHeader>
        <QuizLeaderboard
          assessmentId={assessmentId}
          title={assessmentTitle}
          className="mb-0 border-0 shadow-none"
        />
      </DialogContent>
    </Dialog>
  )
}
