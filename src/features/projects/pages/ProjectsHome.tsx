import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectsHome() {
  return (
    <div className="max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Pick a project</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Select a project from the sidebar to view tasks and details.
        </CardContent>
      </Card>
    </div>
  );
}
