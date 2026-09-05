"use client"

import { GoogleAuthCard } from "@/components/auth/google-auth-card"

export function SignInForm() {
  return (
    <GoogleAuthCard
      title="Sign in with Google"
      description="Use your Google account to securely continue to Practice Lab."
    />
  )
}
