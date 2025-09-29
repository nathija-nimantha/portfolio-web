"use client"

import { useEffect, useState, useRef } from "react"

export default function LoadingScreen({ onFinish }: { onFinish?: () => void }) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [displayedText, setDisplayedText] = useState<string[]>([])
  const [uptime, setUptime] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(Math.floor(Date.now() / 1000));
    }, 1000);
    setUptime(Math.floor(Date.now() / 1000));
    return () => clearInterval(interval);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [displayedText])

  const asciiArt = `
    ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
       ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
       ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
  `

  const loadingSteps = [
    { message: "$ sudo systemctl start portfolio.service", delay: 800 },
    { message: "[  OK  ] Started Portfolio Service", delay: 600 },
    { message: "$ loading kernel modules...", delay: 700 },
    { message: "[  OK  ] Loaded module: react.ko", delay: 400 },
    { message: "[  OK  ] Loaded module: nextjs.ko", delay: 400 },
    { message: "[  OK  ] Loaded module: typescript.ko", delay: 400 },
    { message: "$ mounting filesystems...", delay: 600 },
    { message: "[  OK  ] Mounted /dev/projects", delay: 300 },
    { message: "[  OK  ] Mounted /dev/experience", delay: 300 },
    { message: "[  OK  ] Mounted /dev/skills", delay: 300 },
    { message: "$ initializing network interfaces...", delay: 700 },
    { message: "[  OK  ] GitHub API connection established", delay: 500 },
    { message: "[  OK  ] LinkedIn API connection established", delay: 500 },
    { message: "$ starting user interface daemon...", delay: 800 },
    { message: "[  OK  ] UI daemon started successfully", delay: 600 },
    { message: "$ portfolio.service: ready", delay: 1000 },
    { message: "Welcome to Terminal Portfolio v2.0.1", delay: 1000 },
    { message: "Opening portfolio...", delay: 2000 },
  ]

  // Prevent double effect execution in React Strict Mode
  const hasRunRef = useRef(false)
  useEffect(() => {
    if (hasRunRef.current) return
    hasRunRef.current = true
    const processSteps = async () => {
      for (let i = 0; i < loadingSteps.length; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            setDisplayedText((prev) => [...prev, loadingSteps[i].message])
            setCurrentStep(i + 1)
            resolve(void 0)
          }, loadingSteps[i].delay)
        })
      }

      setTimeout(() => {
        setIsLoading(false)
        if (onFinish) onFinish();
      }, 800)
    }

    processSteps()
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={`loading-screen fixed inset-0 z-50 bg-background text-primary font-mono shadow-2xl flex items-center justify-center transition-opacity duration-700 ${!isLoading ? "fade-out" : ""}`}
      style={{ fontFamily: 'Monaco, Menlo, "DejaVu Sans Mono", "Liberation Mono", "Consolas", "Courier New", monospace' }}
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row h-auto md:h-[32rem] rounded-lg overflow-hidden border border-primary/30 shadow-lg bg-card relative">
        <div className="absolute top-0 left-0 w-full flex items-center space-x-2 px-4 md:px-8 py-2 bg-card border-b border-primary/30 z-10">
          <span className="w-3 h-3 rounded-full bg-destructive inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
          <span className="ml-2 md:ml-4 text-xs text-muted-foreground">Terminal Portfolio Boot Sequence</span>
        </div>
        <div className="flex-1 flex flex-col justify-start px-2 md:pl-8 md:pr-4 pt-10 md:pt-12 pb-6 md:pb-10 min-w-0">
          {/* Scrollable Terminal Area: ASCII Art + Messages */}
          <div
            ref={messagesContainerRef}
            className="space-y-1 font-mono text-xs md:text-sm overflow-y-auto bg-card rounded mb-2 hide-scrollbar"
            style={{ maxHeight: '45vh', minHeight: '8rem', paddingRight: '0.5rem' }}
          >
            {/* ASCII Art Header inside scrollable area */}
            <div className="text-primary font-mono text-[10px] md:text-xs leading-tight mb-2 md:mb-4 opacity-80">
              <pre className="whitespace-pre">{asciiArt}</pre>
            </div>
            {/* Loading Messages */}
            {displayedText.map((text, index) => {
              if (text === "__LOADING_ANIMATION__") {
                return (
                  <div key={index} className="flex items-center">
                    <span className="text-primary mr-2">$</span>
                    <span className="loading-dots text-primary">
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </span>
                  </div>
                )
              }
              return (
                <div key={index} className="flex items-center">
                  {text.startsWith("[") ? (
                    <span className={`${text.includes("OK") ? "text-primary" : "text-yellow-500"}`}>{text}</span>
                  ) : text.startsWith("$") ? (
                    <span className="text-blue-500 dark:text-blue-400">{text}</span>
                  ) : (
                    <span className="text-muted-foreground">{text}</span>
                  )}
                  {index === displayedText.length - 1 && <span className="ml-1 animate-blink text-primary">█</span>}
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
          {/* Progress Bar */}
          <div className="mt-6 md:mt-8 w-full max-w-xs md:max-w-md mx-auto">
            <div className="flex items-center space-x-2 text-[10px] md:text-xs font-mono text-muted-foreground">
              <span>Loading:</span>
              <div className="flex-1 bg-secondary rounded h-2 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${(currentStep / loadingSteps.length) * 100}%` }}
                />
              </div>
              <span>{Math.round((currentStep / loadingSteps.length) * 100)}%</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-80 flex flex-col justify-center px-4 md:pr-8 md:pl-4 border-t md:border-t-0 md:border-l border-border bg-secondary/20">
          <div className="font-mono text-[10px] md:text-xs space-y-2 text-muted-foreground">
            <div className="text-primary text-xs md:text-sm mb-2 md:mb-4">SYSTEM INFO</div>
            <div>OS: Portfolio Linux 2.0.1</div>
            <div>Kernel: React 18.2.0</div>
            <div>Shell: /bin/nextjs</div>
            <div>Memory: 512MB / 1GB</div>
            <div>Uptime: {uptime} seconds</div>
            <div className="pt-2 md:pt-4">
              <div className="text-primary text-xs md:text-sm mb-1 md:mb-2">LOADED MODULES</div>
              <div className="space-y-1 text-[10px] md:text-xs">
                <div className={currentStep > 3 ? "text-primary" : "text-muted-foreground"}>✓ react.ko</div>
                <div className={currentStep > 4 ? "text-primary" : "text-muted-foreground"}>✓ nextjs.ko</div>
                <div className={currentStep > 5 ? "text-primary" : "text-muted-foreground"}>✓ typescript.ko</div>
                <div className={currentStep > 8 ? "text-primary" : "text-muted-foreground"}>✓ projects.ko</div>
                <div className={currentStep > 9 ? "text-primary" : "text-muted-foreground"}>✓ experience.ko</div>
                <div className={currentStep > 10 ? "text-primary" : "text-muted-foreground"}>✓ skills.ko</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .hide-scrollbar {
          scrollbar-width: thin;
        }
        .hide-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: hsl(var(--secondary));
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary));
          border-radius: 8px;
        }
        .animate-blink {
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          to { opacity: 0; }
        }
        .loading-dots .dot {
          display: inline-block;
          animation: loadingDot 1s infinite;
        }
        .loading-dots .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .loading-dots .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes loadingDot {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
