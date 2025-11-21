"use client";
import { createContext } from "react";
import { User } from "@/types";

interface AppContextConfig {
  isLoggedIn: boolean;
  logOut: () => void;
  configureAuth: () => void;
  setUser: (v: User) => void;
  user?: User;
}

export const AppContext = createContext<AppContextConfig>({
  isLoggedIn: false,
  logOut: () => Promise.resolve(),
  configureAuth: () => Promise.resolve(),
  setUser: () => {},
});
