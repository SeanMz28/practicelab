"use client"

import { dummyCourses, dummyNotes, dummyAssessments, dummyAssessmentAttempts } from "./dummy-data"

export function initializeLocalStorage() {
  // Only run on client side
  if (typeof window === "undefined") return

  // Check if data already exists
  const hasData = localStorage.getItem("dataInitialized")

  if (!hasData) {
    // Initialize with dummy data
    localStorage.setItem("courses", JSON.stringify(dummyCourses))
    localStorage.setItem("notes", JSON.stringify(dummyNotes))
    localStorage.setItem("assessments", JSON.stringify(dummyAssessments))
    localStorage.setItem("assessmentAttempts", JSON.stringify(dummyAssessmentAttempts))
    localStorage.setItem("resources", JSON.stringify([]))
    
    // Mark as initialized
    localStorage.setItem("dataInitialized", "true")
    
    console.log("✅ Dummy data initialized in localStorage")
  }
}
