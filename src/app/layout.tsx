import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "LineageAI — Cascade Testing, Tracked",
  description:
    "The first platform built for genetic counselors to manage cascade testing outreach. Map at-risk relatives, generate letters, maintain compliance logs.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
