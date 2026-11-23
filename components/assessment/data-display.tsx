"use client"

import type { Doc } from "@/convex/_generated/dataModel"

type DataDisplayConfig = NonNullable<Doc<"assessments">["questions"][number]["dataDisplay"]>

const PIE_COLORS = ["#2563eb", "#f59e0b", "#10b981", "#a855f7", "#ef4444"]

function chartDescription(display: DataDisplayConfig) {
  return display.labels
    .map((label, index) => `${label}: ${display.values[index] ?? 0} ${display.unit ?? ""}`)
    .join(". ")
}

function Pictograph({ display }: { display: DataDisplayConfig }) {
  const keyValue = Math.max(1, display.keyValue ?? 1)
  const symbol = display.symbol ?? "●"

  return (
    <div
      role="img"
      aria-label={`Pictograph. ${display.title}. Key: each ${symbol} represents ${keyValue} ${display.unit ?? "items"}. ${chartDescription(display)}`}
      className="space-y-3"
    >
      {display.labels.map((label, index) => {
        const symbolCount = Math.floor((display.values[index] ?? 0) / keyValue)
        return (
          <div key={label} aria-hidden="true" className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
            <span className="text-sm font-medium">{label}</span>
            <div className="flex min-h-8 flex-wrap items-center gap-1 text-xl" title={`${display.values[index] ?? 0} ${display.unit ?? "items"}`}>
              {Array.from({ length: symbolCount }, (_, symbolIndex) => (
                <span key={symbolIndex}>{symbol}</span>
              ))}
            </div>
          </div>
        )
      })}
      <p aria-hidden="true" className="border-t pt-2 text-xs text-muted-foreground">
        Key: {symbol} = {keyValue} {display.unit ?? "items"}
      </p>
    </div>
  )
}

function PieChart({ display }: { display: DataDisplayConfig }) {
  const total = display.values.reduce((sum, value) => sum + Math.max(0, value), 0)
  let currentAngle = -Math.PI / 2
  const slices = display.values.map((value, index) => {
    const sweep = total > 0 ? (Math.max(0, value) / total) * Math.PI * 2 : 0
    const startAngle = currentAngle
    const endAngle = currentAngle + sweep
    currentAngle = endAngle

    const radius = 76
    const center = 90
    const startX = center + radius * Math.cos(startAngle)
    const startY = center + radius * Math.sin(startAngle)
    const endX = center + radius * Math.cos(endAngle)
    const endY = center + radius * Math.sin(endAngle)
    const largeArc = sweep > Math.PI ? 1 : 0

    return {
      label: display.labels[index] ?? `Part ${index + 1}`,
      value,
      color: PIE_COLORS[index % PIE_COLORS.length],
      path: sweep >= Math.PI * 2
        ? `M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center} ${center + radius} A ${radius} ${radius} 0 1 1 ${center} ${center - radius} Z`
        : `M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} Z`,
    }
  })

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
      <svg
        viewBox="0 0 180 180"
        className="h-44 w-44 shrink-0"
        role="img"
        aria-label={`Pie chart. ${display.title}. ${chartDescription(display)}`}
      >
        {slices.map((slice) => (
          <path key={slice.label} d={slice.path} fill={slice.color} className="stroke-background" strokeWidth="2">
            <title>{slice.label}</title>
          </path>
        ))}
      </svg>
      <ul className="grid gap-2 text-sm">
        {slices.map((slice) => (
          <li key={slice.label} className="flex items-center gap-2">
            <span aria-hidden="true" className="h-3 w-3 rounded-sm" style={{ backgroundColor: slice.color }} />
            <span>{slice.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TallyGroup({ count }: { count: number }) {
  const groupsOfFive = Math.floor(count / 5)
  const remainder = count % 5

  return (
    <span role="img" aria-label={`${count} tally marks`} className="inline-flex items-center gap-2">
      {Array.from({ length: groupsOfFive }, (_, index) => (
        <svg key={`group-${index}`} viewBox="0 0 34 28" className="h-7 w-9 text-primary" aria-hidden="true">
          {[4, 10, 16, 22].map((x) => (
            <line key={x} x1={x} y1="3" x2={x} y2="25" stroke="currentColor" strokeWidth="2" />
          ))}
          <line x1="2" y1="24" x2="25" y2="4" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      ))}
      {remainder > 0 && (
        <span aria-hidden="true" className="inline-flex h-6 items-center gap-1 text-xl leading-none text-primary">
          {Array.from({ length: remainder }, (_, index) => <span key={index}>|</span>)}
        </span>
      )}
    </span>
  )
}

function TallyTable({ display }: { display: DataDisplayConfig }) {
  return (
    <table className="w-full border-collapse text-left text-sm">
      <caption className="sr-only">{display.title} tally table</caption>
      <thead>
        <tr className="border-b text-muted-foreground">
          <th scope="col" className="py-2 pr-3 font-medium">Category</th>
          <th scope="col" className="py-2 pr-3 font-medium">Tally</th>
          <th scope="col" className="py-2 text-right font-medium">Number</th>
        </tr>
      </thead>
      <tbody>
        {display.labels.map((label, index) => (
          <tr key={label} className="border-b last:border-0">
            <th scope="row" className="py-2 pr-3 font-medium">{label}</th>
            <td className="py-2 pr-3"><TallyGroup count={display.values[index] ?? 0} /></td>
            <td className="py-2 text-right tabular-nums">{display.values[index] ?? 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function LinePlot({ display }: { display: DataDisplayConfig }) {
  const width = 480
  const height = 250
  const left = 48
  const right = 48
  const top = 32
  const bottom = 62
  const plotWidth = width - left - right
  const plotHeight = height - top - bottom
  const maxValue = Math.max(1, ...display.values)
  const tickStep = maxValue > 8 ? Math.ceil(maxValue / 5) : 1
  const maxTick = Math.ceil(maxValue / tickStep) * tickStep
  const ticks = Array.from({ length: maxTick / tickStep + 1 }, (_, index) => index * tickStep)
  const points = display.values.map((value, index) => ({
    x: display.values.length <= 1 ? left + plotWidth / 2 : left + (index / (display.values.length - 1)) * plotWidth,
    y: top + plotHeight - (value / maxTick) * plotHeight,
    value,
    label: display.labels[index] ?? `Point ${index + 1}`,
  }))
  const description = chartDescription(display)

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto min-w-[420px] w-full"
        role="img"
        aria-label={`${display.type === "histograph" ? "Histograph" : "Line graph"}. ${display.title}. ${description}`}
      >
        {ticks.map((tick) => {
          const y = top + plotHeight - (tick / maxTick) * plotHeight
          return (
            <g key={tick} className="text-muted-foreground">
              <line x1={left} y1={y} x2={width - right} y2={y} className="stroke-border" />
              <text x={left - 9} y={y + 4} textAnchor="end" className="fill-current text-[11px]">{tick}</text>
            </g>
          )
        })}
        <line x1={left} y1={top} x2={left} y2={top + plotHeight} className="stroke-foreground/50" />
        <line x1={left} y1={top + plotHeight} x2={width - right} y2={top + plotHeight} className="stroke-foreground/50" />
        <polyline
          points={points.map((point) => `${point.x},${point.y}`).join(" ")}
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((point, index) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="5" fill="#2563eb" />
            <text x={point.x} y={point.y - 10} textAnchor="middle" className="fill-foreground text-xs font-semibold">{point.value}</text>
            <text x={point.x} y={top + plotHeight + 20} textAnchor="middle" className="fill-muted-foreground text-[11px]">
              {point.label}
            </text>
            {index === 0 && display.unit && (
              <text x="6" y={top + 2} textAnchor="start" className="fill-muted-foreground text-[11px]">
                {display.unit}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}

export function AssessmentDataDisplay({ display }: { display: DataDisplayConfig }) {
  const chartType = {
    pictograph: "Pictograph",
    histograph: "Histograph",
    "pie-chart": "Pie chart",
    "tally-table": "Tally table",
    "line-graph": "Line graph",
  }[display.type]

  return (
    <figure className="rounded-lg border bg-muted/20 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <figcaption className="font-semibold">{display.title}</figcaption>
        <span className="rounded-full bg-background px-2 py-1 text-xs text-muted-foreground">{chartType}</span>
      </div>
      {display.type === "pictograph" && <Pictograph display={display} />}
      {display.type === "pie-chart" && <PieChart display={display} />}
      {display.type === "tally-table" && <TallyTable display={display} />}
      {(display.type === "histograph" || display.type === "line-graph") && <LinePlot display={display} />}
    </figure>
  )
}
