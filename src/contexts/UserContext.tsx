"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
type Props = {
  children: React.ReactNode;
};
interface User {
  id: string;
  email: string;
  img: string | null;
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
  signinUsingOAuth: ({ email, password }: UserInput) => void;
}
const AuthContext = createContext<AuthContextValue | null>(null);
export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    getUserSessionToken()
  );

  const storeSessionToken = (sessionToken: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("current-user", JSON.stringify(sessionToken));
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
    });
    storeSessionToken(data.sessionToken);
  };
  const signinUsingOAuth = async ({ email, password }: UserInput) => {};
  const value = {
    currentUser,
    setCurrentUser,
    signinUsingEmail,
    signinUsingOAuth,
    signupUsingEmail,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext as AuthContextValue;
};
