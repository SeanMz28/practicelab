import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import { DataInitializer } from "@/components/data-initializer"
import { getToken } from "@/lib/auth-server"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Practice Lab - Learn, Practice, Excel",
  description: "Educational platform for course notes, quizzes, and grade tracking",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialToken = await getToken()

  return (
    <html lang="en">
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <Providers initialToken={initialToken}>
          <DataInitializer />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
