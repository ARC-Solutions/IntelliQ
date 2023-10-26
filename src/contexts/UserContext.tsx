"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSupabase } from "./SupabaseContext";
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
  const { supabase } = useSupabase();

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
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      const userEmail = user?.email as string;
      const userID = user?.id as string;
      setCurrentUser({
        email: userEmail,
        id: userID,
        img: null,
        name: null,
      });
    } catch (error: any) {
      toast.error(error);
      console.log(error);
    }
  };
  const signinUsingEmail = async ({ email, password }: UserInput) => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      const userEmail = user?.email as string;
      const userID = user?.id as string;
      setCurrentUser({
        email: userEmail,
        id: userID,
        img: null,
        name: null,
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  const signinUsingOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      toast.error(error.message);
      return;
    }
  };

  const signout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      removeSessionToken();
    } catch (error) {
      console.log(error);
    }
  };
  const getUserInfo = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (!session) {
      return;
    }
    if (error) {
      toast.error(error.message);
    }
    const user = session?.user;
    const avatar = user.user_metadata.avatar_url as string;
    const name = user.user_metadata.full_name as string;
    const userID = user?.id as string;
    const userEmail = user?.email as string;
    setCurrentUser({
      id: userID,
      email: userEmail,
      img: avatar || null,
      name: name || null,
    });
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
    getUserInfo();
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
