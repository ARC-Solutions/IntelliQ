'use client';
import QuizMe from '@/components/QuizMe';
import TopPicks from '@/components/TopPicks';
import { QuizHistories, useQuiz } from '@/contexts/QuizContext';
import LoadingQuestions from './LoadingQuestions';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import QuizHistory from './QuizHistory';
import InfoDialog from '@/components/Info-Dialog';

const Dashboard = ({
    prevQuizzes,
}: {
    prevQuizzes: {
        quizzes: QuizHistories[];
        totalCount: number;
    };
}) => {
    const { isLoading, fetchingFinished: finished, currentQuiz, dispatch, summaryQuiz } = useQuiz();
    useEffect(() => {
        dispatch({ type: 'RESET_SUMMARY_QUIZ' });
        dispatch({ type: 'STORE_QUIZZES', payload: prevQuizzes.quizzes });
    }, []);
    useEffect(() => {
        if (currentQuiz) {
            const url = `/quiz/play`;
            redirect(url);
        }
        if (summaryQuiz) {
            redirect(`/summary/${summaryQuiz.quiz_id}`);
        }
    }, [currentQuiz, summaryQuiz]);

    if (isLoading) {
        return <LoadingQuestions finished={finished} />;
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center text-3xl font-semibold lg:text-4xl'>DASHBOARD</h1>
            <InfoDialog />
            <div className='m-2 mt-12 gap-8 lg:grid lg:grid-flow-col'>
                <div className='col-span-1 m-4 lg:m-0'>
                    <QuizMe />
                </div>
                <div className='col-span-1 row-span-2 m-4 mt-10 lg:m-0'>
                    <TopPicks />
                </div>
                <div className='row-span-3 m-4 mt-10 lg:m-0 lg:mt-0'>
                    <QuizHistory totalQuiz={prevQuizzes.totalCount} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
