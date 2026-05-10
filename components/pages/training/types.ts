export type ToolLPData = {
  slug: string
  toolName: string
  toolBadge: string
  tagline: string
  heroDescription: string
  envLabel: string

  problems: {
    label: string
    title: string
    desc: string
  }[]

  basicCourse: {
    target: string
    items: string[]
    outcome: string
  }

  advancedCourse: {
    target: string
    items: string[]
    outcome: string
  }

  relatedTools: {
    label: string
    href: string
  }[]

  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
}
