import { NextRequest, NextResponse } from 'next/server'
import { getResourceBySlug } from '@/lib/resources'

type Props = {
  params: { slug: string }
}

export async function GET(_request: NextRequest, { params }: Props) {
  const resource = getResourceBySlug(params.slug)
  if (!resource) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const body = `# ${resource.title}\n\n${resource.content}\n`
  const asciiName = resource.fileName.replace(/[^\w.\-]+/g, '_')

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `attachment; filename="${asciiName}"; filename*=UTF-8''${encodeURIComponent(resource.fileName)}`,
      'Cache-Control': 'private, no-store',
    },
  })
}
