import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, CheckCircle } from "lucide-react"

export function ProfessionalDevelopment() {
  return (
    <section id="professional-development" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">Professional Development</h2>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Digital Egypt Pioneers Initiative
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4" />
                    June 2025 - December 2025
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Comprehensive Cloud and DevOps professional training program focusing on modern infrastructure and
                deployment practices.
              </p>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Technologies Learned
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">AWS</Badge>
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">Ansible</Badge>
                  <Badge variant="secondary">Kubernetes</Badge>
                  <Badge variant="secondary">Terraform</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Expected Learning Outcomes</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Advanced cloud architecture and services</li>
                  <li>• Azure DevOps and CI/CD pipeline implementation</li>
                  <li>• Infrastructure as Code best practices</li>
                  <li>• Container orchestration and microservices</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Projects Completed</h4>
                <p className="text-muted-foreground">
                  Successfully completed 4 hands-on projects demonstrating practical application of cloud and DevOps
                  technologies.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
