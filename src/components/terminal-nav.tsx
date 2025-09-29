"use client"

import { useState, useEffect } from "react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { TreeView, TreeNode } from "@/components/ui/tree-view"

const navItems = [
  { id: "home", label: "home", command: "cd ~/" },
  { id: "about", label: "about", command: "cat about.txt" },
  { id: "experience", label: "experience", command: "ls -la experience/" },
  { id: "skills", label: "skills", command: "cat skills.json" },
  { id: "projects", label: "projects", command: "ls projects/" },
  { id: "education", label: "education", command: "cat education.log" },
  { id: "contact", label: "contact", command: "mail -s contact" },
]

const navTree: TreeNode[] = navItems.map(item => ({ id: item.id, label: item.label }))

export default function TerminalNav() {
  const [activeSection, setActiveSection] = useState("home")
  const [mounted, setMounted] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (!mounted) return;
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-primary font-mono text-lg">
              <span className="text-muted-foreground">user@nathija-nimantha:</span>
              <span className="text-primary">~$</span>
            </div>
          </div>
          {/* Desktop Nav: visible on screens >= 1024px */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`font-mono text-sm transition-all duration-300 hover:text-primary group flex items-center ${
                      activeSection === item.id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && <span className="terminal-cursor text-primary ml-1">_</span>}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{item.command}</TooltipContent>
              </Tooltip>
            ))}
          </div>
          {/* Tablet/Mobile Nav Toggle: visible on screens < 1024px */}
          <div className="lg:hidden flex items-center">
            <button
              aria-label="Open menu"
              className="p-2 rounded text-primary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setShowMobileMenu((v) => !v)}
            >
              <span className="sr-only">Open navigation</span>
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="25" y2="12"/><line x1="3" y1="7" x2="25" y2="7"/><line x1="3" y1="17" x2="25" y2="17"/></svg>
            </button>
          </div>
        </div>
        {/* Tablet/Mobile Menu: visible on screens < 1024px */}
        {showMobileMenu && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-background border-b border-border shadow-lg z-50 animate-in fade-in slide-in-from-top duration-300">
            <div className="py-2 px-2">
              <TreeView
                nodes={navTree}
                selectedId={activeSection}
                onSelect={id => { scrollToSection(id); setShowMobileMenu(false); }}
                renderNode={(node) => {
                  const item = navItems.find(i => i.id === node.id)
                  return (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{node.label}</span>
                      </TooltipTrigger>
                      <TooltipContent>{item?.command || ""}</TooltipContent>
                    </Tooltip>
                  )
                }}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
