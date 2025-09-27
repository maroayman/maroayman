import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatDate, formatReadTime, fetchHashnodeArticles } from "@/lib/hashnode"
import { ExternalLink, Calendar, Clock, BookOpen } from "lucide-react"

interface Article {
  id: string
  title: string
  brief: string | null
  slug: string
  publishedAt: string
  readTimeInMinutes: number | null
  coverImage: { url: string } | null
  url: string
  series: { name: string; slug: string } | null
  tags: Array<{ name: string; slug: string }>
}

// This function runs at build time to get articles
async function getArticles(): Promise<Article[]> {
  try {
    const data = await fetchHashnodeArticles('maroayman', 1, 20)
    return data.articles || []
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">📚 Articles & Blog Posts</h1>
          <p className="text-muted-foreground text-lg">
            Latest articles from my Hashnode blog - insights on software development, technology, and programming.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Articles</p>
                  <p className="text-2xl font-bold">{articles.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Blog Platform</p>
                  <p className="text-lg font-semibold">Hashnode</p>
                </div>
                <ExternalLink className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Articles will be loaded during the next build. Check back soon!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                {article.coverImage?.url && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={article.coverImage.url} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    {article.title}
                  </CardTitle>
                  {article.series?.name && (
                    <Badge variant="outline" className="w-fit">
                      {article.series.name}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  {article.brief && (
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {article.brief}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(article.publishedAt)}
                    </div>
                    {article.readTimeInMinutes && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatReadTime(article.readTimeInMinutes)}
                      </div>
                    )}
                  </div>

                  {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag.slug} variant="secondary" className="text-xs">
                          {tag.name}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{article.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  <Link 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                  >
                    Read Article
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Want to see more articles? Visit my blog at{" "}
            <Link 
              href="https://maroayman.hashnode.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              maroayman.hashnode.dev
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}