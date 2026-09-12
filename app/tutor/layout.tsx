"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useConvexAuth, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth()
  const me = useQuery(api.users.me)

  useEffect(() => {
    if (isAuthLoading) return
    if (!isAuthenticated) {
      router.replace("/sign-in")
      return
    }
    if (me && me.role !== "tutor") {
      router.replace("/dashboard")
    }
  }, [isAuthenticated, isAuthLoading, me, router])

  if (isAuthLoading || !isAuthenticated || !me || me.role !== "tutor") {
    return null
  }

  return <>{children}</>
}
