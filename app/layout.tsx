import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/react"

import "./globals.css"

const SpaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "What the Hack?!",
  description:
    "Get to know the top comments of a Hacker News post in a glance! Powered by Nextjs and Cloudflare Workers AI.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <meta property="og:image" content="/opengraph-image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="832" />
      <meta property="og:site_name" content="What the Hack?!"/>
      <meta property="og:url" content="https://wth.lakshb.dev/"/>
      <meta name="twitter:image" content="/twitter-image.png" />
      <meta name="twitter:image:type" content="image/png" />
      <meta name="twitter:image:width" content="1280" />
      <meta name="twitter:image:height" content="832" />
      <body className={SpaceGrotesk.className}>
        {children}
        <Toaster richColors position="top-center" />
        <Analytics />
      </body>
    </html>
  )
}
