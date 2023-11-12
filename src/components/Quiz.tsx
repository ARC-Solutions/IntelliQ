"use client";
import React, { useEffect, useState } from "react";
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
  const { currentQuiz, submitQuiz, summaryQuiz } = useQuiz();
  const [quizFinished, setQuizFinished] = useState(false);
  const {
    questionNumber,
    setQuestionNumber,
    selectedAnswer,
    dispatch,
    correctAnswer,
    wrongAnswer,
    userAnswer,
  } = useQuizLogic();

  if (!currentQuiz) {
    redirect("/");
  }
  if (summaryQuiz) {
    redirect(`/summary/${summaryQuiz.quiz_id}`);
  }
  useEffect(() => {
    if (quizFinished) {
      setTimeout(() => {
        submitQuiz(userAnswer);
        dispatch({ type: "RESET_GAME_LOGIC" });
      }, 3000);
    }
  }, [quizFinished]);

  if (quizFinished) {
    return <div>Analyzing</div>;
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
        disabled={quizFinished}
        onClick={() => {
          if (selectedAnswer) {
            dispatch({
              type: "VALIDATE_ANSWER",
              payload: {
                question: currentQuiz.quiz[questionNumber].text.slice(3),
                correctAnswer:
                  currentQuiz.quiz[questionNumber].correctAnswer.slice(3),
                userAnswer: selectedAnswer,
              },
            });
            setQuestionNumber((prevQuestionNumber) => {
              return prevQuestionNumber >= currentQuiz.quiz.length - 1
                ? prevQuestionNumber
                : prevQuestionNumber + 1;
            });

            if (questionNumber >= currentQuiz.quiz.length - 1) {
              setQuizFinished(true);
            }
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
