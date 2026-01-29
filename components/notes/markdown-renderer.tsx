"use client"

import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">{children}</h3>,
          p: ({ children }) => <p className="my-4 leading-relaxed text-foreground">{children}</p>,
          ul: ({ children }) => <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed text-foreground">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic text-foreground">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="rounded-lg my-4"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground border" {...props}>
                {children}
              </code>
            )
          },
          a: ({ children, href }) => (
            <a href={href} className="text-primary hover:underline font-medium">
              {children}
            </a>
          ),
          hr: () => <hr className="my-8 border-border" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
