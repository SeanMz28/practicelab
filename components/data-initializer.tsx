"use client"

import { useEffect } from "react"
import { initializeLocalStorage } from "@/lib/init-data"

export function DataInitializer() {
  useEffect(() => {
    initializeLocalStorage()
  }, [])

  return null
}
