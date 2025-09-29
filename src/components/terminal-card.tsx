import type React from "react"
import { Card } from "@/components/ui/card"

interface TerminalCardProps {
  children: React.ReactNode
  className?: string
  title?: string
}

export default function TerminalCard({ children, className = "", title }: TerminalCardProps) {
  return (
    <Card className={`bg-card border-border hover:border-primary/50 transition-all duration-300 ${className}`}>
      {title && (
        <div className="border-b border-border px-4 py-2 bg-card/50 dark:bg-secondary/20">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>
            <span className="text-sm font-mono text-muted-foreground">{title}</span>
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </Card>
  )
}
