"use client";
import React, { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};
interface User {
  id: string;
  email: string;
}
interface UserInput {
  email: string;
  password: string;
}
interface AuthContextValue {
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  signinUsingEmail: ({ email, password }: UserInput) => void;
  signupUsingEmail: ({ email, password }: UserInput) => void;
  signinUsingOAuth: ({ email, password }: UserInput) => void;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const signupUsingEmail = async ({ email, password }: UserInput) => {
    try {
      console.log("sign up");

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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const signinUsingEmail = async ({ email, password }: UserInput) => {
    try {
      console.log("sign in");
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
  return authContext;
};
