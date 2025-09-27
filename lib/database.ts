import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface DatabaseArticle {
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
  created_at: string
  updated_at: string
}

export interface DatabaseSeries {
  id: number
  name: string
  slug: string
  description: string | null
  total_posts: number
  created_at: string
  updated_at: string
}

export interface DatabaseArticleTag {
  id: number
  article_id: string
  tag_name: string
  tag_slug: string
  created_at: string
}

// Get all articles with their tags
export async function getArticlesFromDatabase(): Promise<{
  articles: Array<DatabaseArticle & { tags: Array<{ name: string; slug: string }> }>
}> {
  try {
    // Get articles
    const articles = await sql`
      SELECT * FROM articles 
      ORDER BY published_at DESC
    `

    // Get tags for all articles
    const tags = await sql`
      SELECT article_id, tag_name, tag_slug 
      FROM article_tags
    `

    // Combine articles with their tags
    const articlesWithTags = articles.map((article) => ({
      ...article,
      tags: tags
        .filter((tag) => tag.article_id === article.id)
        .map((tag) => ({ name: tag.tag_name, slug: tag.tag_slug })),
    }))

    return { articles: articlesWithTags }
  } catch (error) {
    console.error("Error fetching articles from database:", error)
    return { articles: [] }
  }
}

// Get all series
export async function getSeriesFromDatabase(): Promise<DatabaseSeries[]> {
  try {
    const series = await sql`
      SELECT * FROM series 
      ORDER BY name ASC
    `
    return series
  } catch (error) {
    console.error("Error fetching series from database:", error)
    return []
  }
}

// Sync articles from Hashnode to database
export async function syncArticlesToDatabase(articles: any[], series: any[]) {
  try {
    // Clear existing data
    await sql`DELETE FROM article_tags`
    await sql`DELETE FROM articles`
    await sql`DELETE FROM series`

    // Insert series
    for (const s of series) {
      await sql`
        INSERT INTO series (name, slug, description, total_posts)
        VALUES (${s.name}, ${s.slug}, ${s.description || null}, ${s.posts.totalDocuments})
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          total_posts = EXCLUDED.total_posts,
          updated_at = CURRENT_TIMESTAMP
      `
    }

    // Insert articles
    for (const article of articles) {
      await sql`
        INSERT INTO articles (
          id, title, brief, slug, published_at, read_time_minutes, 
          cover_image_url, url, series_name, series_slug
        )
        VALUES (
          ${article.id}, 
          ${article.title}, 
          ${article.brief || null}, 
          ${article.slug}, 
          ${article.publishedAt}, 
          ${article.readTimeInMinutes || null},
          ${article.coverImage?.url || null}, 
          ${article.url}, 
          ${article.series?.name || null}, 
          ${article.series?.slug || null}
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          brief = EXCLUDED.brief,
          slug = EXCLUDED.slug,
          published_at = EXCLUDED.published_at,
          read_time_minutes = EXCLUDED.read_time_minutes,
          cover_image_url = EXCLUDED.cover_image_url,
          url = EXCLUDED.url,
          series_name = EXCLUDED.series_name,
          series_slug = EXCLUDED.series_slug,
          updated_at = CURRENT_TIMESTAMP
      `

      // Insert tags for this article
      for (const tag of article.tags || []) {
        await sql`
          INSERT INTO article_tags (article_id, tag_name, tag_slug)
          VALUES (${article.id}, ${tag.name}, ${tag.slug})
        `
      }
    }

    console.log(`Synced ${articles.length} articles and ${series.length} series to database`)
    return { success: true, articlesCount: articles.length, seriesCount: series.length }
  } catch (error) {
    console.error("Error syncing articles to database:", error)
    throw error
  }
}
