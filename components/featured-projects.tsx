"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Code, ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredProjects = [
  {
    title: "Flask Notes App - Production Deployment",
    description: "Complete end-to-end web application deployed on AWS EC2 with production-ready features",
    technologies: ["Flask", "MySQL", "Docker", "AWS EC2", "Nginx"],
    github: "https://github.com/maroayman/depi-project-3",
    type: "Personal",
  },
  {
    title: "Go Application Web Note App",
    description: "Go-based web application with automated deployment and scheduled tasks",
    technologies: ["Go", "SQLite", "Ansible", "DevOps"],
    github: "https://github.com/maroayman/depi-project-2/",
    type: "Personal",
  },
]

export function FeaturedProjects() {
  return (
    <section id="featured-projects" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary">$ ls featured_projects/</h2>
            <Button
              variant="outline"
              asChild
              className="bg-transparent border-primary text-primary hover:bg-primary hover:text-black"
            >
              <Link href="/projects" className="flex items-center gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                className="border-primary/20 hover:border-primary transition-all duration-300 group cursor-pointer bg-background/50"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Code className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs ml-auto">
                          {project.type}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform ml-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-5 w-5 text-primary" />
                      </Link>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
