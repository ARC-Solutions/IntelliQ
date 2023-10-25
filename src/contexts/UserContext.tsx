"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/utils/supabaseClient";
type Props = {
  children: React.ReactNode;
};
interface User {
  id: string;
  email: string;
  img: string | null;
  name: string | null;
}
interface UserInput {
  email: string;
  password: string;
}
interface AuthContextValue {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  signinUsingEmail: ({ email, password }: UserInput) => void;
  signupUsingEmail: ({ email, password }: UserInput) => void;
  signinUsingOAuth: () => void;
  signout: () => void;
}
const AuthContext = createContext<AuthContextValue | null>(null);
export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const storeSessionToken = (sessionToken: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("current-user", JSON.stringify(sessionToken));
    }
  };
  const removeSessionToken = () => {
    if (getUserSessionToken()) {
      localStorage.removeItem("current-user");
      return;
    }
  };
  function getUserSessionToken() {
    let user;
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("current-user");

      if (storedUser) {
        user = JSON.parse(storedUser);
      } else {
        user = null;
      }

      return user;
    }
  }
  const signupUsingEmail = async ({ email, password }: UserInput) => {
    const response = await fetch(
      "https://intelliq-be.azurewebsites.net/api/signup",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
      return;
    }

    setCurrentUser({
      email: data.email,
      id: data.userID,
      img: null,
      name: null,
    });
    storeSessionToken(data.sessionToken);
  };
  const signinUsingEmail = async ({ email, password }: UserInput) => {
    const response = await fetch(
      "https://intelliq-be.azurewebsites.net/api/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
      return;
    }
    setCurrentUser({
      email: data.email,
      id: data.userID,
      img: null,
      name: null,
    });
    storeSessionToken(data.sessionToken);
  };
  const signinUsingOAuth = async () => {
    await (supabase.auth.signInWithOAuth({
      provider: "google",
    }) as any);
  };

  const signout = async () => {
    // await fetch("https://intelliq-be.azurewebsites.net/api/logout", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    await supabase.auth.signOut();

    setCurrentUser(null);
    removeSessionToken();
  };

  const userInfos = async () => {
    const response = await fetch(
      "https://intelliq-be.azurewebsites.net/api/getUserSession",
      {
        headers: {
          Authorization: `Bearer ${getUserSessionToken()}`,
        },
      }
    );
    const { userID, email } = await response.json();
    setCurrentUser({ id: userID, email, img: null, name: null });
  };
  const value = {
    currentUser,
    setCurrentUser,
    signinUsingEmail,
    signinUsingOAuth,
    signupUsingEmail,
    signout,
  };

  useEffect(() => {
    if (getUserSessionToken()) {
      userInfos();
    }
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext as AuthContextValue;
};
