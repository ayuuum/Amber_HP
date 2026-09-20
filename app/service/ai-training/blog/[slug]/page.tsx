import { permanentRedirect } from 'next/navigation'

type Props = {
  params: { slug: string }
}

/** 旧 URL。正本は /blog/[slug] */
export default function LegacyTrainingBlogRedirect({ params }: Props) {
  permanentRedirect(`/blog/${params.slug}`)
}
