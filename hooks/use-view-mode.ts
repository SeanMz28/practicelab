"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "practicelab:viewMode"
const EVENT = "practicelab:viewModeChange"

export type ViewMode = "tutor" | "student"

export function useViewMode(isTutor: boolean): [ViewMode, (mode: ViewMode) => void] {
  const [mode, setMode] = useState<ViewMode>("tutor")

  useEffect(() => {
    if (!isTutor) {
      setMode("student")
      return
    }
    const stored = (typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY)) as ViewMode | null
    setMode(stored === "student" ? "student" : "tutor")

    const onChange = (e: Event) => {
      const next = (e as CustomEvent<ViewMode>).detail
      setMode(next === "student" ? "student" : "tutor")
    }
    window.addEventListener(EVENT, onChange)
    return () => window.removeEventListener(EVENT, onChange)
  }, [isTutor])

  const update = useCallback(
    (next: ViewMode) => {
      if (!isTutor) return
      window.localStorage.setItem(STORAGE_KEY, next)
      window.dispatchEvent(new CustomEvent<ViewMode>(EVENT, { detail: next }))
    },
    [isTutor],
  )

  return [mode, update]
}
