'use client';
import { useEffect, useState } from 'react';
import { QuizHistories, useQuiz } from '@/contexts/quiz-context';
import { useInView } from 'react-intersection-observer';
import Spinner from './ui/spinner';
import { fetchAllQuizzes } from '@/utils/fetch-all-quizzes';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const LoadMore = () => {
    const [quizzes, setQuizzes] = useState<QuizHistories[]>([]);
    const [showSpinner, setShowSpinner] = useState(true);
    const { dispatch } = useQuiz();
    const [offset, setOffset] = useState(0);
    const { ref, inView } = useInView();
    const supabase = createClientComponentClient();

    const loadMoreQuizzes = async () => {
        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            const accessToken = session?.access_token as string;
            const nextOffset = offset + 10;
            const newQuizHistories = await fetchAllQuizzes(accessToken, nextOffset);
            if (newQuizHistories.quizzes.length > 0) {
                setQuizzes((prevQuizzes: QuizHistories[]) => [
                    ...prevQuizzes,
                    ...newQuizHistories.quizzes,
                ]);
                dispatch({
                    type: 'FETCH_MORE_QUIZZES',
                    payload: newQuizHistories.quizzes,
                });

                setOffset(nextOffset);
                return;
            }
            setShowSpinner(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (inView) {
            loadMoreQuizzes();
        }
    }, [inView]);

    return (
        <div
            className='col-span-1 flex items-center justify-center p-4 sm:col-span-2 md:col-span-3'
            ref={ref}
        >
            {showSpinner && <Spinner />}
        </div>
    );
};

export default LoadMore;
