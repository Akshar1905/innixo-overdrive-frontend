import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Helper to get and validate the base URL
function getApiBaseUrl() {
  const url = import.meta.env.VITE_API_BASE_URL;
  if (!url) {
    // In development, might be acceptable to fallback or warn, 
    // but for this specific fix we want STRICT enforcement as per verification plan.
    // However, to avoid breaking local dev if env isn't set instantly, we can check import.meta.env.DEV
    if (import.meta.env.DEV) {
      console.warn("VITE_API_BASE_URL is missing in DEV. Using relative path fallback.");
      return "";
    }
    throw new Error("CRITICAL: VITE_API_BASE_URL is missing. API calls will fail.");
  }
  return url;
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const headers: Record<string, string> = data ? { "Content-Type": "application/json" } : {};

  const baseUrl = getApiBaseUrl();
  // Ensure we don't double slash if url starts with / and baseUrl ends with /
  // But typically baseUrl is "https://host.com" (no trailing slash) and url is "/api/..."
  const finalUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

  console.log(`[API Request] ${method} ${finalUrl}`); // Debug Log

  const res = await fetch(finalUrl, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
    async ({ queryKey }) => {
      const baseUrl = getApiBaseUrl();
      const path = queryKey.join("/");
      const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

      const res = await fetch(url, {
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
