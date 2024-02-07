'use client';
import React, { useEffect } from 'react';
import { QuizHistories, useQuiz } from '@/contexts/quiz-context';
import { redirect } from 'next/navigation';
import { BsFillMortarboardFill } from 'react-icons/bs';
import { BiSolidDashboard, BiSolidTimer } from 'react-icons/bi';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardDescription, CardHeader } from './ui/card';
import SummaryTable from './summary-table';
import { formatTime } from '@/utils/format-time';

const SummaryPage = ({
    quizID,
    createdQuiz,
}: {
    quizID: string;
    createdQuiz: {
        quizzes: QuizHistories[];
        totalCount: number;
    };
}) => {
    const { summaryQuiz, dispatch } = useQuiz();
    if (!summaryQuiz) {
        redirect('/dashboard');
    }
    useEffect(() => {
        dispatch({ type: 'RESET_QUIZ' });
        dispatch({ type: 'STORE_QUIZZES', payload: createdQuiz.quizzes });
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
        <div className='mx-auto flex w-full flex-col items-center justify-center px-6 py-4 text-white sm:w-10/12'>
            <header className='mb-14 flex w-full flex-row items-center justify-between'>
                <h1 className='text-4xl font-bold sm:text-5xl'>Summary</h1>
                <Link href={'/dashboard'}>
                    <Button className='inline-flex items-center justify-center rounded-lg p-2 pr-3 text-sm text-black active:bg-primary/80 sm:text-base'>
                        <BiSolidDashboard className='text-lg font-semibold sm:text-xl' />
                        &nbsp;
                        <span className='font-bold'>Back to Dashboard</span>
                    </Button>
                </Link>
            </header>

            {/* Metrics */}
            <div className=' flex w-full flex-wrap justify-between gap-4'>
                {/* Score section */}
                <Card
                    id='score'
                    className='w-full flex-nowrap border-b-[0.5px] border-white border-opacity-[.15] p-4 pb-0 pt-0 md:w-5/12'
                >
                    <CardHeader className='flex flex-row items-center'>
                        <BsFillMortarboardFill className='mr-3 text-5xl' />
                        &nbsp;
                        <span className='text-3xl'>Score:&nbsp; </span>
                        <span className='text-3xl text-primary'>
                            {summaryQuiz.rawQuestions.correctAnswersCount}
                        </span>
                    </CardHeader>
                    <CardDescription className='p-6 text-xl'>{descriptionText}</CardDescription>
                </Card>

                {/* time section */}
                <Card
                    id='time'
                    className='w-full flex-nowrap border-b-[0.5px] border-white border-opacity-[.15] p-4 pb-1 pt-0 md:w-5/12'
                >
                    <CardHeader className='flex flex-row items-center'>
                        <span className='text-3xl text-primary'>{formatTime(timeTaken)}</span>
                        &nbsp;
                        <BiSolidTimer className='text-5xl' />
                    </CardHeader>
                    <CardDescription className='p-4 text-xl'>{timeMessage}</CardDescription>
                </Card>
            </div>
            <SummaryTable summaryQuiz={summaryQuiz.rawQuestions.questions} />
        </div>
    );
};

export default SummaryPage;
