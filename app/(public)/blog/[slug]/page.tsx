/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

import Footer from '@/components/footer'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { client } from '@/app/lib/contentful'
import Header from '@/components/header'

interface ContentfulArticle {
  sys: {
    id: string
  }
  fields: {
    title?: string
    shortTitle?: string
    slug?: string
    date?: string
    content?: any
    category?: string
    github?: string
    demo?: string
  }
}

async function getArticleBySlug(
  slug: string,
): Promise<ContentfulArticle | null> {
  try {
    const response = await client.getEntries({
      content_type: 'blogPomodoro',
      'fields.slug': slug,
      limit: 1,
    })

    const articles = response.items as ContentfulArticle[]
    return articles.length > 0 ? articles[0] : null
  } catch (error) {
    console.error('Erro ao buscar artigo:', error)
    return null
  }
}

function extractTextFromRichText(content: any): string {
  if (!content || !content.content) return ''

  function nodeToText(node: any): string {
    if (node.nodeType === 'text') return node.value
    if (node.content) return node.content.map(nodeToText).join(' ')
    return ''
  }

  try {
    return content.content
      .map(nodeToText)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 160)
  } catch (error) {
    console.log('Erro ao extrair texto:', error)
    return ''
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return { title: 'Artigo não encontrado' }
  }

  const title = article.fields?.title || 'Sem título'
  const shortTitle = article.fields?.shortTitle || ''
  const category = article.fields?.category || ''
  const date = article.fields?.date || ''
  const rawContent = article.fields?.content

  const description =
    extractTextFromRichText(rawContent) || shortTitle || `Artigo sobre ${title}`

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://usepomodoro.digital'}/${slug}`

  return {
    title: `${title} | usepomodoro`,
    description,
    keywords: [category, title, shortTitle].filter(Boolean),
    authors: [{ name: 'usepomodoro' }],
    creator: 'usepomodoro',
    publisher: 'usepomodoro',
    openGraph: {
      title: `${title} | usepomodoro`,
      description,
      url: canonicalUrl,
      siteName: 'usepomodoro',
      locale: 'pt_BR',
      type: 'article',
      publishedTime: date || undefined,
      authors: ['usepomodoro'],
      tags: [category, title].filter(Boolean),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | usepomodoro`,
      description,
      creator: '@usepomodoro',
      site: '@usepomodoro',
    },
    alternates: {
      canonical: canonicalUrl,
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
    category: category || 'Blog',
    classification: 'Educational',
    verification: {},
  }
}

function processContentfulRichText(content: any): string {
  if (!content || !content.content) {
    return '<p>Conteúdo não disponível</p>'
  }

  function nodeToHtml(node: any): string {
    if (node.nodeType === 'text') return node.value
    if (node.nodeType === 'paragraph')
      return `<p class="mb-4">${node.content?.map(nodeToHtml).join('') || ''}</p>`
    if (node.nodeType === 'heading-1')
      return `<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900">${node.content?.map(nodeToHtml).join('') || ''}</h1>`
    if (node.nodeType === 'heading-2')
      return `<h2 class="text-2xl font-semibold mt-6 mb-3 text-gray-800">${node.content?.map(nodeToHtml).join('') || ''}</h2>`
    if (node.nodeType === 'heading-3')
      return `<h3 class="text-xl font-medium mt-4 mb-2 text-gray-700">${node.content?.map(nodeToHtml).join('') || ''}</h3>`
    if (node.nodeType === 'unordered-list')
      return `<ul class="mb-4 ml-4">${node.content?.map(nodeToHtml).join('') || ''}</ul>`
    if (node.nodeType === 'ordered-list')
      return `<ol class="mb-4 ml-4 list-decimal">${node.content?.map(nodeToHtml).join('') || ''}</ol>`
    if (node.nodeType === 'list-item')
      return `<li class="mb-1 list-disc">${node.content?.map(nodeToHtml).join('') || ''}</li>`
    if (node.nodeType === 'blockquote')
      return `<blockquote class="border-l-4 border-gray-300 pl-4 mb-4 italic">${node.content?.map(nodeToHtml).join('') || ''}</blockquote>`
    if (node.nodeType === 'hr') return '<hr class="my-6 border-gray-300">'

    if (node.content) {
      let html = node.content.map(nodeToHtml).join('')
      if (node.marks) {
        node.marks.forEach((mark: any) => {
          if (mark.type === 'bold') {
            html = `<strong class="font-semibold text-gray-900">${html}</strong>`
          }
          if (mark.type === 'italic') {
            html = `<em class="italic">${html}</em>`
          }
          if (mark.type === 'code') {
            html = `<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">${html}</code>`
          }
        })
      }
      return html
    }

    return ''
  }

  try {
    return content.content.map(nodeToHtml).join('')
  } catch (error) {
    console.error('Erro ao processar Rich Text:', error)
    return '<p>Erro ao carregar conteúdo</p>'
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const title = article.fields?.title || 'Sem título'
  const shortTitle = article.fields?.shortTitle || ''
  const categoria = article.fields?.category || ''
  const rawContent = article.fields?.content
  const date = article.fields?.date || ''
  const processedContent = processContentfulRichText(rawContent)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: extractTextFromRichText(rawContent) || shortTitle,
            author: {
              '@type': 'Person',
              name: 'Arlen Resende',
              url: 'https://www.arlenresende.me',
            },
            publisher: {
              '@type': 'Organization',
              name: 'arlenresende.me',
              logo: {
                '@type': 'ImageObject',
                url: 'https://seusite.com/logo.png',
              },
            },
            datePublished: date || new Date().toISOString(),
            dateModified: date || new Date().toISOString(),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://usepomodoro.digital'}/${slug}`,
            },
            articleSection: categoria,
            keywords: [categoria, title].filter(Boolean).join(', '),
          }),
        }}
      />

      <div className="container-none mx-auto py-4 lg:py-12 px-4 lg:px-12 min-h-screen flex flex-col ">
        <Header />
        <div className="flex-1 lg:flex-[7] min-h-screen flex flex-col">
          <div className="flex-shrink-0 p-6 lg:px-12 lg:pt-12 pb-0">
            <div className="flex items-center justify-between mb-8">
              <Link href="/blog">
                <Button variant="ghost">
                  <ArrowLeft size={20} />
                  Voltar
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 ">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <div className="flex items-center gap-4 mb-8">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    {shortTitle && <p className="">{shortTitle}</p>}
                    <div className="flex items-center gap-4 mt-2">
                      {categoria && (
                        <span className="text-xs uppercase px-2 py-1 rounded tracking-widest">
                          {categoria}
                        </span>
                      )}
                      {date && (
                        <time dateTime={date} className="text-sm text-gray-500">
                          {new Date(date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </time>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className=" leading-relaxed prose-headings:text-gray-900 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              </article>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  try {
    const response = await client.getEntries({
      content_type: 'blogPomodoro',
    })

    const articles = response.items as ContentfulArticle[]

    return articles
      .map((article) => ({
        slug: String(article.fields?.slug || ''),
      }))
      .filter(({ slug }) => slug)
  } catch (error) {
    console.error('Erro ao gerar params estáticos:', error)
    return []
  }
}
