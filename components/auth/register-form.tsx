"use client"

import { GoogleAuthCard } from "@/components/auth/google-auth-card"

export function RegisterForm() {
  return (
    <GoogleAuthCard
      title="Create your account"
      description="Continue with Google, then choose the username you want shown on leaderboards."
    />
  )
}
