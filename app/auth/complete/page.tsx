"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { LoaderCircle } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthCompletePage() {
  const { data: session, isPending, isRefetching, refetch } = authClient.useSession()
  const retried = useRef(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (isPending || isRefetching) return

    if (session?.session) {
      // Start a fresh request after the OAuth cookie is available so the root
      // provider receives an authenticated token on its first render.
      window.location.replace("/dashboard")
      return
    }

    if (!retried.current) {
      retried.current = true
      const retry = window.setTimeout(() => {
        void refetch()
      }, 400)
      return () => window.clearTimeout(retry)
    }

    setFailed(true)
  }, [isPending, isRefetching, refetch, session])

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>{failed ? "Sign-in could not be completed" : "Finishing sign-in"}</CardTitle>
          <CardDescription>
            {failed
              ? "The Google session was not available. Please try signing in again."
              : "Your Google account is connected. This should only take a moment."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {failed ? (
            <Button asChild>
              <Link href="/sign-in">Return to sign in</Link>
            </Button>
          ) : (
            <LoaderCircle className="mx-auto h-7 w-7 animate-spin text-primary" aria-label="Finishing sign-in" />
          )}
        </CardContent>
      </Card>
    </main>
  )
}
