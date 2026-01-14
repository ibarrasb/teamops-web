// src/types/api.ts

// ---- Errors ----
export type ApiErrorPayload = {
    message?: string;
    error?: string;
    status?: number;
    path?: string;
    timestamp?: string;
  };
  
  export class ApiError extends Error {
    status: number;
    payload?: ApiErrorPayload;
  
    constructor(message: string, status: number, payload?: ApiErrorPayload) {
      super(message);
      this.name = "ApiError";
      this.status = status;
      this.payload = payload;
    }
  }
  
  // ---- Auth ----
  export type AuthRegisterRequest = {
    email: string;
    password: string;
    displayName: string;
  };
  
  export type AuthLoginRequest = {
    email: string;
    password: string;
  };
  
  export type AuthLoginResponse = {
    token: string;
  };
  
  // ---- Projects ----
  export type ProjectDto = {
    id: string;
    name: string;
    description: string | null;
    createdAt: string; // ISO
    updatedAt: string; // ISO
  };
  
  export type CreateProjectRequest = {
    name: string;
    description?: string | null;
  };
  
  export type UpdateProjectRequest = {
    name?: string;
    description?: string | null;
  };
  
  // ---- Tasks ----
  export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
  
  export type TaskDto = {
    id: string;
    title: string;
    status: TaskStatus;
    dueAt: string | null; // ISO or null
    createdAt: string; // ISO
    updatedAt: string; // ISO
  };
  
  export type CreateTaskRequest = {
    title: string;
    status: TaskStatus;
    dueAt?: string | null; // ISO
  };
  
  export type UpdateTaskRequest = {
    title?: string;
    status?: TaskStatus;
    dueAt?: string | null; // ISO
  };
  