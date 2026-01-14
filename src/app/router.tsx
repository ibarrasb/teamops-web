import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth/LoginPage";
import { RegisterPage } from "@/features/auth/RegisterPage";
import { ProtectedRoute, PublicOnlyRoute } from "@/features/auth/authRoutes";

// Placeholder until we build /app layout next step
function AppHomePlaceholder() {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">TeamOps</h1>
        <p className="text-muted-foreground">
          Auth is wired. Next step: build the /app dashboard layout, projects,
          and tasks.
        </p>
      </div>
    </div>
  );
}

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
    children: [{ path: "/app", element: <AppHomePlaceholder /> }],
  },

  { path: "*", element: <Navigate to="/app" replace /> },
]);
