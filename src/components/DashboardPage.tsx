"use client";
import QuizMe from "@/components/QuizMe";
import TopPicks from "@/components/TopPicks";
import { QuizHistories, useQuiz } from "@/contexts/QuizContext";
import LoadingQuestions from "./LoadingQuestions";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import QuizHistory from "./QuizHistory";
const Dashboard = ({
  prevQuizzes,
}: {
  prevQuizzes: {
    quizzes: QuizHistories[],
    totalCount: number
  }
}) => {
  const {
    isLoading,
    fetchingFinished: finished,
    currentQuiz,
    dispatch,
    summaryQuiz
  } = useQuiz();
  useEffect(() => {
    dispatch({ type: "RESET_SUMMARY_QUIZ" });
    dispatch({type: "STORE_QUIZZES", payload: prevQuizzes.quizzes});
  }, []);
  useEffect(() => {
    if (currentQuiz) {
      const url = `/quiz/play`;
      redirect(url);
    }
    if(summaryQuiz){
      redirect(`/summary/${summaryQuiz.quiz_id}`);
    }
  }, [currentQuiz, summaryQuiz]);
  

  if (isLoading) {
    return <LoadingQuestions finished={finished} />;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl sm:text-4xl text-center font-semibold">
        DASHBOARD
      </h1>

      <div className="flex items-center justify-center m-4 mb-5 sm:mb-10">
        <QuizMe />
      </div>
      <div className="flex items-center justify-center m-4 mt-5 sm:mt-10">
        <TopPicks />
      </div>
      <div>
        <QuizHistory totalQuiz={prevQuizzes.totalCount}/>
      </div>
    </div>
  );
};

export default Dashboard;
