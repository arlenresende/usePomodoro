import { createClient, Entry, EntrySkeletonType } from 'contentful'

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
})

export type ContentfulEntry<T extends EntrySkeletonType> = Entry<T>
