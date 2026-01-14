import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/lib/queryKeys";
import { projectsApi } from "./projectsApi";
import type { CreateProjectRequest, UpdateProjectRequest } from "@/types/api";
import { toast } from "sonner";

export function useProjects() {
  return useQuery({
    queryKey: qk.projects,
    queryFn: projectsApi.list,
  });
}

export function useProject(projectId: string | undefined) {
  return useQuery({
    queryKey: projectId ? qk.project(projectId) : ["projects", "none"],
    queryFn: () => projectsApi.get(projectId as string),
    enabled: !!projectId,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateProjectRequest) => projectsApi.create(body),
    onSuccess: async () => {
      toast.success("Project created");
      await qc.invalidateQueries({ queryKey: qk.projects });
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed to create project"),
  });
}

export function useUpdateProject(projectId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateProjectRequest) => projectsApi.update(projectId, body),
    onSuccess: async () => {
      toast.success("Project updated");
      await Promise.all([
        qc.invalidateQueries({ queryKey: qk.projects }),
        qc.invalidateQueries({ queryKey: qk.project(projectId) }),
      ]);
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed to update project"),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => projectsApi.remove(projectId),
    onSuccess: async () => {
      toast.success("Project deleted");
      await qc.invalidateQueries({ queryKey: qk.projects });
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed to delete project"),
  });
}
