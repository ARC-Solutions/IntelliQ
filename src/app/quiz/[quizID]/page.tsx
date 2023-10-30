"use client";
import React from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoTimer } from "react-icons/io5";
import {
  AiFillCheckSquare,
  AiFillCloseSquare,
  AiOutlineRight,
} from "react-icons/ai";
import { Card, CardDescription } from "@/components/ui/card";
import QAndA from "@/components/QAndA";
import { useQuizLogic } from "@/contexts/QuizLogicContext";
type Props = {
  params: {
    quizID: string;
  };
};

const QuizGame = ({ params: { quizID } }: Props) => {
  const { currentQuiz } = useQuiz();
  const { questionNumber, setQuestionNumber } = useQuizLogic();
  if (!currentQuiz) {
    redirect("/quiz");
  }

  return (
    <div>
      <h1>{currentQuiz.topic}</h1>
      <section className="flex">
        <Button>
          <IoTimer /> 1m 5s
        </Button>
        <Card className="flex max-w-fit">
          <div>
            <AiFillCheckSquare />4
          </div>
          <div>
            <AiFillCloseSquare />3
          </div>
        </Card>
      </section>
      <CardDescription>
        <span>{questionNumber + 1}</span> out of {currentQuiz.length} Questions
      </CardDescription>
      <QAndA quiz={currentQuiz.quiz} questionNumber={questionNumber} />
      <Button
        onClick={() => {
          setQuestionNumber((questionNumber) => {
            if (questionNumber >= currentQuiz.quiz.length - 1) {
              return questionNumber;
            }
            return questionNumber + 1;
          });
        }}
      >
        Next <AiOutlineRight />
      </Button>
    </div>
  );
};

export default QuizGame;
