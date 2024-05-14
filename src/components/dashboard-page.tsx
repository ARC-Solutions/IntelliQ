'use client';
import QuizMe from '@/components/quiz-me';
import VideoQuiz from '@/components/video-quiz';
import TopPicks from '@/components/top-picks';
import { QuizHistories, useQuiz } from '@/contexts/quiz-context';
import LoadingQuestions from './loading-questions';
import VideoLoading from './video-loading';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import QuizHistory from './quiz-history';
import InfoDialog from '@/components/info-dialog';

const Dashboard = ({
    prevQuizzes,
}: {
    prevQuizzes: {
        quizzes: QuizHistories[];
        topFiveTopics: string[];
        totalCount: number;
    };
}) => {
    const {
        isLoading,
        setVideoLoading,
        videoLoading,
        fetchingFinished: finished,
        currentQuiz,
        dispatch,
        summaryQuiz,
    } = useQuiz();
    console.log(prevQuizzes);

    useEffect(() => {
        dispatch({ type: 'RESET_SUMMARY_QUIZ' });
        dispatch({ type: 'STORE_QUIZZES', payload: prevQuizzes.quizzes });
        setVideoLoading(false);
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
    if (videoLoading) {
        return <VideoLoading />;
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='mb-4 text-center text-3xl font-semibold lg:text-4xl'>DASHBOARD</h1>
            <InfoDialog />
            <div className='m-2 mt-12 gap-8 lg:grid lg:grid-cols-2'>
                <div className='col-span-1 m-4 lg:m-0'>
                    <QuizMe />
                </div>

                <div className='row-cols-2 col-span-1  m-4 lg:m-0'>
                    <VideoQuiz />
                </div>
                <div className='col-span-1 m-4 lg:m-0'>
                    <TopPicks />
                </div>

                <div className='col-span-1 m-4 lg:m-0'>
                    <QuizHistory totalQuiz={prevQuizzes.totalCount} />
                </div>
                <div className='col-span-1 m-4 lg:m-0'>
                    <h1>Top Trending Topics</h1>
                    <ul>
                        {prevQuizzes.topFiveTopics.map((topic) => {
                            return <li key={topic}>{topic}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
