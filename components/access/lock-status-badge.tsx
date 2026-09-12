import { LockKeyhole } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface LockStatusBadgeProps {
  locked: boolean
  className?: string
  label?: string
}

export function LockStatusBadge({ locked, className, label = "Locked" }: LockStatusBadgeProps) {
  if (!locked) return null

  return (
    <Badge
      variant="outline"
      className={cn("gap-1 border-amber-300 bg-amber-50 text-amber-800", className)}
      title={label}
    >
      <LockKeyhole className="h-3 w-3" />
      {label}
    </Badge>
  )
}
