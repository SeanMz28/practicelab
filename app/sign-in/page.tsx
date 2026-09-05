import Link from "next/link"
import { SignInForm } from "@/components/auth/sign-in-form"
import { GraduationCap } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">Practice Lab</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in or create an account with Google</p>
        </div>

        <SignInForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          {"New to Practice Lab? "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Get started
          </Link>
        </p>
      </div>
    </div>
  )
}
