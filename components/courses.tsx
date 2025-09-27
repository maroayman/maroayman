import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"

const courses = [
  {
    title: "Introduction to Network Security",
    provider: "ITI",
    category: "Security",
  },
  {
    title: "Computer Network Fundamentals",
    provider: "ITI",
    category: "Networking",
  },
]

export function Courses() {
  return (
    <section id="courses" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Additional Courses</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <BookOpen className="h-8 w-8 mx-auto mb-3 text-green-600" />
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-3">{course.provider}</p>
                  <Badge variant="outline">{course.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
