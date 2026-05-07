/**
 * 一覧・カード用に、Markdown っぽい文字列から記号だけ軽く除く（完全パースはしない）。
 */
export function excerptPlainText(raw: string): string {
  if (!raw.trim()) return ''
  return raw
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(.*?)]\([^)]*\)/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
