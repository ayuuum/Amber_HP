/**
 * Retry with exponential backoff + fetch with timeout.
 * Usage:
 *   const res = await fetchWithRetry("https://api.example.com/data", { method: "POST", body: "..." });
 *   const data = await retry(() => someAsyncFn(), { maxAttempts: 3 });
 */

export interface RetryOptions {
  maxAttempts?: number;       // default: 3
  baseDelayMs?: number;       // default: 200
  maxDelayMs?: number;        // default: 5000
  onRetry?: (error: Error, attempt: number) => void;
}

/**
 * Retry an async function with exponential backoff + jitter.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  opts: RetryOptions = {}
): Promise<T> {
  const { maxAttempts = 3, baseDelayMs = 200, maxDelayMs = 5000, onRetry } = opts;

  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
      if (attempt === maxAttempts) break;

      const delay = Math.min(baseDelayMs * Math.pow(2, attempt - 1), maxDelayMs);
      const jitter = delay * (0.5 + Math.random() * 0.5); // 50-100% of delay
      onRetry?.(lastError, attempt);
      await new Promise((r) => setTimeout(r, jitter));
    }
  }
  throw lastError;
}

/**
 * fetch() with AbortController timeout.
 */
export async function fetchWithTimeout(
  url: string,
  opts: RequestInit & { timeoutMs?: number } = {}
): Promise<Response> {
  const { timeoutMs = 10000, ...fetchOpts } = opts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...fetchOpts, signal: controller.signal });
    return res;
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      throw new Error(`Timeout after ${timeoutMs}ms: ${url}`);
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * fetch() with timeout + retry. The most common pattern for external API calls.
 */
export async function fetchWithRetry(
  url: string,
  opts: RequestInit & { timeoutMs?: number; retryOpts?: RetryOptions } = {}
): Promise<Response> {
  const { retryOpts, ...fetchOpts } = opts;
  return retry(() => fetchWithTimeout(url, fetchOpts), {
    maxAttempts: 3,
    baseDelayMs: 200,
    ...retryOpts,
    onRetry: (err, attempt) => {
      console.warn(`[retry] ${url} attempt ${attempt} failed: ${err.message}`);
      retryOpts?.onRetry?.(err, attempt);
    },
  });
}
