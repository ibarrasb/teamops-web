import React, { createContext, useContext, useMemo, useState } from "react";
import { clearToken, getToken, setToken } from "@/lib/auth";

type AuthContextValue = {
  token: string | null;
  isAuthed: boolean;
  setAuthedToken: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [tokenState, setTokenState] = useState<string | null>(() => getToken());

  const value = useMemo<AuthContextValue>(() => {
    return {
      token: tokenState,
      isAuthed: Boolean(tokenState),
      setAuthedToken: (token) => {
        setToken(token);
        setTokenState(token);
      },
      logout: () => {
        clearToken();
        setTokenState(null);
      },
    };
  }, [tokenState]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
}
