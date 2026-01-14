import { useParams } from "react-router-dom";
import { useCreateTask, useDeleteTask, useTasks, useUpdateTask } from "./tasksHooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { StatusPill } from "./StatusPill";

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

const nextStatus = (s: TaskStatus): TaskStatus => {
  if (s === "TODO") return "IN_PROGRESS";
  if (s === "IN_PROGRESS") return "DONE";
  return "TODO";
};

const statusLabel = (s: TaskStatus) => {
  if (s === "TODO") return "Start";
  if (s === "IN_PROGRESS") return "Complete";
  return "Reset";
};

export function TasksPage() {
  const { projectId } = useParams();
  if (!projectId) return null;

  const { data: tasks = [], isLoading, isError } = useTasks(projectId);
  const createTask = useCreateTask(projectId);
  const updateTask = useUpdateTask(projectId);
  const deleteTask = useDeleteTask(projectId);

  const [title, setTitle] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="flex-1">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task"
          />
        </div>

        <Button
          onClick={() => {
            const t = title.trim();
            if (!t) return;
            createTask.mutate({ title: t, status: "TODO" });
            setTitle("");
          }}
          disabled={createTask.isPending}
          className="md:w-auto"
        >
          {createTask.isPending ? "Adding…" : "Add Task"}
        </Button>
      </div>

      {isLoading && <div className="text-sm text-muted-foreground">Loading…</div>}
      {isError && <div className="text-sm text-muted-foreground">Failed to load tasks.</div>}

      {!isLoading && !isError && tasks.length === 0 && (
        <div className="rounded-2xl border bg-muted/20 p-6 text-sm text-muted-foreground">
          No tasks yet. Add one above.
        </div>
      )}

      <div className="space-y-2">
        {tasks.map((t) => {
          const done = t.status === "DONE";

          return (
            <div
              key={t.id}
              className="group flex items-center justify-between gap-3 rounded-2xl border bg-card/70 p-4 shadow-sm transition hover:bg-card"
            >
              <div className="min-w-0">
                <div
                  className={`truncate font-medium ${
                    done ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {t.title}
                </div>

                <div className="mt-1">
                  <StatusPill status={t.status} />
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <Button
                  variant="secondary"
                  onClick={() =>
                    updateTask.mutate({
                      taskId: t.id,
                      body: { status: nextStatus(t.status as TaskStatus) },
                    })
                  }
                  disabled={updateTask.isPending}
                >
                  {statusLabel(t.status as TaskStatus)}
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => deleteTask.mutate(t.id)}
                  disabled={deleteTask.isPending}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
