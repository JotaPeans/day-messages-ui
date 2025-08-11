import { getSession } from "@/lib/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Messages from "./-components/Messages";
import Header from "../_auth/-components/Header";
import CreateMessage from "./-components/CreateMessage";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getSession();
    if (!session.data) {
      return redirect({
        to: "/",
      });
    }
  },
});

const messagesQueryClient = new QueryClient();
const createMessageQueryClient = new QueryClient();

function RouteComponent() {
  return (
    <div className="flex-1 flex relative overflow-hidden">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.2}
        flickerChance={0.1}
        height={800}
        width={800}
      />

      <div className="max-w-96 mx-auto flex-1 flex flex-col items-center gap-4 p-4 pb-10 z-50">
        <Header />

        <QueryClientProvider client={messagesQueryClient}>
          <Messages />
        </QueryClientProvider>

        <QueryClientProvider client={createMessageQueryClient}>
          <CreateMessage />
        </QueryClientProvider>
      </div>
    </div>
  );
}
