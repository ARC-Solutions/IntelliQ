"use client";
import { useAuth } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
const Quiz = () => {
  const { currentUser } = useAuth();
  // try {
  //   const { data, error } = await supabase.auth.getSession();
  //   console.log(data);
  // } catch (error) {
  //   console.log(error);
  // }
  useEffect(() => {
    if (!currentUser) {
      redirect("/");
    }
  }, [currentUser]);
  return <div>Mark ist noob</div>;
};

export default Quiz;
