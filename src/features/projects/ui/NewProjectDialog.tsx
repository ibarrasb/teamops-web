import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateProject } from "@/features/projects/projectsHooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2, "Project name is too short"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function NewProjectDialog({
  trigger,
  onCreated,
}: {
  trigger: React.ReactNode;
  onCreated?: (projectId: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const create = useCreateProject();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", description: "" },
    mode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const project = await create.mutateAsync({
      name: values.name.trim(),
      description: values.description?.trim() || null,
    });

    setOpen(false);
    form.reset();

    // ✅ Don't assume the backend returns { id }. Support common shapes.
    const projectId =
      (project as any)?.id ??
      (project as any)?.projectId ??
      (project as any)?.uuid ??
      undefined;

    if (projectId) onCreated?.(projectId);
    // If projectId is undefined, Sidebar guard will prevent bad navigation.
  });

  return (
    <Dialog open={open} onOpenChange={(v) => !create.isPending && setOpen(v)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="e.g. Q1 Launch"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What’s this project about?"
              className="min-h-[90px]"
              {...form.register("description")}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={create.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!form.formState.isValid || create.isPending}>
              {create.isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
