"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    title: "Platformer Game",
    github: "https://github.com/maroayman/unity-game",
    technologies: ["Unity", "C#"],
    features: [
      "Built with Unity and C-Sharp",
      "Collaborated with one team to design and develop a 2D platformer game",
      "Worked with another team to source and integrate free licensed sounds and assets",
      "Enhanced gameplay experience through asset integration",
    ],
  },
  {
    title: "Football Club Dashboard",
    github: null,
    technologies: ["Microsoft Power BI"],
    features: [
      "Built with Microsoft Power BI",
      "Collaborated with a team to create visualizations from a Kaggle dataset (CSV format)",
      "Dashboard showcased team history and performance metrics",
      "Displayed goals scored, goals conceded, and statistical analysis",
    ],
  },
  {
    title: "Linux Terminal Project for Operating Systems Course",
    github: "https://github.com/maroayman/Operating-System-FCIH-College-Task-",
    technologies: ["C", "Linux"],
    features: [
      "Built with C programming language",
      "Enables creation of links (shortcuts) for files and directories",
      "Designed for Linux environment (Ubuntu)",
      "Enhanced file organization and accessibility within the terminal",
    ],
  },
  {
    title: "File Encryption and Decryption",
    github: null,
    technologies: ["Python"],
    features: [
      "Built with Python",
      "Focuses on securing sensitive data",
      "Implemented encryption and decryption techniques using hashing algorithms",
      "Ensured data integrity and protection against unauthorized access",
    ],
  },
  {
    title: "Learning Management System",
    github: "https://github.com/maroayman/Learning-System",
    technologies: ["Java", "OOP"],
    features: [
      "Java-based learning management system using OOP principles",
      "Enables teachers to log and update student grades",
      "Grants students read-only access to their records",
      "Features role-based access control for data integrity and transparency",
    ],
  },
  {
    title: "E-Commerce Website - Graduation Project",
    github: null,
    technologies: ["Angular", "ASP.NET", "Bootstrap", "SQL Server", "JavaScript", "HTML", "CSS"],
    features: [
      "Full-stack e-commerce platform",
      "Features innovative suggestion system recommending related YouTube videos",
      "Built with Angular, ASP.NET, Bootstrap, and SQL Server",
      "Contributed to database linking and integration",
    ],
  },
]

export function AcademicProjects() {
  return (
    <section id="academic-projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">Academic Projects</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="h-full border-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg mb-3 flex items-center gap-2 group-hover:text-primary transition-colors">
                    {project.title}
                    {project.github && (
                      <Link
                        href={project.github}
                        className="text-primary hover:text-primary/80 transition-colors hover:scale-110 transform"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                    )}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-sm text-muted-foreground flex items-start gap-2 group-hover:text-foreground transition-colors"
                      >
                        <span className="text-primary mt-1.5 text-xs">●</span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
