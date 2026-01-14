export const qk = {
    projects: ["projects"] as const,
    project: (projectId: string) => ["projects", projectId] as const,
    tasks: (projectId: string) => ["projects", projectId, "tasks"] as const,
    task: (projectId: string, taskId: string) =>
      ["projects", projectId, "tasks", taskId] as const,
  };
  