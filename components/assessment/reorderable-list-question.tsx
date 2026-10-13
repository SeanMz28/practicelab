"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ReorderableListQuestionProps {
  questionId: string
  /** Every item that belongs in the list. Entries are checked against these for spelling, not position. */
  items: string[]
  /** The student's list, in the order they have arranged it. */
  value: string[]
  onChange: (value: string[]) => void
  placeholder: string
}

function normalizeItem(value: string) {
  return value.normalize("NFKC").toLocaleLowerCase("en").replace(/\s+/g, " ").trim()
}

/** The items not yet in the student's list, counting repeated items separately. */
function remainingItems(items: string[], value: string[]) {
  const remaining = [...items]
  for (const entry of value) {
    const index = remaining.findIndex((item) => normalizeItem(item) === normalizeItem(entry))
    if (index !== -1) remaining.splice(index, 1)
  }
  return remaining
}

export function ReorderableListQuestion({
  questionId,
  items,
  value,
  onChange,
  placeholder,
}: ReorderableListQuestionProps) {
  const [draft, setDraft] = useState("")
  const [error, setError] = useState("")
  const [announcement, setAnnouncement] = useState("")
  const listRef = useRef<HTMLOListElement>(null)
  const previousLength = useRef(value.length)
  const pendingFocusId = useRef<string | null>(null)
  const inputId = `ordered-${questionId}`
  const isFull = items.length > 0 && value.length >= items.length

  // Keep the newest item in view as the list grows.
  useEffect(() => {
    if (value.length > previousLength.current && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
    previousLength.current = value.length
  }, [value.length])

  // Move focus once the list has re-rendered, so it follows the item that was moved or removed.
  useEffect(() => {
    if (!pendingFocusId.current) return
    document.getElementById(pendingFocusId.current)?.focus()
    pendingFocusId.current = null
  })

  const add = (item: string) => {
    onChange([...value, item])
    setDraft("")
    setError("")
    setAnnouncement(`${item} added at position ${value.length + 1} of ${items.length}.`)
  }

  const handleDraftChange = (next: string) => {
    setDraft(next)
    setError("")
    const typed = normalizeItem(next)
    if (!typed) return
    const remaining = remainingItems(items, value)
    const match = remaining.find((item) => normalizeItem(item) === typed)
    // Wait for Enter while the entry could still become a longer item, e.g. "Mark" before "Market".
    const couldContinue = remaining.some((item) => {
      const normalized = normalizeItem(item)
      return normalized !== typed && normalized.startsWith(typed)
    })
    if (match && !couldContinue) add(match)
  }

  const handleEnter = () => {
    const typed = normalizeItem(draft)
    if (!typed) return
    const match = remainingItems(items, value).find((item) => normalizeItem(item) === typed)
    if (match) {
      add(match)
    } else if (value.some((item) => normalizeItem(item) === typed)) {
      setError("That item is already in your list.")
    } else {
      setError("Check the spelling. Only items that belong in this list are accepted.")
    }
  }

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= value.length) return
    const next = [...value]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
    setAnnouncement(`${value[index]} moved to position ${target + 1} of ${items.length}.`)
    // Keep focus on the arrow that was pressed. Once the item reaches the end of the list that
    // arrow is disabled, so focus the other one.
    const reachedEnd = direction === -1 ? target === 0 : target === next.length - 1
    let arrow: "up" | "down" = direction === -1 ? "up" : "down"
    if (reachedEnd) arrow = arrow === "up" ? "down" : "up"
    pendingFocusId.current = `${questionId}-item-${target}-${arrow}`
  }

  const remove = (index: number) => {
    onChange(value.filter((_, itemIndex) => itemIndex !== index))
    setAnnouncement(`${value[index]} removed.`)
    pendingFocusId.current = inputId
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Add every item, then use the arrows to put them in the right order.
        </p>
        <span className="text-sm tabular-nums text-muted-foreground">
          {value.length} of {items.length} added
        </span>
      </div>

      <ol
        ref={listRef}
        aria-label="Your list"
        className="max-h-80 space-y-2 overflow-y-auto rounded-lg border bg-muted/20 p-2 sm:max-h-96"
      >
        {value.length === 0 && (
          <li className="px-2 py-6 text-center text-sm text-muted-foreground">Items you add will appear here.</li>
        )}
        {value.map((item, index) => (
          <li key={index} className="flex min-h-11 items-center gap-2 rounded-md border bg-background py-1 pl-3 pr-1">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1 break-words font-medium">{item}</span>
            <Button
              id={`${questionId}-item-${index}-up`}
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={index === 0}
              onClick={() => move(index, -1)}
              aria-label={`Move ${item} up`}
            >
              <ChevronUp />
            </Button>
            <Button
              id={`${questionId}-item-${index}-down`}
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={index === value.length - 1}
              onClick={() => move(index, 1)}
              aria-label={`Move ${item} down`}
            >
              <ChevronDown />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => remove(index)}
              aria-label={`Remove ${item}`}
              className="text-muted-foreground"
            >
              <X />
            </Button>
          </li>
        ))}
      </ol>

      {isFull ? (
        <p className="rounded-md border bg-muted/30 p-4 text-sm">
          All {items.length} items are in your list. Check the order before you submit.
        </p>
      ) : (
        <div className="space-y-2">
          <Label htmlFor={inputId}>
            Item {value.length + 1} of {items.length}
          </Label>
          <Input
            id={inputId}
            value={draft}
            onChange={(event) => handleDraftChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                handleEnter()
              }
            }}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck={false}
            autoFocus
          />
          <p className="text-xs text-muted-foreground">
            An item is added as soon as it is spelled correctly, even if it is out of order.
          </p>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  )
}
