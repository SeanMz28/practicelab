"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GraduationCap, LogOut, ClipboardCheck } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export function DashboardHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<{ name: string; email: string; role?: string } | null>(null)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (!parsedUser.role) {
        parsedUser.role = "student"
        localStorage.setItem("user", JSON.stringify(parsedUser))
      }
      setUser(parsedUser)
    } else {
      router.push("/sign-in")
    }

    const attempts = JSON.parse(localStorage.getItem("assessmentAttempts") || "[]")
    const pending = attempts.filter((a: any) => a.status === "pending")
    setPendingCount(pending.length)
  }, [router, pathname])

  const handleSignOut = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleToggleRole = () => {
    if (user) {
      const newRole = user.role === "tutor" ? "student" : "tutor"
      const updatedUser = { ...user, role: newRole }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
      router.push(newRole === "tutor" ? "/tutor/grading" : "/dashboard")
    }
  }

  if (!user) return null

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const isTutor = user.role === "tutor"

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={isTutor ? "/tutor/grading" : "/dashboard"} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Practise Lab</span>
        </Link>

        <nav className="flex items-center gap-4">
          {isTutor ? (
            <>
              <Link href="/tutor/courses">
                <Button variant={pathname.startsWith("/tutor/courses") ? "default" : "ghost"}>Courses</Button>
              </Link>
              <Link href="/tutor/grading">
                <Button variant={pathname.startsWith("/tutor/grading") ? "default" : "ghost"} className="relative">
                  <ClipboardCheck className="w-4 h-4 mr-2" />
                  Grading
                  {pendingCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="ml-2 px-1.5 py-0 h-5 min-w-5 flex items-center justify-center"
                    >
                      {pendingCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link href="/tutor/students">
                <Button variant={pathname.startsWith("/tutor/students") ? "default" : "ghost"}>Students</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <Button variant={pathname === "/dashboard" ? "default" : "ghost"}>Dashboard</Button>
              </Link>
              <Link href="/grades">
                <Button variant={pathname === "/grades" ? "default" : "ghost"}>Grades</Button>
              </Link>
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <Badge variant="outline" className="w-fit mt-1">
                    {isTutor ? "Tutor" : "Student"}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleToggleRole}>
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Switch to {isTutor ? "Student" : "Tutor"} View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
