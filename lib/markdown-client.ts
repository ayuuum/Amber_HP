import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

// クライアント側でも使用できるMarkdown変換関数
export async function getPostContentHtml(content: string): Promise<string> {
  const withoutLeadingH1 = content.replace(/^\s*#\s+[^\n]+\n+/, '')
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(withoutLeadingH1)

  return processedContent.toString()
}
