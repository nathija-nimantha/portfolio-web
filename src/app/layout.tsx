import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import { ThemeProvider } from "@/contexts/theme-context"
import { ThemeSwitch } from "@/components/theme-switch"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nathija Nimantha - Portfolio",
  description: "Full Stack Developer Portfolio - Terminal Style",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-mono ${GeistSans.variable} ${GeistMono.variable} antialiased`} suppressHydrationWarning={true}>
        <ThemeProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <ThemeSwitch />
        </ThemeProvider>
      </body>
    </html>
  )
}
