"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { useMutation } from "convex/react"
import { LockKeyhole } from "lucide-react"
import type { ProtectedResourceType } from "@/convex/access"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UnlockDialogProps {
  resourceType: ProtectedResourceType
  resourceId: string
  title: string
  triggerLabel?: string
}

export function UnlockDialog({
  resourceType,
  resourceId,
  title,
  triggerLabel = "Unlock",
}: UnlockDialogProps) {
  const unlock = useMutation(api.access.unlock)
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      await unlock({ resourceType, resourceId, password })
      setPassword("")
      setOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to unlock this content")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) {
          setPassword("")
          setError("")
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <LockKeyhole className="h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-700 sm:mx-0">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <DialogTitle>Unlock {title}</DialogTitle>
          <DialogDescription>Enter the password provided by your tutor to access this content.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`unlock-${resourceType}-${resourceId}`}>Password</Label>
            <Input
              id={`unlock-${resourceType}-${resourceId}`}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={!password || submitting}>
            {submitting ? "Unlocking…" : "Unlock"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
