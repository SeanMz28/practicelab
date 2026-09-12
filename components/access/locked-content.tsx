import Link from "next/link"
import { LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LockedContentProps {
  title?: string
  backHref?: string
}

export function LockedContent({ title = "This content is locked", backHref = "/dashboard" }: LockedContentProps) {
  return (
    <div className="container mx-auto max-w-xl px-4 py-12">
      <Card>
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your tutor has not made this available to students yet.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href={backHref}>Go back</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
