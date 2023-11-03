"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Quiz } from "@/contexts/QuizContext";
import Answer from "./Answer";
import { Card } from "./ui/card";
type Props = {
  quiz: Quiz[];
  questionNumber: number;
};

const QAndA = ({ quiz, questionNumber }: Props) => {
  const questionsAndAnswers = quiz[questionNumber] as Quiz;
  let { correctAnswer, options: answers, text: question } = questionsAndAnswers;
  return (
    <section>
      <Card className="w-fit">{question.slice(2)}</Card>
      <div className="flex flex-col">
        {answers.map((answer, i) => {
          return (
            <Answer
              key={i}
              answer={answer.slice(3)}
              letter={answer.substring(0, 3)}
            ></Answer>
          );
        })}
      </div>
    </section>
  );
};

export default QAndA;
