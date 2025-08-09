import { getSession } from "@/lib/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Messages from "./-components/Messages";
import Header from "../_auth/-components/Header";
import CreateMessage from "./-components/CreateMessage";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getSession();
    console.log("🚀 ~ session:", session)
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
    <div className="flex-1 flex">
      <div className="max-w-96 mx-auto flex-1 flex flex-col items-center gap-4 p-4">
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
