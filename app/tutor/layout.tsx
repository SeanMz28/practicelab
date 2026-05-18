"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const me = useQuery(api.users.me)

  useEffect(() => {
    if (me === undefined) return
    if (me === null) {
      router.replace("/sign-in")
      return
    }
    if (me.role !== "tutor") {
      router.replace("/dashboard")
    }
  }, [me, router])

  if (me === undefined || me === null || me.role !== "tutor") {
    return null
  }

  return <>{children}</>
}
