import type { TaskStatus } from "@/types/api";
import { cn } from "@/lib/utils";

const styles: Record<TaskStatus, string> = {
  TODO: "bg-muted text-muted-foreground border-muted-foreground/20",
  IN_PROGRESS: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  DONE: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
};

export function StatusPill({ status }: { status: TaskStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        styles[status]
      )}
    >
      {status === "IN_PROGRESS" ? "In Progress" : status === "TODO" ? "Todo" : "Done"}
    </span>
  );
}
