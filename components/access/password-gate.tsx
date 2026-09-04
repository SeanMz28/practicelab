"use client"

import type { FormEvent, ReactNode } from "react"
import { useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { LockKeyhole } from "lucide-react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PasswordGateProps {
  resourceType: "course" | "assessment"
  resourceId: string
  title: string
  children: ReactNode
}

export function PasswordGate({ resourceType, resourceId, title, children }: PasswordGateProps) {
  const access = useQuery(api.access.status, { resourceType, resourceId })
  const unlock = useMutation(api.access.unlock)
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to unlock this content")
    } finally {
      setSubmitting(false)
    }
  }

  if (access === undefined) {
    return <p className="text-muted-foreground">Checking access…</p>
  }
  if (access.unlocked) return <>{children}</>

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <CardTitle>Password required</CardTitle>
          <CardDescription>Enter the password provided by your tutor to access {title}.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${resourceType}-${resourceId}-password`}>Password</Label>
              <Input
                id={`${resourceType}-${resourceId}-password`}
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
        </CardContent>
      </Card>
    </div>
  )
}
