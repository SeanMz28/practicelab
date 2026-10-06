"use client"

import type React from "react"

import { useRef, useState } from "react"
import { GripVertical, X } from "lucide-react"
import { cn } from "@/lib/utils"

const DRAG_THRESHOLD_PX = 5

type DropTarget = { kind: "field"; index: number } | { kind: "bank" }

interface DragState {
  optionIndex: number
  x: number
  y: number
  width: number
  target: DropTarget | null
}

interface MatchingQuestionProps {
  prompts: string[]
  options: string[]
  /** Display order of the answer bank (indices into `options`). */
  optionOrder: number[]
  /** For each prompt, the index of the placed option, or -1 when the field is empty. */
  value: number[]
  onChange: (value: number[]) => void
}

function dropTargetAt(x: number, y: number): DropTarget | null {
  const element = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-drop-target]")
  if (!element) return null
  if (element.dataset.dropTarget === "bank") return { kind: "bank" }
  return { kind: "field", index: Number(element.dataset.dropTarget) }
}

function isSameTarget(a: DropTarget | null, b: DropTarget) {
  return a?.kind === b.kind && (a.kind === "bank" || (b.kind === "field" && a.index === b.index))
}

/**
 * Taps are handled on pointerup rather than click: on touch devices Chrome drops the click for a tap
 * made shortly after a non-scrolling drag. Keyboard activation still arrives as a click with
 * `detail === 0`.
 */
function useTap(onTap: () => void) {
  const pressed = useRef(false)
  return {
    onPointerDown: (event: React.PointerEvent) => {
      event.stopPropagation()
      pressed.current = event.button === 0
    },
    onPointerUp: (event: React.PointerEvent) => {
      event.stopPropagation()
      if (pressed.current) onTap()
      pressed.current = false
    },
    onPointerCancel: () => {
      pressed.current = false
    },
    onClick: (event: React.MouseEvent) => {
      event.stopPropagation()
      if (event.detail === 0) onTap()
    },
  }
}

export function MatchingQuestion({ prompts, options, optionOrder, value, onChange }: MatchingQuestionProps) {
  const placements = prompts.map((_, index) => value[index] ?? -1)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [drag, setDrag] = useState<DragState | null>(null)
  const pointerStart = useRef<{ optionIndex: number; x: number; y: number; width: number } | null>(null)

  const bankOptions = optionOrder.filter((optionIndex) => !placements.includes(optionIndex))
  const placedCount = placements.filter((optionIndex) => optionIndex >= 0).length

  const place = (optionIndex: number, fieldIndex: number) => {
    const next = [...placements]
    const previousField = next.indexOf(optionIndex)
    const occupant = next[fieldIndex]
    next[fieldIndex] = optionIndex
    // Moving between fields swaps with whatever was there; otherwise the occupant returns to the bank.
    if (previousField !== -1 && previousField !== fieldIndex) next[previousField] = occupant
    onChange(next)
  }

  const returnToBank = (optionIndex: number) => {
    onChange(placements.map((placed) => (placed === optionIndex ? -1 : placed)))
  }

  const drop = (optionIndex: number, target: DropTarget) => {
    if (target.kind === "bank") returnToBank(optionIndex)
    else place(optionIndex, target.index)
    setSelectedOption(null)
  }

  const tapChip = (optionIndex: number) => {
    const field = placements.indexOf(optionIndex)
    if (selectedOption !== null && selectedOption !== optionIndex && field !== -1) {
      drop(selectedOption, { kind: "field", index: field })
      return
    }
    setSelectedOption((current) => (current === optionIndex ? null : optionIndex))
  }

  const tapField = (fieldIndex: number) => {
    if (selectedOption !== null) drop(selectedOption, { kind: "field", index: fieldIndex })
  }

  const tapBank = () => {
    if (selectedOption !== null && placements.includes(selectedOption)) {
      drop(selectedOption, { kind: "bank" })
    }
  }

  const bankTap = useTap(tapBank)

  const chipProps = (optionIndex: number) => ({
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => {
      event.stopPropagation()
      if (event.button !== 0) return
      event.currentTarget.setPointerCapture(event.pointerId)
      pointerStart.current = {
        optionIndex,
        x: event.clientX,
        y: event.clientY,
        width: event.currentTarget.getBoundingClientRect().width,
      }
    },
    onPointerMove: (event: React.PointerEvent<HTMLElement>) => {
      const start = pointerStart.current
      if (!start) return
      if (!drag && Math.hypot(event.clientX - start.x, event.clientY - start.y) < DRAG_THRESHOLD_PX) return
      setDrag({
        optionIndex: start.optionIndex,
        x: event.clientX,
        y: event.clientY,
        width: start.width,
        target: dropTargetAt(event.clientX, event.clientY),
      })
    },
    onPointerUp: (event: React.PointerEvent<HTMLElement>) => {
      event.stopPropagation()
      const start = pointerStart.current
      pointerStart.current = null
      if (!start) return
      if (!drag) {
        tapChip(start.optionIndex)
        return
      }
      const target = dropTargetAt(event.clientX, event.clientY)
      if (target) drop(drag.optionIndex, target)
      setDrag(null)
    },
    onPointerCancel: () => {
      pointerStart.current = null
      setDrag(null)
    },
    onClick: (event: React.MouseEvent) => {
      event.stopPropagation()
      if (event.detail === 0) tapChip(optionIndex)
    },
    "aria-pressed": selectedOption === optionIndex,
  })

  const chipClassName = (optionIndex: number) =>
    cn(
      "flex touch-none select-none items-center gap-2 rounded-md border bg-background px-3 py-2 text-left text-sm font-medium shadow-sm transition-all cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      selectedOption === optionIndex && "border-primary ring-2 ring-primary/40",
      drag?.optionIndex === optionIndex && "opacity-40",
    )

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Drag each answer into its field, or tap an answer and then tap a field.
        </p>
        <span className="text-sm tabular-nums text-muted-foreground" aria-live="polite">
          {placedCount} of {prompts.length} placed
        </span>
      </div>

      <div
        data-drop-target="bank"
        {...bankTap}
        className={cn(
          "min-h-16 rounded-lg border-2 border-dashed bg-muted/30 p-3 transition-colors",
          isSameTarget(drag?.target ?? null, { kind: "bank" }) && "border-primary bg-primary/5",
          selectedOption !== null && placements.includes(selectedOption) && "border-primary/60",
        )}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Answer bank</p>
        {bankOptions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {bankOptions.map((optionIndex) => (
              <button key={optionIndex} type="button" className={chipClassName(optionIndex)} {...chipProps(optionIndex)}>
                <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                {options[optionIndex]}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">All answers placed. Drag one back here to remove it.</p>
        )}
      </div>

      <div className="space-y-3">
        {prompts.map((prompt, fieldIndex) => (
          <MatchingField
            key={fieldIndex}
            prompt={prompt}
            placedText={placements[fieldIndex] >= 0 ? options[placements[fieldIndex]] : undefined}
            isHovered={isSameTarget(drag?.target ?? null, { kind: "field", index: fieldIndex })}
            isSelecting={selectedOption !== null}
            dropTarget={fieldIndex}
            onTap={() => tapField(fieldIndex)}
            onRemove={() => returnToBank(placements[fieldIndex])}
          >
            {placements[fieldIndex] >= 0 && (
              <button
                type="button"
                className={cn(chipClassName(placements[fieldIndex]), "flex-1")}
                {...chipProps(placements[fieldIndex])}
              >
                <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                {options[placements[fieldIndex]]}
              </button>
            )}
          </MatchingField>
        ))}
      </div>

      {drag && (
        <div
          className="pointer-events-none fixed z-50 flex items-center gap-2 rounded-md border border-primary bg-background px-3 py-2 text-sm font-medium shadow-lg"
          style={{ left: drag.x, top: drag.y, width: drag.width, transform: "translate(-50%, -50%) rotate(-2deg)" }}
        >
          <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          {options[drag.optionIndex]}
        </div>
      )}
    </div>
  )
}

function MatchingField({
  prompt,
  placedText,
  isHovered,
  isSelecting,
  dropTarget,
  onTap,
  onRemove,
  children,
}: {
  prompt: string
  placedText: string | undefined
  isHovered: boolean
  isSelecting: boolean
  dropTarget: number
  onTap: () => void
  onRemove: () => void
  children: React.ReactNode
}) {
  const fieldTap = useTap(onTap)
  const removeTap = useTap(onRemove)
  return (
    <div className="grid items-center gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-4">
      <p className="font-medium">{prompt}</p>
      <div
        data-drop-target={dropTarget}
        role="button"
        tabIndex={isSelecting ? 0 : -1}
        aria-label={`Field for ${prompt}${placedText ? `, contains ${placedText}` : ", empty"}`}
        {...fieldTap}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onTap()
          }
        }}
        className={cn(
          "flex min-h-12 items-center rounded-lg border-2 p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          placedText ? "border-solid border-primary/40 bg-primary/5" : "border-dashed bg-background",
          isHovered && "border-primary bg-primary/10",
          isSelecting && !isHovered && "cursor-pointer hover:border-primary/60",
        )}
      >
        {placedText ? (
          <div className="flex w-full items-center gap-1">
            {children}
            <button
              type="button"
              {...removeTap}
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label={`Remove ${placedText}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <span className="px-2 text-sm text-muted-foreground">
            {isSelecting ? "Tap to place here" : "Drop answer here"}
          </span>
        )}
      </div>
    </div>
  )
}
