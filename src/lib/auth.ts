import { createAuthClient } from "better-auth/react";
export const { signIn, signUp, signOut, useSession, getSession } = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_URL
});
