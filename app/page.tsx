import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, GraduationCap, FileText, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Practise Lab</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Learn, Practice, Excel</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Your comprehensive platform for course notes, interactive quizzes, and tracking your academic progress.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Start Learning
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Succeed</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Course Notes</h3>
              <p className="text-sm text-muted-foreground">
                Access organized notes with markdown support for all your courses
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Quizzes</h3>
              <p className="text-sm text-muted-foreground">Test your knowledge with quizzes and get instant feedback</p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Grade Tracking</h3>
              <p className="text-sm text-muted-foreground">Monitor your progress and track grades across all courses</p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Detailed Reviews</h3>
              <p className="text-sm text-muted-foreground">Review your quiz answers and learn from your mistakes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Practise Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
