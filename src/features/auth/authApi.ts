import { api } from "../../lib/api";
import type { LoginRequest, LoginResponse, RegisterRequest } from "./types";

export function register(request: RegisterRequest) {
  return api<void, RegisterRequest>("/auth/register", {
    method: "POST",
    body: request,
    auth: false,
  });
}

export function login(request: LoginRequest) {
  return api<LoginResponse, LoginRequest>("/auth/login", {
    method: "POST",
    body: request,
    auth: false,
  });
}
