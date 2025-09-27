"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import { formatDate, formatReadTime, fetchHashnodeArticles } from "@/lib/hashnode"
import { currentConfig } from "@/config/portfolio"
import { ExternalLink, Calendar, Clock, Search, BookOpen, Hash, Loader2, RefreshCw, Code, Database, Filter, X, ChevronDown } from "lucide-react"

interface Article {
  id: string
  title: string
  brief: string | null
  slug: string
  published_at: string
  read_time_minutes: number | null
  cover_image_url: string | null
  url: string
  series_name: string | null
  series_slug: string | null
  tags: Array<{ name: string; slug: string }>
}

interface Series {
  id: number
  name: string
  slug: string
  description: string | null
  total_posts: number
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [series, setSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagSearchTerm, setTagSearchTerm] = useState("")
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)
  const [lastSync, setLastSync] = useState<string | null>(null)
  
  // API Response state
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [apiLoading, setApiLoading] = useState(false)

  // Load articles data directly during build
  const loadArticlesData = async () => {
    try {
      setLoading(true)
      const data = await fetchHashnodeArticles('maroayman', 1, 20)
      setArticles(data.articles || [])
      setLastSync(new Date().toISOString())
    } catch (error) {
      console.error('Error loading articles:', error)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  // Auto-refresh functionality (only for development)
  useEffect(() => {
    loadArticlesData()
    
    if (!currentConfig.showDebugControls) {
      return // Skip auto-refresh in production for static sites
    }
    
    // Set up interval for auto-refresh (10 minutes)
    const interval = setInterval(loadArticlesData, 10 * 60 * 1000)
    
    // Set up visibility change listener
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadArticlesData()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Rest of the component logic remains the same...
  const syncFromDatabase = async () => {
    setSyncing(true)
    try {
      await loadArticlesData()
    } finally {
      setSyncing(false)
    }
  }

  const fetchFromAPI = async () => {
    setApiLoading(true)
    try {
      await loadArticlesData()
    } finally {
      setApiLoading(false)
    }
  }

  // Get all unique tags
  const allTags = Array.from(
    new Set(articles.flatMap(article => article.tags.map(tag => tag.name)))
  ).sort()

  // Filter tags based on search term
  const filteredTags = allTags.filter(tag =>
    tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
  )

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // Clear all selected tags
  const clearAllTags = () => {
    setSelectedTags([])
  }

  // Filter articles based on search and selected tags/series
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.brief && article.brief.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => article.tags.some(articleTag => articleTag.name === tag))
    
    const matchesSeries = !selectedSeries || article.series_slug === selectedSeries

    return matchesSearch && matchesTags && matchesSeries
  })

  // Group articles by series
  const groupedArticles = filteredArticles.reduce((acc, article) => {
    const key = article.series_name || 'Individual Articles'
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(article)
    return acc
  }, {} as Record<string, Article[]>)

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading articles...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

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

        {/* Debug Controls (Development Only) */}
        {currentConfig.showDebugControls && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                <Code className="h-5 w-5" />
                Development Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={syncFromDatabase}
                  disabled={syncing}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
                  Sync from Database
                </Button>
                
                <Button 
                  onClick={fetchFromAPI}
                  disabled={apiLoading}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {apiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  Fetch from API
                </Button>
              </div>
              
              {lastSync && (
                <p className="text-sm text-muted-foreground mt-2">
                  Last synced: {new Date(lastSync).toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
                  <p className="text-sm font-medium text-muted-foreground">Unique Tags</p>
                  <p className="text-2xl font-bold">{allTags.length}</p>
                </div>
                <Hash className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Series</p>
                  <p className="text-2xl font-bold">{Object.keys(groupedArticles).length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Tag Filter with Search */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Tags ({selectedTags.length})
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="Search tags..."
                      value={tagSearchTerm}
                      onChange={(e) => setTagSearchTerm(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {filteredTags.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        No tags found
                      </p>
                    ) : (
                      filteredTags.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tag-${tag}`}
                            checked={selectedTags.includes(tag)}
                            onCheckedChange={() => toggleTag(tag)}
                          />
                          <label
                            htmlFor={`tag-${tag}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                          >
                            {tag}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {selectedTags.length > 0 && (
                    <div className="pt-2 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAllTags}
                        className="w-full"
                      >
                        Clear All Tags
                      </Button>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* Clear Filters Button */}
            {(selectedTags.length > 0 || searchTerm || selectedSeries) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedTags([])
                  setSelectedSeries(null)
                }}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => toggleTag(tag)}
                >
                  {tag} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredArticles.length} of {articles.length} articles
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedTags.length > 0 && ` with tags: ${selectedTags.join(", ")}`}
          </p>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                {articles.length === 0 
                  ? "No articles are available at the moment."
                  : "Try adjusting your search terms or filters."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="grid" className="space-y-6">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="series">By Series</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    {article.cover_image_url && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img 
                          src={article.cover_image_url} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">
                        {article.title}
                      </CardTitle>
                      {article.series_name && (
                        <Badge variant="outline" className="w-fit">
                          {article.series_name}
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
                          {formatDate(article.published_at)}
                        </div>
                        {article.read_time_minutes && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatReadTime(article.read_time_minutes)}
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
            </TabsContent>

            <TabsContent value="series" className="space-y-8">
              {Object.entries(groupedArticles).map(([seriesName, seriesArticles]) => (
                <div key={seriesName}>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    {seriesName}
                    <Badge variant="outline">{seriesArticles.length} articles</Badge>
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {seriesArticles.map((article) => (
                      <Card key={article.id} className="hover:shadow-lg transition-shadow">
                        {article.cover_image_url && (
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <img 
                              src={article.cover_image_url} 
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="line-clamp-2 text-base">
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {article.brief && (
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                              {article.brief}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(article.published_at)}
                            </div>
                            {article.read_time_minutes && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatReadTime(article.read_time_minutes)}
                              </div>
                            )}
                          </div>

                          <Link 
                            href={article.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                          >
                            Read Article
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}