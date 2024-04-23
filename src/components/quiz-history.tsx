'use client';
import React from 'react';
import { BiHistory } from 'react-icons/bi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoadMore from './load-more';
import { useQuiz } from '@/contexts/quiz-context';
import SingleQuiz from './single-quiz';
import { ScrollArea } from './ui/scroll-area';
const QuizHistory = ({ totalQuiz }: { totalQuiz: number }) => {
    const { quizzes } = useQuiz();

    return (
        <Card className='h-full w-full'>
            <CardHeader className='pb-0'>
                <div className='flex items-center space-x-2'>
                    <BiHistory className='h-6 w-6' />
                    <CardTitle className='text-[1.5rem]'>History</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription className='pb-3'>
                    You have played a total of {totalQuiz} quizzes
                </CardDescription>
                <ScrollArea className='h-[304px] lg:h-[255px] xl:h-[310px]'>
                    <div className='space-y-4'>
                        {quizzes?.map((quiz) => {
                            return <SingleQuiz quiz={quiz} key={quiz.id} />;
                        })}
                        <LoadMore />
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default QuizHistory;
