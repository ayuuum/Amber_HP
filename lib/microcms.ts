import { createClient } from 'microcms-js-sdk'

// クライアントを遅延初期化
let clientInstance: ReturnType<typeof createClient> | null = null

export function getClient() {
  if (clientInstance) {
    return clientInstance
  }

  const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN
  const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY

  if (!serviceDomain || !apiKey) {
    throw new Error('NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN and NEXT_PUBLIC_MICROCMS_API_KEY must be set')
  }

  clientInstance = createClient({
    serviceDomain,
    apiKey,
  })

  return clientInstance
}

// 型定義
export type Content = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

export type Hero = Content & {
  catchCopy: string
  subCopy: string
  buttonText1: string
  buttonText2: string
}

export type About = Content & {
  title: string
  content: string
}

export type Service = Content & {
  title: string
  description: string
  features: Array<{
    title: string
    description: string
  }>
}

export type Contact = Content & {
  title: string
  description: string
}

