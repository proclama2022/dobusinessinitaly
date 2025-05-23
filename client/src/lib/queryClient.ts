import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest<T = any>(
  url: string, 
  options?: { 
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  }
): Promise<T> {
  const method = options?.method || 'GET';
  const headers = { ...options?.headers }; // Create a mutable copy
  let bodyToSend: string | undefined;

  if (options?.body) {
    if (typeof options.body === 'string') {
      bodyToSend = options.body;
      // If body is already a string, Content-Type should ideally be set by the caller.
      // As a fallback, ensure it's set if not provided.
      if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
      }
    } else {
      bodyToSend = JSON.stringify(options.body);
      headers['Content-Type'] = 'application/json'; // Ensure it's set for objects
    }
  }

  const res = await fetch(url, {
    method,
    headers,
    body: bodyToSend,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return await res.json() as T;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
