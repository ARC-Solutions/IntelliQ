"use client";
import React, { useEffect } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { redirect } from "next/navigation";

const SummaryPage = () => {
  const { summaryQuiz, dispatch } = useQuiz();
  if (!summaryQuiz) {
    redirect("/");
  }
  useEffect(() => {
    dispatch({ type: "RESET_QUIZ" });
  }, []);
  return <div>{summaryQuiz.rawQuestions.correctAnswersCount}</div>;
};

export default SummaryPage;
