import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import {
  isAdminAuthenticated,
  isValidBlogCategory,
  unauthorizedAdminResponse,
} from '@/lib/admin-auth'

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const MAX_BYTES = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return unauthorizedAdminResponse()
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const categoryRaw = formData.get('category')
    const category =
      typeof categoryRaw === 'string' && isValidBlogCategory(categoryRaw)
        ? categoryRaw
        : 'development'

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 })
    }

    if (file.size <= 0 || file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'blog-images', category)
    await mkdir(uploadDir, { recursive: true })

    const ext = file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1] || 'bin'
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`
    const filePath = path.join(uploadDir, fileName)

    const bytes = await file.arrayBuffer()
    await writeFile(filePath, Buffer.from(bytes))

    const publicUrl = `/blog-images/${category}/${fileName}`
    return NextResponse.json({ success: true, url: publicUrl })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
