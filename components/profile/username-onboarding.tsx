"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { AtSign, LoaderCircle } from "lucide-react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const USERNAME_PATTERN = /^[A-Za-z0-9_]{3,24}$/

function mutationErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "string"
  ) {
    return error.data
  }
  return error instanceof Error ? error.message : "Unable to save your username."
}

export function UsernameOnboarding() {
  const me = useQuery(api.users.me)
  const setUsername = useMutation(api.users.setUsername)
  const [username, setUsernameValue] = useState("")
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const needsUsername = me !== undefined && me !== null && !me.username

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const candidate = username.trim()
    if (!USERNAME_PATTERN.test(candidate)) {
      setError("Use 3–24 letters, numbers, or underscores.")
      return
    }

    setError("")
    setSaving(true)
    try {
      await setUsername({ username: candidate })
    } catch (err) {
      setError(mutationErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={needsUsername}>
      <DialogContent
        showCloseButton={false}
        className="overflow-hidden p-0 sm:max-w-md"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <div className="bg-gradient-to-br from-primary/15 via-primary/5 to-background px-6 pb-5 pt-7">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <AtSign className="h-6 w-6" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl">Choose your username</DialogTitle>
            <DialogDescription className="text-sm leading-6">
              This is the name other learners will see on quiz leaderboards. Your email stays private.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="username"
                value={username}
                onChange={(event) => {
                  setUsernameValue(event.target.value.replace(/\s/g, ""))
                  setError("")
                }}
                className="pl-9"
                placeholder="your_username"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                maxLength={24}
                autoFocus
                aria-invalid={Boolean(error)}
                aria-describedby="username-help username-error"
              />
            </div>
            <p id="username-help" className="text-xs text-muted-foreground">
              3–24 characters. Letters, numbers, and underscores only.
            </p>
            {error && (
              <p id="username-error" className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={saving || !username.trim()}>
              {saving && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              {saving ? "Saving username…" : "Continue"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
