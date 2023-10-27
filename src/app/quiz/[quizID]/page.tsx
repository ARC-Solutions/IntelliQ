"use client";
import React from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { redirect } from "next/navigation";
type Props = {
  params: {
    quizID: string;
  };
};

const QuizGame = ({ params: { quizID } }: Props) => {
  const { currentQuiz } = useQuiz();

  if (!currentQuiz) {
    redirect("/quiz");
  }
  console.log(currentQuiz);

  return <div>{quizID}</div>;
};

export default QuizGame;
