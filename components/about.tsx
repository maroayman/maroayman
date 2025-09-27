export function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="text-lg mb-4">
              <span className="text-primary">$</span> cat about.md
            </div>
          </div>

          <div className="space-y-6 text-foreground">
            <div className="border-l-2 border-primary pl-4 space-y-4">
              <div className="text-secondary"># About Me</div>

              <div className="text-muted-foreground leading-relaxed">
                I'm a driven and technically adept Computer Science graduate (2023) with a passion for optimizing
                software delivery. My core development skills in C, Python, and Java, coupled with database management
                expertise (MySQL, SQL Server, Power BI), provide a solid foundation for DevOps and software development.
              </div>

              <div className="text-muted-foreground leading-relaxed">
                I'm particularly keen to learn and apply DevOps methodologies to enhance system reliability, automate
                processes, and contribute to efficient software lifecycles. Currently expanding my skills through the
                Digital Egypt Pioneers Initiative.
              </div>

              <div className="text-secondary mt-6">## Core Focus Areas</div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <div>
                    <span className="text-primary font-semibold">Automation:</span>
                    <span className="text-muted-foreground ml-2">
                      Streamlining processes through CI/CD pipelines and infrastructure automation
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <div>
                    <span className="text-primary font-semibold">Reliability:</span>
                    <span className="text-muted-foreground ml-2">
                      Ensuring system stability, monitoring, and maintaining high availability
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-accent">•</span>
                  <div>
                    <span className="text-primary font-semibold">Optimization:</span>
                    <span className="text-muted-foreground ml-2">
                      Improving deployment speed, resource efficiency, and system performance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
