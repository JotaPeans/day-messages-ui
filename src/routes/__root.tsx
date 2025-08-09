import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: () => (
    <main className="min-h-screen w-full flex font-poppins">
      <Toaster richColors position="top-right"/>
      <Outlet />
    </main>
  ),
});
