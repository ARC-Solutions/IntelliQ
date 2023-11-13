"use client";
import React from "react";
import { Quiz } from "@/contexts/QuizContext";
import Answer from "./Answer";
type Props = {
  quiz: Quiz[];
  questionNumber: number;
};

const QAndA = ({ quiz, questionNumber }: Props) => {
  const questionsAndAnswers = quiz[questionNumber] as Quiz;
  let { options: answers, text: question } = questionsAndAnswers;
  return (
    <section>
      <h1 className="w-fit">{question.slice(3)}</h1>
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
