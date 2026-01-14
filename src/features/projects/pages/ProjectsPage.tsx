import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useDeleteProject, useProject } from "@/features/projects/projectsHooks";
import { TasksPage } from "@/features/tasks/TasksPage";

export function ProjectPage() {
  const { projectId } = useParams();
  const nav = useNavigate();

  // ✅ Guard against bad/empty params (prevents /api/projects/undefined)
  const safeProjectId =
    projectId && projectId !== "undefined" ? projectId : undefined;

  const { data, isLoading, isError } = useProject(safeProjectId);
  const del = useDeleteProject();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-20 w-full max-w-3xl" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !data || !safeProjectId) {
    return (
      <div className="max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Project not found</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Try selecting a different project.
          </CardContent>
        </Card>
      </div>
    );
  }

  const onDelete = () => {
    const ok = window.confirm("Delete this project? This will also delete its tasks.");
    if (!ok) return;

    del.mutate(safeProjectId, {
      onSuccess: () => nav("/app", { replace: true }),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border bg-card/70 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-primary/10 ring-1 ring-primary/15" />
              <h1 className="truncate text-2xl font-semibold tracking-tight">
                {data.name}
              </h1>
            </div>

            <p className="text-sm text-muted-foreground">
              {data.description ?? "No description"}
            </p>

            <p className="text-xs text-muted-foreground">
              Updated {dayjs(data.updatedAt).format("MMM D, YYYY h:mm A")}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => nav(`/app/projects/${safeProjectId}/tasks`)}
            >
              Full Tasks Page
            </Button>

            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={del.isPending}
            >
              {del.isPending ? "Deleting..." : "Delete Project"}
            </Button>
          </div>
        </div>
      </div>

      {/* Tasks card (INLINE UI) */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-muted/30">
          <CardTitle>Tasks</CardTitle>
          <Button
            variant="outline"
            onClick={() => nav(`/app/projects/${safeProjectId}/tasks`)}
          >
            Open Full Page
          </Button>
        </CardHeader>

        <CardContent className="p-4 md:p-6">
          <TasksPage />
        </CardContent>
      </Card>
    </div>
  );
}
