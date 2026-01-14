import { getToken, clearToken } from "@/lib/auth";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || "";


export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

type RequestOptions<TBody> = {
  body?: TBody;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

async function request<TResponse, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> & { method: string }
): Promise<TResponse> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    if (res.status === 401) clearToken();
    const msg =
      (typeof data === "object" && data && "message" in data && (data as any).message) ||
      (typeof data === "string" && data) ||
      res.statusText ||
      "Request failed";
    throw new ApiError(String(msg), res.status, data);
  }

  return data as TResponse;
}

export const api = {
  get: <TResponse>(path: string, options?: Omit<RequestOptions<never>, "body">) =>
    request<TResponse>(path, { method: "GET", ...(options ?? {}) }),

  post: <TResponse, TBody>(path: string, body: TBody, options?: RequestOptions<TBody>) =>
    request<TResponse, TBody>(path, { method: "POST", body, ...(options ?? {}) }),

  patch: <TResponse, TBody>(path: string, body: TBody, options?: RequestOptions<TBody>) =>
    request<TResponse, TBody>(path, { method: "PATCH", body, ...(options ?? {}) }),

  del: <TResponse>(path: string, options?: Omit<RequestOptions<never>, "body">) =>
    request<TResponse>(path, { method: "DELETE", ...(options ?? {}) }),
};
