"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["C", "Python", "Java", "Go"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "Kubernetes", "Ansible", "Terraform"],
  },
  {
    title: "Operating Systems",
    skills: ["Windows", "Linux"],
  },
  {
    title: "Data Analysis",
    skills: ["PowerBI", "Excel"],
  },
  {
    title: "Cloud Platforms",
    skills: ["Huawei Cloud", "Amazon Web Services", "Microsoft Azure", "Google Cloud Platform"],
  },
  {
    title: "Databases",
    skills: ["SQL Server", "MySQL", "MariaDB"],
  },
]

export function Skills() {
  const [openCategories, setOpenCategories] = useState<{ [key: number]: boolean }>({})

  const toggleCategory = (index: number) => {
    setOpenCategories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">Technical Skills</h2>

          <div className="space-y-4">
            {skillCategories.map((category, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <Collapsible open={openCategories[index]} onOpenChange={() => toggleCategory(index)}>
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between py-4">
                      <CardTitle className="text-lg text-left">{category.title}</CardTitle>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openCategories[index] ? "rotate-180" : ""}`}
                      />
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="text-sm text-muted-foreground">{category.skills.join(" • ")}</div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
