import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, Users, Target } from "lucide-react"

export function Volunteering() {
  return (
    <section id="volunteering" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Volunteering & Leadership</h2>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Digital Egypt Pioneers Initiative
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4" />
                    June 2025 – Present • Cairo, Egypt
                  </CardDescription>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      Group Leader Volunteer
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Leading and mentoring a peer group in the Cloud and DevOps professional training program, fostering
                collaborative learning and supporting participants in their technical journey.
              </p>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Key Achievements
                </h4>
                <ul className="text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    Guided and supported a peer group of 20 DEPI participants, fostering a collaborative learning
                    environment
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    Established and maintained a Google Drive repository, enhancing accessibility of external resources
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    Coordinated online and in-person study sessions to reinforce core Cloud and DevOps concepts
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    Mentored junior participants, helping them overcome project and technical challenges
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Skills & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Leadership</Badge>
                  <Badge variant="secondary">Mentoring</Badge>
                  <Badge variant="secondary">Cloud Computing</Badge>
                  <Badge variant="secondary">DevOps</Badge>
                  <Badge variant="secondary">Team Coordination</Badge>
                  <Badge variant="secondary">Resource Management</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
