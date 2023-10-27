"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Quiz } from "@/contexts/QuizContext";
import Answer from "./Answer";
type Props = {
  quiz: Quiz[];
  questionNumber: number;
};

const QAndA = ({ quiz, questionNumber }: Props) => {
  const questionsAndAnswers = quiz[questionNumber] as Quiz;
  let { correctAnswer, options: answers, text: question } = questionsAndAnswers;
  question = question.slice(3);
  correctAnswer = correctAnswer.slice(3);
  answers = answers.slice(0, 4).map((answer) => answer.slice(3));;
  return (
    <section>
      <Button>{question}</Button>
      <div className="flex flex-col">
        {answers.map((answer, i) => {
          return <Answer answer={answer} number={i + 1}></Answer>;
        })}
      </div>
    </section>
  );
};

export default QAndA;
