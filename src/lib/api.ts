import { env } from "./env";
import { getToken } from "./auth";
import { ApiError } from "../types/api";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type RequestOptions<TBody> = {
  method?: HttpMethod;
  body?: TBody;
  auth?: boolean; // default true for /api routes, false for /auth routes when used explicitly
  signal?: AbortSignal;
};

function joinUrl(base: string, path: string) {
  if (!base) return path;
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

export async function api<TResponse, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const base = env.apiBaseUrl ?? "";
  const url = joinUrl(base, path);

  const method = options.method ?? "GET";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const wantsAuth = options.auth ?? true;
  if (wantsAuth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  });

  if (!res.ok) {
    const payload = await parseJsonSafe(res);
    const message =
      payload?.message ||
      payload?.error ||
      `Request failed (${res.status})`;

    throw new ApiError(message, res.status, payload);
  }

  // Some DELETE endpoints may return empty body
  const data = (await parseJsonSafe(res)) as TResponse | undefined;
  return data as TResponse;
}
