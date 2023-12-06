"use client";
import React, { useEffect } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { redirect } from "next/navigation";
import { BsFillMortarboardFill } from "react-icons/bs";
import { BiSolidDashboard, BiSolidTimer } from "react-icons/bi";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader } from "./ui/card";
import SummaryTable from "./SummaryTable";
import { formatTime } from "@/utils/formatTime";

const SummaryPage = ({ quizID }: { quizID: string }) => {
  const { summaryQuiz, dispatch } = useQuiz();
  if (!summaryQuiz) {
    redirect('/');
  }

  useEffect(() => {
    dispatch({ type: 'RESET_QUIZ' });
  }, []);

  const correctAnswersCount = summaryQuiz.rawQuestions.correctAnswersCount;
  const totalQuestions = summaryQuiz.rawQuestions.questions.length;
  const correctPercentage = (correctAnswersCount / totalQuestions) * 100;
  const timeTaken = summaryQuiz.rawQuestions.timeTaken;
  let descriptionText = '';

  if (correctPercentage >= 70) {
    descriptionText =
      '👏 Excellent work! Your understanding of the topic is impressive. Keep it up! 👏';
  } else if (correctPercentage > 50) {
    descriptionText = '👍 Great job! Keep up the good work. 👍';
  } else {
    descriptionText = '😊 Nice try! Keep practicing to improve your score. 😊';
  }

  // Messages based on time taken
  let timeMessage = '';

  if (timeTaken < 60) {
    // Less than 1 minute
    timeMessage = '⏱️ Wow, you finished so quickly! Impressive speed! ⚡';
  } else if (timeTaken < 180) {
    // 1 to 3 minutes
    timeMessage = '⏱️ Good job! You completed the quiz at a steady pace. 🚀';
  } else {
    // More than 3 minutes
    timeMessage =
      "⏱️ Well done! You're as thoughtful as a wise tortoise in approaching each question. 🐢";
  }
  return (
    <div className='w-full sm:w-10/12 mx-auto text-white flex flex-col items-center justify-center px-6 py-4'>
      <header className='w-full flex flex-row justify-between items-center mb-14'>
        <h1 className='text-4xl sm:text-5xl font-bold'>Summary</h1>
        <Link href={'/'}>
          <Button className='text-black text-sm sm:text-base p-2 pr-3 rounded-lg inline-flex items-center justify-center active:bg-primary/80'>
            <BiSolidDashboard className='text-lg sm:text-xl font-semibold' />
            &nbsp;
            <span className='font-bold'>Back to Dashboard</span>
          </Button>
        </Link>
      </header>

      {/* Metrics */}
      <div className=' w-full flex flex-wrap justify-between gap-4'>
        {/* Score section */}
        <Card
          id='score'
          className='w-full md:w-5/12 p-4 pt-0 pb-0 border-b-[0.5px] border-white border-opacity-[.15] flex-nowrap'
        >
          <CardHeader className='flex flex-row items-center'>
            <BsFillMortarboardFill className='text-5xl mr-3' />
            &nbsp;
            <span className='text-3xl'>Score:&nbsp; </span>
            <span className='text-primary text-3xl'>
              {summaryQuiz.rawQuestions.correctAnswersCount}
            </span>
          </CardHeader>
          <CardDescription className='text-xl p-6'>{descriptionText}</CardDescription>
        </Card>

        {/* time section */}
        <Card
          id='time'
          className='w-full md:w-5/12 p-4 pt-0 border-b-[0.5px] border-white pb-1 border-opacity-[.15] flex-nowrap'
        >
          <CardHeader className='flex flex-row items-center'>
            <span className='text-primary text-3xl'>{formatTime(timeTaken)}</span>&nbsp;
            <BiSolidTimer className='text-5xl' />
          </CardHeader>
          <CardDescription className='text-xl p-4'>{timeMessage}</CardDescription>
        </Card>
      </div>
      <SummaryTable summaryQuiz={summaryQuiz.rawQuestions.questions} />
    </div>
  );
};

export default SummaryPage;
