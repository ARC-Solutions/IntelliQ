'use client';
import React from 'react';
import { Card, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { QuizHistories, useQuiz } from '@/contexts/quiz-context';
import { FaBookOpen } from 'react-icons/fa6';
import { MdAccessTimeFilled } from 'react-icons/md';

type Props = {
    quiz: QuizHistories;
};

const SingleQuiz = ({ quiz }: Props) => {
    const { fetchSingleQuiz } = useQuiz();
    return (
        <Card
            className='flex cursor-pointer flex-row items-center gap-6 p-4'
            onClick={() => {
                fetchSingleQuiz(quiz.id);
            }}
        >
            <FaBookOpen className='hidden h-4 w-4 sm:inline-block' />
            <CardTitle className='flex-grow'>{quiz.quiz_title}</CardTitle>
            <Button>
                <MdAccessTimeFilled />
                {quiz.created_at}
            </Button>
        </Card>
    );
};

export default SingleQuiz;
