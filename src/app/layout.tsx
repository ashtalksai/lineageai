import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://lineageai.ashketing.com"),
  title: "LineageAI — Cascade Testing, Tracked",
  description:
    "The first platform built for genetic counselors to manage cascade testing outreach. Map at-risk relatives, generate letters, maintain compliance logs.",
  openGraph: {
    title: "LineageAI — Cascade Testing, Tracked",
    description:
      "The first platform built for genetic counselors to manage cascade testing outreach. 7 in 10 at-risk family members never get tested. LineageAI closes the loop.",
    url: "https://lineageai.ashketing.com",
    siteName: "LineageAI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "LineageAI — Cascade Testing, Tracked",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LineageAI — Cascade Testing, Tracked",
    description:
      "The first platform built for genetic counselors to manage cascade testing outreach. 7 in 10 at-risk family members never get tested. LineageAI closes the loop.",
    images: ["/images/og-image.png"],
  },
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
