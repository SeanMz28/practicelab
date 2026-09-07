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
      <DialogContent className="top-0 left-0 h-[100dvh] w-[100vw] max-w-none translate-x-0 translate-y-0 overflow-x-hidden overflow-y-auto overscroll-contain rounded-none border-0 p-0 sm:max-w-none lg:top-1/2 lg:left-1/2 lg:h-auto lg:max-h-[calc(100dvh-2rem)] lg:w-full lg:max-w-4xl lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-lg lg:border">
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
