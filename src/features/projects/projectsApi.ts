import { api } from "@/lib/api";
import type {
  CreateProjectRequest,
  ProjectDto,
  UpdateProjectRequest,
} from "@/types/api";

export const projectsApi = {
  list: async () => {
    return api.get<ProjectDto[]>("/api/projects");
  },

  get: async (projectId: string) => {
    return api.get<ProjectDto>(`/api/projects/${projectId}`);
  },

  create: async (body: CreateProjectRequest) => {
    return api.post<ProjectDto, CreateProjectRequest>("/api/projects", body);
  },
  
  update: async (projectId: string, body: UpdateProjectRequest) => {
    return api.patch<ProjectDto, UpdateProjectRequest>(`/api/projects/${projectId}`, body);
  },
  

  remove: async (projectId: string) => {
    return api.del<void>(`/api/projects/${projectId}`);
  },
};
