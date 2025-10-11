import { MetadataRoute } from 'next'
import { client } from '@/app/lib/contentful'
import type { Entry, EntrySkeletonType } from 'contentful'

interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPomodoro'
  fields: {
    slug: string
    date?: string
  }
}

function getLastModified(post: Entry<BlogPostSkeleton>): Date {
  const fields = post.fields as { slug: string; date?: string }

  if (fields.date && typeof fields.date === 'string') {
    return new Date(fields.date)
  }
  if (post.sys.updatedAt && typeof post.sys.updatedAt === 'string') {
    return new Date(post.sys.updatedAt)
  }
  return new Date()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://usepomodoro.digital'

  // Rotas estáticas
  const staticRoutes: MetadataRoute.Sitemap = ['', '/pomodoro', '/blog'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: route === '' ? 1 : 0.8,
    }),
  )

  let posts: Entry<BlogPostSkeleton>[] = []

  try {
    const response = await client.getEntries<BlogPostSkeleton>({
      content_type: 'blogPomodoro',
    })
    posts = response.items
  } catch (error) {
    console.error('Erro ao buscar posts do Contentful no sitemap:', error)
    posts = []
  }

  // Type guard para garantir que post.fields existe e tem slug
  const validPosts = posts.filter(
    (post): post is Entry<BlogPostSkeleton> =>
      !!post.fields && typeof post.fields.slug === 'string',
  )

  const blogPosts: MetadataRoute.Sitemap = validPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.fields.slug}`,
    lastModified: getLastModified(post),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogPosts]
}
