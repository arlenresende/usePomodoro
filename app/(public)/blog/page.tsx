import { client } from '@/app/lib/contentful'
import Header from '@/components/header'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | usepomodoro',
  description:
    'Artigos sobre produtividade, gestão de tempo e técnica Pomodoro para ajudar você a alcançar melhores resultados.',
  keywords: ['pomodoro', 'produtividade', 'gestão de tempo', 'foco', 'estudos'],
  authors: [{ name: 'usepomodoro' }],
  creator: 'usepomodoro',
  publisher: 'usepomodoro',
  openGraph: {
    title: 'Blog | usepomodoro',
    description:
      'Artigos sobre produtividade, gestão de tempo e técnica Pomodoro para ajudar você a alcançar melhores resultados.',
    url: 'https://usepomodoro.digital/blog',
    siteName: 'usepomodoro',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | usepomodoro',
    description:
      'Artigos sobre produtividade, gestão de tempo e técnica Pomodoro para ajudar você a alcançar melhores resultados.',
    creator: '@usepomodoro',
    site: '@usepomodoro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

interface ContentfulPost {
  sys: { id: string }
  fields: {
    title?: string
    slug?: string
    shortTitle?: string
    date?: string
    categoria?: string
    content?: unknown
  }
}

export default async function BlogPage() {
  let posts: ContentfulPost[] = []

  try {
    const response = await client.getEntries({
      content_type: 'blogPomodoro',
    })
    posts = response.items as ContentfulPost[]
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
  }

  return (
    <div className="container-none mx-auto py-4 lg:py-12 px-4 lg:px-12 min-h-screen flex flex-col ">
      <Header />
      <div className="container mx-auto mt-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="grid gap-8">
          {posts.length === 0 ? (
            <p className="text-gray-600">Nenhum post encontrado.</p>
          ) : (
            posts.map((post) => (
              <Link key={post.sys.id} href={`/blog/${post.fields.slug || ''}`}>
                <article className="border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-1 hover:border-orange-400 ">
                  <h2 className="text-2xl font-semibold mb-2 ">
                    {post.fields.title}
                  </h2>
                  {post.fields.shortTitle && (
                    <p className=" mb-4">{post.fields.shortTitle}</p>
                  )}
                  <div className="flex items-center gap-3 text-sm ">
                    {post.fields.categoria && (
                      <span className="uppercase text-orange-600 bg-orange-50 px-2 py-1 rounded tracking-widest">
                        {post.fields.categoria}
                      </span>
                    )}
                    {post.fields.date && (
                      <time dateTime={post.fields.date}>
                        {new Date(post.fields.date).toLocaleDateString(
                          'pt-BR',
                          {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          },
                        )}
                      </time>
                    )}
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
