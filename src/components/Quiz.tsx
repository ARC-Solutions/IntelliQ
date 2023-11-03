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
import { showToast } from "@/utils/showToast";

const Quiz = () => {
  const { currentQuiz } = useQuiz();
  const {
    questionNumber,
    setQuestionNumber,
    selectedAnswer,
    dispatch,
    correctAnswer,
    wrongAnswer,
  } = useQuizLogic();
  if (!currentQuiz) {
    redirect("/quiz");
  }
  return (
    <div>
      <h1>{currentQuiz.quiz[questionNumber].questionTitle}</h1>
      <section className="flex">
        <Button>
          <IoTimer /> 1m 5s
        </Button>
        <Card className="flex max-w-fit">
          <div>
            <AiFillCheckSquare />
            <span>{correctAnswer}</span>
          </div>
          <div>
            <AiFillCloseSquare />
            <span>{wrongAnswer}</span>
          </div>
        </Card>
      </section>
      <CardDescription>
        <span>{questionNumber + 1}</span> out of {currentQuiz.quiz.length}{" "}
        Questions
      </CardDescription>
      <QAndA quiz={currentQuiz.quiz} questionNumber={questionNumber} />
      <Button
        onClick={() => {
          if (selectedAnswer) {
            dispatch({
              type: "VALIDATE_ANSWER",
              payload: currentQuiz.quiz[questionNumber].correctAnswer.slice(3),
            });

            setQuestionNumber((questionNumber) => {
              if (questionNumber >= currentQuiz.quiz.length - 1) {
                return questionNumber;
              }
              return questionNumber + 1;
            });
            dispatch({ type: "SET_SELECTED_ANSWER", payload: null });
          } else {
            showToast(
              "destructive",
              "WARNING!",
              "Please choose an answer before proceeding"
            );
          }
        }}
      >
        Next <AiOutlineRight />
      </Button>
    </div>
  );
};

export default Quiz;
