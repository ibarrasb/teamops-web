import { Link } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/features/auth/AuthProvider";

export function TopBar() {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        {/* Mobile drawer */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="px-4 py-3">
              <SheetTitle>
                <Link to="/app" className="text-sm font-semibold">TeamOps</Link>
              </SheetTitle>
            </SheetHeader>
            <div className="border-t">
              <Sidebar />
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/app" className="hidden text-sm font-semibold md:block">
          TeamOps
        </Link>

        <div className="flex-1" />

        <Button variant="ghost" className="gap-2" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
