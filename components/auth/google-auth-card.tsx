"use client"

import { useState } from "react"
import { LoaderCircle } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface GoogleAuthCardProps {
  title: string
  description: string
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.32 2.98-7.4Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.98-.9 6.63-2.37l-3.25-2.54c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.61A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.92A6.02 6.02 0 0 1 6.07 12c0-.67.12-1.32.32-1.92V7.47H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.53l3.35-2.61Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.95c1.47 0 2.79.51 3.83 1.5l2.87-2.88A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.47l3.35 2.61C7.18 7.71 9.39 5.95 12 5.95Z"
      />
    </svg>
  )
}

export function GoogleAuthCard({ title, description }: GoogleAuthCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogle = async () => {
    setError(null)
    setIsLoading(true)
    const { error: authError } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    })
    if (authError) {
      setError(authError.message ?? "Google sign-in failed")
      setIsLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-400" />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full bg-background"
          onClick={handleGoogle}
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <GoogleIcon />}
          {isLoading ? "Connecting to Google…" : "Continue with Google"}
        </Button>
        {error && <p className="text-center text-sm text-destructive">{error}</p>}
        <p className="text-center text-xs leading-5 text-muted-foreground">
          Email and password sign-in is temporarily unavailable.
        </p>
      </CardContent>
    </Card>
  )
}
