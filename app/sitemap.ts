import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://usepomodoro.digital'

  const staticRoutes = ['', '/pomodoro', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Define os posts do blog manualmente para corresponder aos posts definidos em blog/page.tsx
  const blogPosts = [
    'como-usar-pomodoro-para-aumentar-produtividade',
    'dicas-para-manter-foco-durante-estudos',
    'gerenciando-projetos-com-pomodoro',
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogPosts]
}
