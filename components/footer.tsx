import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { HashnodeIcon } from "@/components/icons/hashnode-icon"

export function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <Link
              href="https://github.com/maroayman"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/maroayman"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://hashnode.com/@maroayman"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <HashnodeIcon className="h-6 w-6" />
              <span className="sr-only">Hashnode Blog</span>
            </Link>
            <Link
              href="mailto:marwanayman.shawky@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </Link>
          </div>

          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Marwan Ayman Shawky. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
