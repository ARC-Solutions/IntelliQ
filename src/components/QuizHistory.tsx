'use client';
import React from 'react';
import { BiHistory } from 'react-icons/bi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoadMore from './load-more';
import { useQuiz } from '@/contexts/QuizContext';
import SingleQuiz from './SingleQuiz';
import { ScrollArea } from './ui/scroll-area';
const QuizHistory = ({ totalQuiz }: { totalQuiz: number }) => {
  const { quizzes } = useQuiz();

  return (
    <Card className='w-full h-full lg:h-[533px] xl:h-[597px]'>
      <CardHeader className='pb-0'>
        <div className='flex items-center space-x-2'>
          <BiHistory className='w-6 h-6' />
          <CardTitle className='text-[1.5rem]'>History</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className='pb-3'>
          You have played a total of {totalQuiz} quizzes
        </CardDescription>
        <ScrollArea className='h-[474px] lg:h-[414px] xl:h-[474px]'>
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
