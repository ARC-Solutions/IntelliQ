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
    <section className='items-center justify-center'>
      <h1 className='bg-primary rounded-md text-2xl text-black p-6 font-bold'>{question}</h1>
      <div className='w-full mt-4'>
        {answers.map((answer, i) => {
          return <Answer key={i} answer={answer.slice(3)} letter={answer.substring(0, 3)}></Answer>;
        })}
      </div>
    </section>
  );
};

export default QAndA;
