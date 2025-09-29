
"use client"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Download, Send, MapPin, Phone, Facebook } from "lucide-react"
import { Instagram, X } from "lucide-react"
import LoadingScreen from "@/components/loading-screen"
import TerminalNav from "@/components/terminal-nav"
import AnimatedSection from "@/components/animated-section"
import TerminalCard from "@/components/terminal-card"

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("")
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value || "",
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value || "",
      subject: (form.elements.namedItem("subject") as HTMLInputElement)?.value || "",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "",
    }
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
    const url = `https://formspree.io/f/${formspreeId}`
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus("Message sent successfully!")
        form.reset()
      } else {
        setStatus("Failed to send message. Please try again.")
      }
    } catch {
      setStatus("Failed to send message. Please try again.")
    }
  }

  return (
    <form className="space-y-6" ref={formRef} onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-mono text-muted-foreground mb-2">Name:</label>
        <Input name="name" className="font-mono bg-background border-border focus:border-primary" placeholder="Enter your name" required />
      </div>
      <div>
        <label className="block text-sm font-mono text-muted-foreground mb-2">Email:</label>
        <Input type="email" name="email" className="font-mono bg-background border-border focus:border-primary" placeholder="Enter your email" required />
      </div>
      <div>
        <label className="block text-sm font-mono text-muted-foreground mb-2">Subject:</label>
        <Input name="subject" className="font-mono bg-background border-border focus:border-primary" placeholder="Enter subject" />
      </div>
      <div>
        <label className="block text-sm font-mono text-muted-foreground mb-2">Message:</label>
        <Textarea name="message" className="font-mono bg-background border-border focus:border-primary min-h-32" placeholder="Enter your message" required />
      </div>
      <Button className="w-full font-mono" type="submit">
        <Send className="w-4 h-4 mr-2" />
        Send Message
      </Button>
      {status && <p className="font-mono text-sm mt-2 text-primary">{status}</p>}
    </form>
  )
}


export default function TerminalPortfolio() {
  const [isLoaded, setIsLoaded] = useState(false)

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const experiences = [
    {
      startDate: "2024-12-01",
      endDate: "2025-06-30",
      title: "Trainee Software Engineer",
      company: "SYIGEN (Pvt) Ltd",
      description: "Contributed to company and client projects across the full SDLC, gaining cross-functional exposure in BA, QA, TL, and PM roles. Completed intensive software engineering training and worked on production-level projects.",
    },
  ]

  const education = [
    {
      startDate: "2024-02-01",
      endDate: "2025-11-30",
      title: "Full Stack Software Engineering Program",
      company: "Institute of Computer Engineering - Panadura",
      description: "Completed intensive training specializing in modern web and mobile development, machine learning, and production-level software engineering.",
    },
  ]

  const skills = [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Java", "SQL", "HTML", "CSS", "Python", "Dart"],
    },
    {
      category: "Frontend",
      items: ["React", "Flutter", "Angular", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Spring Boot", "Express", "FastAPI", "Laravel"],
    },
    {
      category: "Database",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Supabase", "Firebase", "SQLite"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "Docker", "Agile/Scrum", "CI/CD"],
    },
    {
      category: "Other",
      items: ["Machine Learning", "Data Structures & Algorithms", "OOP", "RESTful APIs", "Microservices"],
    }
  ]

  const projects = [
    {
      title: "SAFE App (Company Project)",
      description: "Mobile and web platform for reporting human-elephant conflicts, built with Flutter, React, and Supabase.",
      tags: ["Flutter", "React", "Supabase"],
      hasLive: false,
      hasCode: false,
      liveUrl: "",
      codeUrl: "",
    },
    {
      title: "Doc Manager (Company Project)",
      description: "AI-powered legal document management system featuring an AI-based mind map generator, built with Next.js, React Flow, and FastAPI.",
      tags: ["Next.js", "React Flow", "FastAPI"],
      hasLive: false,
      hasCode: false,
      liveUrl: "",
      codeUrl: "",
    },
    {
      title: "Nimantha Tours",
      description: "Full-stack booking and tour management web application built with React, TypeScript, Node.js, and Prisma.",
      tags: ["React", "TypeScript", "Node.js", "Prisma"],
      hasLive: true,
      hasCode: false,
      liveUrl: "https://nimanthatours.com",
      codeUrl: "",
    },
    {
      title: "Generative AI for Etsy",
      description: "AI assistant for automating e-commerce content creation, built with FastAPI, Python, and Next.js.",
      tags: ["FastAPI", "Python", "Next.js"],
      hasLive: false,
      hasCode: true,
      liveUrl: "",
      codeUrl: "https://github.com/nathija-nimantha/generative-ai-for-etsy",
    },
    {
      title: "SkyScope Weather Intelligence",
      description: "🌤️ SkyScope is a responsive weather intelligence app built with Next.js, TypeScript & Tailwind CSS, featuring real-time weather data, dynamic UI, and advanced atmospheric insights using WeatherAPI.com.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "OpenWeatherMap API", "Zustand", "React Query"],
      hasLive: true,
      hasCode: true,
      liveUrl: "https://sky-scope-weather-intelligence.vercel.app/",
      codeUrl: "https://github.com/nathija-nimantha/SkyScope-Weather-Intelligence",
    },
    {
      title: "MOS Burgers Order Management",
      description: "🍔 Mos Burgers is a responsive web-based application designed to offer an intuitive online ordering experience for users. The application allows users to browse the Mos Burgers menu, add items to their cart, and proceed to checkout after signing up or logging in. It also provides options to manage profiles, view order history, and more.",
      tags: ["JavaScript", "HTML", "CSS", "Bootstrap"],
      hasLive: false,
      hasCode: true,
      liveUrl: "",
      codeUrl: "https://github.com/nathija-nimantha/MOS-Burgers-Order-Management",
    },
    {
      title: "Tic-Tac-Toe Backend",
      description: "Node.js & Express server supporting real-time multiplayer Tic-Tac-Toe via Socket.IO, with multiple game rooms, board size options, and in-game chat.",
      tags: ["Node.js", "Express", "Socket.IO"],
      hasLive: false,
      hasCode: true,
      liveUrl: "",
      codeUrl: "https://github.com/nathija-nimantha/tic-tac-toe-backend",
    },
    {
      title: "Tic-Tac-Toe Frontend",
      description: "Next.js + TypeScript frontend for a multiplayer Tic-Tac-Toe game: supports real-time play, chat, theme switching, and responsive design.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      hasLive: false,
      hasCode: true,
      liveUrl: "",
      codeUrl: "https://github.com/nathija-nimantha/tic-tac-toe-frontend",
    },
    {
      title: "Clothify Store",
      description: "JavaFX-based desktop application for managing a clothing store’s inventory, billing, and sales. Built using SceneBuilder for a modern and user-friendly interface. Ideal for learning retail system development in Java.",
      tags: ["Java", "JavaFX", "SceneBuilder"],
      hasLive: false,
      hasCode: true,
      liveUrl: "",
      codeUrl: "https://github.com/nathija-nimantha/clothify-store",
    },
    {
      title: "Student Management System",
      description: "The Student Management System is a comprehensive web-based application designed to manage student records efficiently. Built using Spring Boot for the backend and a responsive frontend with HTML, CSS, and JavaScript, the system allows administrators to perform essential operations such as adding, updating, viewing, and deleting student information.",
      tags: ["Java", "Spring Boot", "HTML", "CSS", "JavaScript"],
      hasLive: false,
      hasCode: true,
      liveUrl: "",
      codeUrl: "https://github.com/nathija-nimantha/Student-Management-System-SpingBoot-BFF",
    },
    {
      title: "ReceiptWise (Mobile App)",
      description: "ReceiptWise - A modern Flutter receipt management app that helps users track purchases, warranties, and spending patterns. Organize receipts by categories, scan paper receipts with OCR, and visualize your spending with intuitive charts and analytics.",
      tags: ["Flutter", "Dart", "OCR"],
      hasLive: false,
      hasCode: true,
      liveUrl: "",
      codeUrl: "https://github.com/nathija-nimantha/receiptwise-flutter",
    },
  ]

  if (!isLoaded) {
    return <LoadingScreen onFinish={() => setIsLoaded(true)} />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TerminalNav />

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <AnimatedSection className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-mono font-bold text-primary mb-4">
              NATHIJA NIMANTHA JAYASINGHE<span className="terminal-cursor">_</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-mono mb-2">Full Stack Software Engineer</p>
            <p className="text-lg text-foreground font-mono max-w-2xl mx-auto leading-relaxed">
              Practical experience in modern web and mobile development. Expanding knowledge in machine learning. Completed intensive software engineering training and contributed to production-level projects in a trainee role.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              onClick={scrollToContact}
              className="font-mono bg-primary text-primary-foreground hover:bg-card hover:text-primary hover:border-primary border border-transparent"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact me
            </Button>
            <a
              href="/docs/CV.pdf"
              download="Nathija_Nimantha_CV.pdf"
              className="inline-flex items-center font-mono border border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent px-4 py-2 rounded transition-colors duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </a>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="mailto:nathija.jayasinghe@gmail.com" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Mail className="w-6 h-6" />
            </a>
            <a href="tel:+94761231133" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Phone className="w-6 h-6" />
            </a>
            <a href="https://github.com/nathija-nimantha" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/nathija-nimantha/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/nathija.nimantha.5/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Facebook className="w-6 h-6" />
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.2}>
            <h2 className="text-4xl font-mono font-bold text-primary mb-12 terminal-prompt">about_</h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-lg font-mono leading-relaxed">
                  Hello, I&apos;m Nathija Nimantha Jayasinghe, a passionate Full Stack Software Engineer with practical experience in modern web and mobile development.
                </p>
                <p className="text-lg font-mono leading-relaxed">
                  I&apos;m proficient in core technologies like JavaScript, TypeScript, and React, with strong backend capabilities in Node.js, Python, and Spring Boot. I also have expertise in cross-platform mobile development using Flutter.
                </p>
                <p className="text-lg font-mono leading-relaxed">
                  I completed an intensive Full Stack Software Engineering Program and contributed to production-level projects during my time as a Trainee Software Engineer at SYIGEN (Pvt) Ltd. This professional experience, from December 2024 to June 2025, provided me with comprehensive cross-functional exposure where I rotated through roles such as BA, QA, TL, and PM, and actively participated in Agile/Scrum ceremonies.
                </p>
                <p className="text-lg font-mono leading-relaxed">
                  My background has equipped me with strong problem-solving skills and a solid foundation in project management and cross-functional teamwork. I&apos;m passionate about building scalable, user-focused applications and am currently expanding my knowledge in machine learning.
                </p>
              </div>

              <div className="grid gap-6">
                <TerminalCard title="expertise.json">
                  <h3 className="text-xl font-mono text-primary mb-4">Core Expertise</h3>
                  <p className="font-mono text-sm leading-relaxed">
                    Specialized in building modern web applications with focus on performance, accessibility, and user
                    experience. Experienced in agile development and team collaboration.
                  </p>
                </TerminalCard>

                <TerminalCard title="interests.log">
                  <h3 className="text-xl font-mono text-primary mb-4">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Open Source Contribution",
                      "Machine Learning",
                      "Cloud Architecture", 
                      "Emerging Web Technologies",
                      "Industry Trends",
                      "Software Engineering",
                      "DevOps",
                      "AI & Data Science"
                    ].map((interest, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-primary/20 text-primary text-sm font-mono rounded cursor-pointer hover:bg-primary hover:text-primary-foreground hover:scale-105 transform transition-all duration-200 hover:shadow-lg"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </TerminalCard>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.3}>
            <h2 className="text-4xl font-mono font-bold text-primary mb-12 terminal-prompt">experience_</h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>

              {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-center mb-0">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

                  {/* Connector line */}
                  {index % 2 === 0 && (
                    <div className="absolute top-1/2 left-[calc(50%-0.5rem)] transform -translate-y-1/2 w-6 h-0.5 bg-border -ml-3"></div>
                  )}
                  {index % 2 === 1 && (
                    <div className="absolute top-1/2 left-[calc(50%+0.60rem)] transform -translate-y-1/2 w-6 h-0.5 bg-border -ml-3"></div>
                  )}

                  {/* Left side card */}
                  {index % 2 === 0 && (
                    <div className="w-1/2 pr-6">
                      <div className="ml-auto w-full max-w-md">
                        <TerminalCard>
                          <div className="mb-2">
                            <span className="text-primary font-mono text-lg">{new Date(exp.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                            <span className="text-muted-foreground font-mono mx-2">-</span>
                            <span className="text-muted-foreground font-mono">{new Date(exp.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                          </div>
                          <h3 className="text-xl font-mono font-bold text-foreground mb-2">{exp.title}</h3>
                          <p className="text-primary font-mono mb-3">{exp.company}</p>
                          <p className="text-sm font-mono text-muted-foreground leading-relaxed">{exp.description}</p>
                        </TerminalCard>
                      </div>
                    </div>
                  )}

                  {/* Right side card */}
                  {index % 2 === 1 && (
                    <div className="w-1/2 pl-6 ml-auto">
                      <div className="w-full max-w-md">
                        <TerminalCard>
                          <div className="mb-2">
                            <span className="text-primary font-mono text-lg">{new Date(exp.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                            <span className="text-muted-foreground font-mono ml-2">{new Date(exp.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                          </div>
                          <h3 className="text-xl font-mono font-bold text-foreground mb-2">{exp.title}</h3>
                          <p className="text-primary font-mono mb-3">{exp.company}</p>
                          <p className="text-sm font-mono text-muted-foreground leading-relaxed">{exp.description}</p>
                        </TerminalCard>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.4}>
            <h2 className="text-4xl font-mono font-bold text-primary mb-12 terminal-prompt">skills_</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skillGroup, index) => (
                <TerminalCard key={index} title={`${skillGroup.category.toLowerCase()}.json`}>
                  <h3 className="text-xl font-mono font-bold text-primary mb-4">{skillGroup.category}</h3>
                  <div className="space-y-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center space-x-2">
                        <span className="text-primary">&gt;</span>
                        <span className="font-mono text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </TerminalCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.5}>
            <h2 className="text-4xl font-mono font-bold text-primary mb-12 terminal-prompt">projects_</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <TerminalCard key={index} title={`project_${index + 1}.md`}>
                  <h3 className="text-xl font-mono font-bold text-primary mb-3">{project.title}</h3>
                  <p className="font-mono text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-primary/20 text-primary text-xs font-mono rounded cursor-pointer hover:bg-primary hover:text-primary-foreground hover:scale-105 transform transition-all duration-200 hover:shadow-lg">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    {project.hasLive && project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="font-mono text-xs bg-primary text-primary-foreground hover:bg-card hover:text-primary hover:border-primary border border-transparent project-btn-live">
                          Live Demo
                        </Button>
                      </a>
                    )}
                    {project.hasCode && project.codeUrl && (
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="font-mono text-xs bg-transparent border-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground project-btn-code">
                          View Code
                        </Button>
                      </a>
                    )}
                  </div>
                </TerminalCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.6}>
            <h2 className="text-4xl font-mono font-bold text-primary mb-12 terminal-prompt">education_</h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>

              {education.map((edu, index) => (
                <div key={index} className="relative flex items-center mb-0">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

                  {index % 2 === 0 && (
                    <div className="absolute top-1/2 left-[calc(50%-0.5rem)] transform -translate-y-1/2 w-6 h-0.5 bg-border -ml-3"></div>
                  )}
                  {index % 2 === 1 && (
                    <div className="absolute top-1/2 left-[calc(50%+0.5rem)] transform -translate-y-1/2 w-6 h-0.5 bg-border -ml-3"></div>
                  )}

                  {/* Left side card */}
                  {index % 2 === 0 && (
                    <div className="w-1/2 pr-6">
                      <div className="ml-auto w-full max-w-md">
                        <TerminalCard>
                          <div className="mb-2">
                            <span className="text-primary font-mono text-lg">{new Date(edu.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                            <span className="text-muted-foreground font-mono mx-2">-</span>
                            <span className="text-muted-foreground font-mono">{new Date(edu.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                          </div>
                          <h3 className="text-xl font-mono font-bold text-foreground mb-2">{edu.title}</h3>
                          <p className="text-primary font-mono mb-3">{edu.company}</p>
                          <p className="text-sm font-mono text-muted-foreground leading-relaxed">{edu.description}</p>
                        </TerminalCard>
                      </div>
                    </div>
                  )}

                  {/* Right side card */}
                  {index % 2 === 1 && (
                    <div className="w-1/2 pl-6 ml-auto">
                      <div className="w-full max-w-md">
                        <TerminalCard>
                          <div className="mb-2">
                            <span className="text-primary font-mono text-lg">{new Date(edu.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                            <span className="text-muted-foreground font-mono ml-2">{new Date(edu.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                          </div>
                          <h3 className="text-xl font-mono font-bold text-foreground mb-2">{edu.title}</h3>
                          <p className="text-primary font-mono mb-3">{edu.company}</p>
                          <p className="text-sm font-mono text-muted-foreground leading-relaxed">{edu.description}</p>
                        </TerminalCard>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.7}>
            <h2 className="text-4xl font-mono font-bold text-primary mb-12 terminal-prompt">contact_</h2>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <TerminalCard title="send_message.sh">
                <h3 className="text-2xl font-mono font-bold text-primary">Send Message</h3>
                <ContactForm />
              </TerminalCard>

              {/* Contact Info */}
              <div className="space-y-6">
                <TerminalCard title="contact_info.json">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <a
                        href="mailto:nathija.jayasinghe@gmail.com"
                        className="font-mono text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        nathija.jayasinghe@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <a
                        href="https://maps.app.goo.gl/WxDeZmFWGLD6fZ9H8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        Sri Lanka
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <a
                        href="tel:+94761231133"
                        className="font-mono text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        +94 76 123 1133
                      </a>
                    </div>
                  </div>
                </TerminalCard>

                <TerminalCard title="social_links.sh">
                  <h3 className="text-xl font-mono font-bold text-primary mb-4">Connect With Me</h3>
                  <div className="space-y-3">
                    <a
                      href="https://www.facebook.com/nathija.nimantha.5/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      <Facebook className="w-5 h-5" />
                      <span className="font-mono">Facebook</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/nathija-nimantha/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="font-mono">LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/nathija-nimantha"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      <Github className="w-5 h-5" />
                      <span className="font-mono">GitHub</span>
                    </a>
                    <a
                      href="https://www.instagram.com/nwooy_to_morrow/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      <Instagram className="w-5 h-5" />
                      <span className="font-mono">Instagram</span>
                    </a>
                    <a
                      href="https://x.com/N_N_Jayasinghe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      <X className="w-5 h-5" />
                      <span className="font-mono">Twitter / X</span>
                    </a>
                  </div>
                </TerminalCard>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-mono text-muted-foreground">
            <span className="text-primary">$</span> echo &quot;© 2025 Nathija Nimantha. All rights reserved.&quot;
          </p>
        </div>
      </footer>
    </div>
  )
}
