"use client";
import QuizMe from "@/components/QuizMe";
import TopPicks from "@/components/TopPicks";
import {QuizHistories, useQuiz} from "@/contexts/QuizContext";
import LoadingQuestions from "./LoadingQuestions";
import {useEffect} from "react";
import {redirect} from "next/navigation";
import QuizHistory from "./QuizHistory";

const Dashboard = ({
                       prevQuizzes,
                   }: {
    prevQuizzes: {
        quizzes: QuizHistories[],
        totalCount: number
    }
}) => {
    const {
        isLoading,
        fetchingFinished: finished,
        currentQuiz,
        dispatch,
        summaryQuiz
    } = useQuiz();
    useEffect(() => {
        dispatch({type: "RESET_SUMMARY_QUIZ"});
        dispatch({type: "STORE_QUIZZES", payload: prevQuizzes.quizzes});
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
        return <LoadingQuestions finished={finished}/>;
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className="text-3xl sm:text-4xl text-center font-semibold">
                DASHBOARD
            </h1>
            <div className="grid grid-rows-3 grid-flow-col gap-5">
                <div className='col-span-1'>
                    <QuizMe/>
                </div>
                <div className='row-span-2 col-span-1'>
                    <TopPicks/>
                </div>
                <div className='row-span-3'>
                    <QuizHistory totalQuiz={prevQuizzes.totalCount}/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
