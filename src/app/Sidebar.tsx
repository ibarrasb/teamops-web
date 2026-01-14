import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Plus, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useProjects } from "@/features/projects/projectsHooks";
import { NewProjectDialog } from "@/features/projects/ui/NewProjectDialog";

export function Sidebar() {
  const { data, isLoading, isError } = useProjects();
  const nav = useNavigate();
  const location = useLocation();

  const projects = data ?? [];

  const onHome = location.pathname === "/app" || location.pathname === "/app/";
  const hasProjects = projects.length > 0;

  useEffect(() => {
    // Auto-open first project ONLY if we actually have a valid id
    if (!isLoading && !isError && onHome && hasProjects) {
      const firstId = projects[0]?.id;
      if (!firstId) return;
      nav(`/app/projects/${firstId}`, { replace: true });
    }
  }, [isLoading, isError, onHome, hasProjects, nav, projects]);

  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Projects
        </div>

        <NewProjectDialog
          trigger={
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Plus className="h-4 w-4" />
              <span className="sr-only">New project</span>
            </Button>
          }
          onCreated={(projectId) => {
            if (!projectId) return; // ✅ prevents /app/projects/undefined
            nav(`/app/projects/${projectId}`);
          }}
        />
      </div>

      <Separator className="my-3" />

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-11/12" />
          <Skeleton className="h-9 w-10/12" />
        </div>
      )}

      {isError && (
        <div className="rounded-lg border p-3 text-sm text-muted-foreground">
          Failed to load projects.
        </div>
      )}

      {!isLoading && !isError && projects.length === 0 && (
        <div className="rounded-xl border p-4">
          <div className="text-sm font-medium">No projects yet</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first project to start tracking tasks.
          </p>
          <div className="mt-3">
            <NewProjectDialog
              trigger={<Button className="w-full">Create project</Button>}
              onCreated={(projectId) => {
                if (!projectId) return; // ✅ prevents /app/projects/undefined
                nav(`/app/projects/${projectId}`);
              }}
            />
          </div>
        </div>
      )}

      {!isLoading && !isError && projects.length > 0 && (
        <nav className="min-h-0 flex-1 overflow-auto pr-1">
          <ul className="space-y-1">
            {projects.map((p) => (
              <li key={p.id}>
                <NavLink
                  to={`/app/projects/${p.id}`}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground"
                    )
                  }
                >
                  <FolderKanban className="h-4 w-4 text-muted-foreground group-hover:text-inherit" />
                  <span className="truncate">{p.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <Separator className="my-3" />

      <div className="text-xs text-muted-foreground"></div>
    </div>
  );
}
