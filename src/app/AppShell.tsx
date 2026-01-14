import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-background via-background to-muted/30">
      <div className="mx-auto flex min-h-dvh w-full max-w-screen-2xl">
        {/* Desktop sidebar */}
        <aside className="hidden w-80 shrink-0 border-r bg-background/70 backdrop-blur md:block">
          <Sidebar />
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="min-w-0 flex-1 p-4 md:p-8">
            <div className="mx-auto w-full max-w-5xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
