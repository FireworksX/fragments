type Cache = Map<string, any>;
type InflightRequests = Map<string, Promise<any>>;

const BASE_HEADERS = {
  "Content-Type": "application/json",
};

export const createFetcher = (
  baseUrl: string,
  defaultHeaders: HeadersInit = {}
) => {
  const cache: Cache = new Map();
  const inflightRequests: InflightRequests = new Map();

  const getCacheKey = (
    query: string,
    variables?: unknown,
    options?: RequestInit
  ) => JSON.stringify({ query, variables, options });

  const query = async <T>(
    query: string,
    variables: Record<string, unknown> = {},
    options: RequestInit = {}
  ): Promise<T> => {
    const cacheKey = getCacheKey(query, variables, options);

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    if (inflightRequests.has(cacheKey)) {
      return inflightRequests.get(cacheKey)!;
    }

    const request = fetch(baseUrl, {
      ...options,
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        ...BASE_HEADERS,
        ...defaultHeaders,
        ...options.headers,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        const data = await res.json();
        cache.set(cacheKey, data);
        return data;
      })
      .finally(() => {
        inflightRequests.delete(cacheKey);
      });

    inflightRequests.set(cacheKey, request);
    return request;
  };

  const invalidate = (endpoint: string, options?: RequestInit) => {
    cache.delete(getCacheKey(endpoint, options));
  };

  const clearCache = () => cache.clear();

  return { query, invalidate, clearCache };
};
