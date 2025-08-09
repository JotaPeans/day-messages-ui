import { createAuthClient } from "better-auth/react";
export const { signIn, signUp, signOut, useSession, getSession } = createAuthClient({
  baseURL: "https://day-messages-api-production.up.railway.app"
});
