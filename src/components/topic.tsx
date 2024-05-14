'use client';
import { useQuiz } from '@/contexts/quiz-context';
import { RecommendedTopic } from './topics';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { redirect } from 'next/navigation';
import { cloneElement } from 'react';

const Topic = ({ name, icon }: RecommendedTopic) => {
    const { fetchQuestions } = useQuiz();
    const sizeIcon = cloneElement(icon, { className: 'w-10 h-10' });
    return (
        <Card
            onClick={() => {
                fetchQuestions(name, 4, 'Multiple Choice');
                redirect('/quiz');
            }}
            className='block w-full cursor-pointer'
        >
            <CardContent className='flex h-auto items-center space-x-2 p-4 lg:space-x-0 lg:p-4 xl:space-x-2 xl:p-6'>
                {sizeIcon}

                <CardTitle className='text-[1rem] lg:text-[15px]'>{name}</CardTitle>
            </CardContent>
        </Card>
    );
};

export default Topic;
