import type { Metadata } from "next"
import { Figtree } from "next/font/google"

import "./globals.css"

const figtree_font = Figtree({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HackerNews Comments Summarizer",
  description: "Summarize the top comments on HackerNews using AI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-orange-50">
      <body className={figtree_font.className}>{children}</body>
    </html>
  )
}
