import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth/LoginPage";
import { RegisterPage } from "@/features/auth/RegisterPage";
import { ProtectedRoute, PublicOnlyRoute } from "@/features/auth/authRoutes";
import { AppShell } from "@/app/AppShell";

import { ProjectsHome } from "@/features/projects/pages/ProjectsHome";
import { ProjectPage } from "@/features/projects/pages/ProjectsPage";
import { TasksPage } from "@/features/tasks/TasksPage";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/app" replace /> },

  {
    element: <PublicOnlyRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        element: <AppShell />,
        children: [
          { index: true, element: <ProjectsHome /> },
          { path: "projects/:projectId", element: <ProjectPage /> },

          // ✅ tasks route (this is what will show create/edit/delete tasks UI)
          { path: "projects/:projectId/tasks", element: <TasksPage /> },
        ],
      },
    ],
  },

  { path: "*", element: <Navigate to="/app" replace /> },
]);
