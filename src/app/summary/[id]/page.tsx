"use client";
import { useQuiz } from "@/contexts/QuizContext";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Summary = () => {
  const { summaryQuiz, dispatch } = useQuiz();
  if (!summaryQuiz) {
    redirect("/");
  }
  useEffect(() => dispatch({ type: "RESET_QUIZ" }), []);
  return <div>{summaryQuiz?.rawQuestions.correctAnswersCount}</div>;
};

export default Summary;
