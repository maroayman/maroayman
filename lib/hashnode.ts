export interface HashnodeArticle {
  id: string
  title: string
  brief: string
  slug: string
  publishedAt: string
  readTimeInMinutes: number
  tags: Array<{
    name: string
    slug: string
  }>
  series?: {
    name: string
    slug: string
  }
  coverImage?: {
    url: string
  }
  url: string
}

export interface HashnodeSeries {
  name: string
  slug: string
  description?: string
  posts: {
    totalDocuments: number
  }
}

const HASHNODE_API_URL = "https://gql.hashnode.com/"

// GraphQL query to fetch user's articles
const GET_USER_ARTICLES = `
  query GetUserArticles($username: String!, $pageSize: Int!, $page: Int!) {
    user(username: $username) {
      posts(pageSize: $pageSize, page: $page) {
        totalDocuments
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        nodes {
          id
          title
          brief
          slug
          publishedAt
          readTimeInMinutes
          tags {
            name
            slug
          }
          series {
            name
            slug
          }
          coverImage {
            url
          }
          url
        }
      }
    }
  }
`

// GraphQL query to fetch user's series
const GET_USER_SERIES = `
  query GetUserSeries($username: String!) {
    user(username: $username) {
      publications(first: 1) {
        edges {
          node {
            seriesList(first: 10) {
              edges {
                node {
                  name
                  slug
                  description {
                    text
                  }
                  posts(first: 1) {
                    totalDocuments
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export async function fetchHashnodeArticles(
  username: string,
  page = 1,
  pageSize = 20,
): Promise<{ articles: HashnodeArticle[]; totalCount: number }> {
  try {
    const limitedPageSize = Math.min(pageSize, 20)

    const response = await fetch(HASHNODE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_USER_ARTICLES,
        variables: { username, pageSize: limitedPageSize, page },
      }),
    })

    const data = await response.json()

    if (data.errors) {
      console.error("Hashnode API errors:", data.errors)
      return { articles: [], totalCount: 0 }
    }

    const posts = data.data?.user?.posts
    if (!posts) {
      return { articles: [], totalCount: 0 }
    }

    const articles: HashnodeArticle[] = posts.nodes.map((node: any) => ({
      id: node.id,
      title: node.title,
      brief: node.brief,
      slug: node.slug,
      publishedAt: node.publishedAt,
      readTimeInMinutes: node.readTimeInMinutes,
      tags: node.tags || [],
      series: node.series,
      coverImage: node.coverImage,
      url: node.url,
    }))

    return {
      articles,
      totalCount: posts.totalDocuments,
    }
  } catch (error) {
    console.error("Error fetching Hashnode articles:", error)
    return { articles: [], totalCount: 0 }
  }
}

export async function fetchHashnodeSeries(username: string): Promise<HashnodeSeries[]> {
  try {
    const response = await fetch(HASHNODE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_USER_SERIES,
        variables: { username },
      }),
    })

    const data = await response.json()

    if (data.errors) {
      console.error("Hashnode API errors:", data.errors)
      return []
    }

    const publications = data.data?.user?.publications?.edges
    if (!publications || publications.length === 0) {
      return []
    }

    const seriesList = publications[0]?.node?.seriesList
    if (!seriesList) {
      return []
    }

    return seriesList.edges.map((edge: any) => ({
      name: edge.node.name,
      slug: edge.node.slug,
      description: edge.node.description?.text,
      posts: edge.node.posts,
    }))
  } catch (error) {
    console.error("Error fetching Hashnode series:", error)
    return []
  }
}

// Utility function to format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Utility function to format read time
export function formatReadTime(minutes: number): string {
  return `${minutes} min read`
}
