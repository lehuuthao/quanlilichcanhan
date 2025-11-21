"use client";
import { useEffect, useState, useRef, ReactNode } from "react";
import Cookie from "js-cookie";
import { setRestAuth } from "@/services/rest-client";
import UsersServices from "@/services/users.service";
import { deleteAuthorization } from "@/services/rest-client";
import { AUTH_KEY } from "@/constants/auth.constant";
import { AppContext } from "@/contexts/app.context";
import { User } from "@/types";
import { getCookie } from "cookies-next";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const initialLoaded = useRef(false);

  const logOut = () => {
    Cookie.remove(AUTH_KEY);
    deleteAuthorization();
    localStorage.clear();
    initialLoaded.current = false;
    setUser(undefined);
  };

  const configureAuth = async () => {
    try {
      const resp = await UsersServices.getUserInfo();
      if (resp) {
        setUser(resp.user);
        setIsLoggedIn(true);
        setRestAuth(resp.token);
        Cookie.set(AUTH_KEY, resp.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!initialLoaded.current) {
      const userId = getCookie(AUTH_KEY);
      if (userId) {
        initialLoaded.current = true;
        configureAuth();
      }
    }
  }, []);

  const appValue = {
    isLoggedIn,
    logOut,
    configureAuth,
    user,
    setUser,
  };
  return <AppContext.Provider value={appValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
