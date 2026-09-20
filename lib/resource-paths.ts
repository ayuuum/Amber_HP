export function getResourceDownloadPath(slug: string): string {
  return `/api/resources/${slug}/download`
}

export function getResourcePagePath(slug: string): string {
  return `/resources/${slug}`
}
