import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"

const certifications = [
  {
    title: "Huawei Cloud Associate - Tech Essentials",
    provider: "Huawei",
    category: "Cloud",
  },
  {
    title: "Huawei Cloud Certified Developer Associate - AI",
    provider: "Huawei",
    category: "AI/Cloud",
  },
  {
    title: "AWS Cloud Practitioner",
    provider: "Amazon Web Services",
    category: "Cloud",
  },
  {
    title: "Introduction to Azure",
    provider: "Microsoft",
    category: "Cloud",
  },
  {
    title: "Introduction to Linux",
    provider: "The Linux Foundation",
    category: "Operating Systems",
  },
  {
    title: "Introduction to Cloud Infrastructure Technologies",
    provider: "The Linux Foundation",
    category: "Cloud",
  },
  {
    title: "Introduction to Kubernetes",
    provider: "The Linux Foundation + KodeKloud + DataCamp",
    category: "DevOps",
  },
]

export function Certifications() {
  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">Certifications</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="h-full hover:shadow-lg hover:border-primary/40 transition-all duration-300 border-primary/20"
              >
                <CardHeader className="text-center pb-4">
                  <Award className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <CardTitle className="text-lg leading-tight">{cert.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-3 text-sm leading-relaxed">{cert.provider}</p>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {cert.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
