import { QueryClient, QueryFunction } from "@tanstack/react-query";

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
  // Chuẩn bị headers
  const headers: Record<string, string> = data ? { "Content-Type": "application/json" } : {};
  
  // Thêm session ID nếu có trong localStorage
  const sessionId = localStorage.getItem('sessionId');
  if (sessionId) {
    headers['X-Session-ID'] = sessionId;
  }

  console.log(`API Request ${method} ${url}`, { 
    headers, 
    data, 
    sessionId: localStorage.getItem('sessionId')
  });

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  
  // Lưu sessionId nếu có
  const newSessionId = res.headers.get('x-session-id');
  if (newSessionId) {
    console.log(`Received sessionId: ${newSessionId}`);
    localStorage.setItem('sessionId', newSessionId);
  } else {
    console.error('Missing sessionId in response headers');
  }
  
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Thêm session ID nếu có trong localStorage
    const headers: Record<string, string> = {};
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      headers['X-Session-ID'] = sessionId;
    }

    console.log(`QueryFn fetch ${queryKey[0]}`, { 
      headers, 
      sessionId: localStorage.getItem('sessionId')
    });

    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
      headers
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);

    // Lưu sessionId từ response header nếu có
    const newSessionId = res.headers.get('x-session-id');
    if (newSessionId) {
      console.log(`QueryFn received sessionId: ${newSessionId}`);
      localStorage.setItem('sessionId', newSessionId);
    }

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
