"use client";
import { useAuth } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import QuizMe from "@/components/QuizMe";
const Dashboard = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      redirect("/");
    }
  }, [currentUser]);
  return (
    <div>
      <QuizMe />
    </div>
  );
};

export default Dashboard;
