export function captureError(error: unknown, context?: Record<string, unknown>) {
  if (context) {
    console.error(error, context)
    return
  }
  console.error(error)
}
