"use client";
import QuizMe from "@/components/QuizMe";
import TopPicks from "@/components/TopPicks";
import { useQuiz } from "@/contexts/QuizContext";
import LoadingQuestions from "./LoadingQuestions";
import { useEffect } from "react";
import { redirect } from "next/navigation";
const Dashboard = () => {
  const { isLoading, fetchingFinished: finished, currentQuiz } = useQuiz();
  
  useEffect(() => {
    if (currentQuiz) {
      const url = `/quiz/play`;
      redirect(url);
    }
  }, [currentQuiz]);

  if (isLoading) {
    return <LoadingQuestions finished={finished} />;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <QuizMe />
      <TopPicks />
    </div>
  );
};

export default Dashboard;
