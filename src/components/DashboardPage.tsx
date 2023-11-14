"use client";
import QuizMe from "@/components/QuizMe";
import TopPicks from "@/components/TopPicks";
import { useQuiz } from "@/contexts/QuizContext";
import LoadingQuestions from "./LoadingQuestions";
import { useEffect } from "react";
import { redirect } from "next/navigation";
const Dashboard = () => {
  const {
    isLoading,
    fetchingFinished: finished,
    currentQuiz,
    dispatch,
  } = useQuiz();
  useEffect(() => {
    dispatch({ type: "RESET_SUMMARY_QUIZ" });
  }, []);
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
      <h1 className='text-3xl sm:text-4xl text-center font-semibold'>DASHBOARD</h1>

      <div className='flex items-center justify-center m-4 mb-5 sm:mb-10'>
        <QuizMe />
      </div>
      <div className='flex items-center justify-center m-4 mt-5 sm:mt-10'>
        <TopPicks /> 
      Q</div>
    </div>
  );
};

export default Dashboard;
