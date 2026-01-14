// src/features/tasks/tasksApi.ts
import { api } from "@/lib/api";
import type { CreateTaskRequest, TaskDto, UpdateTaskRequest } from "@/types/api";

export const tasksApi = {
  list: async (projectId: string) => {
    return api.get<TaskDto[]>(`/api/projects/${projectId}/tasks`);
  },

  get: async (projectId: string, taskId: string) => {
    return api.get<TaskDto>(`/api/projects/${projectId}/tasks/${taskId}`);
  },

  create: async (projectId: string, body: CreateTaskRequest) => {
    return api.post<TaskDto, CreateTaskRequest>(`/api/projects/${projectId}/tasks`, body);
  },

  update: async (projectId: string, taskId: string, body: UpdateTaskRequest) => {
    return api.patch<TaskDto, UpdateTaskRequest>(
      `/api/projects/${projectId}/tasks/${taskId}`,
      body
    );
  },

  remove: async (projectId: string, taskId: string) => {
    return api.del<void>(`/api/projects/${projectId}/tasks/${taskId}`);
  },
};
