import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

// クライアント側でも使用できるMarkdown変換関数
// fsモジュールを使用しないため、クライアントコンポーネントからも使用可能
export async function getPostContentHtml(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return processedContent.toString()
}

