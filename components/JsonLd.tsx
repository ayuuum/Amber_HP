type JsonLdProps = {
  data: Record<string, unknown>
  id?: string
}

export default function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // JSON-LDは文字列として埋め込む必要がある
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

