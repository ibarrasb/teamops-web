import { api } from "@/lib/api";
import type { LoginRequest, LoginResponse, RegisterRequest } from "./types";

export function register(body: RegisterRequest) {
  return api.post<void, RegisterRequest>("/auth/register", body);
}

export function login(body: LoginRequest) {
  return api.post<LoginResponse, LoginRequest>("/auth/login", body);
}
