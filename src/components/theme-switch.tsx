"use client"

import { useTheme } from "@/contexts/theme-context"
import { Monitor, Moon, Sun } from "lucide-react"
import { useState } from "react"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { value: "dark", label: "Dark", icon: Moon },
    { value: "light", label: "Light", icon: Sun },
    { value: "system", label: "System", icon: Monitor },
  ] as const

  const currentTheme = themes.find((t) => t.value === theme)
  const CurrentIcon = currentTheme?.icon || Moon

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Theme Options */}
        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-md shadow-lg overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              return (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value)
                    setIsOpen(false)
                  }}
                  className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors w-full text-left ${
                    theme === themeOption.value ? "bg-accent text-accent-foreground" : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-mono">{themeOption.label}</span>
                  {theme === themeOption.value && <span className="ml-auto text-primary">●</span>}
                </button>
              )
            })}
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-card border border-border rounded-md p-3 shadow-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 group"
          aria-label="Toggle theme"
        >
          <CurrentIcon className="w-5 h-5 text-primary group-hover:text-accent-foreground transition-colors" />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 -z-10" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
