import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { Toaster } from "sonner"

import "./globals.css"

const SpaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

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
    <html lang="en" className="bg-background">
      <body className={SpaceGrotesk.className}>
        {children}
        <Toaster
        richColors
        position="top-center"
        />
      </body>
    </html>
  )
}
