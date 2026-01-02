import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // 画像ディレクトリを作成
    const uploadDir = path.join(process.cwd(), 'public', 'blog-images', category || 'general')
    await mkdir(uploadDir, { recursive: true })

    // ファイル名を生成（タイムスタンプ + 元のファイル名）
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}-${originalName}`
    const filePath = path.join(uploadDir, fileName)

    // ファイルを保存
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // 公開URLを返す
    const publicUrl = `/blog-images/${category || 'general'}/${fileName}`

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}


