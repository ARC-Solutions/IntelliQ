"use client";
import { useAuth } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import QuizMe from "@/components/QuizMe";
import TopPicks from "@/components/TopPicks";
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
      <TopPicks/>
    </div>
  );
};

export default Dashboard;
