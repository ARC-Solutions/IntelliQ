'use client';
import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/contexts/quiz-context';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { IoTimer } from 'react-icons/io5';
import { AiFillCheckSquare, AiFillCloseSquare, AiOutlineRight } from 'react-icons/ai';
import { Card, CardDescription } from '@/components/ui/card';
import QAndA from '@/components/q-and-a';
import { useQuizLogic } from '@/contexts/quiz-logic-context';
import { showToast } from '@/utils/show-toast';
import Summarizing from '../../public/summarizing.json';
import Lottie from 'lottie-react';

const Quiz = () => {
    const { currentQuiz, submitQuiz, summaryQuiz } = useQuiz();
    const [userInput, setUserInput] = useState('');
    const [time, setTime] = useState({ minutes: 0, seconds: 0 });
    const [quizFinished, setQuizFinished] = useState(false);
    const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(0);
    const {
        questionNumber,
        setQuestionNumber,
        selectedAnswer,
        dispatch,
        correctAnswer,
        wrongAnswer,
        userAnswer,
    } = useQuizLogic();
    console.log(userAnswer);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!quizFinished) {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    const seconds = prevTime.seconds + 1;
                    const newMinutes = Math.floor(prevTime.minutes + seconds / 60);
                    const newSeconds = seconds % 60;
                    return {
                        minutes: newMinutes,
                        seconds: newSeconds,
                    };
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [quizFinished]);
    if (!currentQuiz) {
        redirect('/');
    }

    if (summaryQuiz) {
        setQuizFinished(false);
        setTime({ minutes: 0, seconds: 0 });
        dispatch({ type: 'RESET_GAME_LOGIC' });
        setQuestionNumber(0);
        redirect(`/summary/${summaryQuiz.quiz_id}`);
    }

    useEffect(() => {
        if (quizFinished) {
            setTimeout(() => {
                submitQuiz(userAnswer, totalTimeInSeconds);
            }, 3000);
        }
    }, [quizFinished]);

    if (quizFinished) {
        return (
            <div className='absolute left-1/2 top-1/2 flex w-[40] -translate-x-1/2 -translate-y-1/2 flex-col items-center md:w-[30vw]'>
                <h1 className='mt-2 text-xl'>Summarizing</h1>
                <Lottie animationData={Summarizing} />
            </div>
        );
    }
    console.log(currentQuiz);
    return (
        <div className='mx-auto flex w-[400] flex-col items-center justify-center p-4 text-white sm:w-[800px] '>
            <header className='mb-4 text-center text-2xl font-bold sm:text-4xl'>
                {currentQuiz.topic}
            </header>
            <section className='w-full rounded-lg p-6 text-center shadow-none'>
                <div className='mb-4 flex items-center justify-between'>
                    <Button className='inline-flex items-center rounded p-2 pr-3 text-sm font-medium text-black sm:text-xl'>
                        <IoTimer className='mr-2 text-base sm:text-2xl' />{' '}
                        <span id='time'>
                            {time.minutes > 0 ? `${time.minutes}m ` : ''}
                            {time.seconds}s
                        </span>
                    </Button>
                    <Card className='flex items-center rounded-lg border-b-[0.5px] border-white border-opacity-20 text-2xl font-bold text-green-500'>
                        <div className='mx-2 flex items-center'>
                            <AiFillCheckSquare className='text-2xl sm:text-3xl ' />
                            <span className='mb-1 ml-1 text-2xl sm:text-3xl'>{correctAnswer}</span>
                        </div>
                        <div className='mx-2 flex items-center text-red-500'>
                            <span className='mb-1 mr-1 text-2xl sm:text-3xl'>{wrongAnswer}</span>
                            <AiFillCloseSquare className='text-2xl sm:text-3xl' />
                        </div>
                    </Card>
                </div>

                <CardDescription className='my-3 flex items-start text-sm sm:text-base'>
                    <span>{questionNumber + 1}</span>&nbsp;out of {currentQuiz.quiz.length}{' '}
                    Questions
                </CardDescription>
                <QAndA
                    quiz={currentQuiz.quiz}
                    questionNumber={questionNumber}
                    quizType={currentQuiz.quizType}
                    userInput={userInput}
                    setUserInput={setUserInput}
                />
                <Button
                    disabled={quizFinished}
                    onClick={() => {
                        if (selectedAnswer || currentQuiz.quizType === 'Fill in the Blank') {
                            // Validate answer for both quiz types. For fill-in-the-blank,
                            // the input field directly modifies selectedAnswer in state.
                            dispatch({
                                type: 'VALIDATE_ANSWER',
                                payload: {
                                    question: currentQuiz.quiz[questionNumber].text,
                                    correctAnswer:
                                        currentQuiz.quizType === 'Multiple Choice'
                                            ? currentQuiz.quiz[questionNumber].correctAnswer.slice(
                                                  3,
                                              )
                                            : currentQuiz.quiz[questionNumber].correctAnswer,
                                    userAnswer: selectedAnswer,
                                },
                            });
                            setUserInput('');
                            if (questionNumber < currentQuiz.quiz.length - 1) {
                                setQuestionNumber(questionNumber + 1);
                            } else {
                                setQuizFinished(true);
                                setTotalTimeInSeconds(time.minutes * 60 + time.seconds);
                            }
                        } else {
                            showToast(
                                'destructive',
                                'WARNING!',
                                'Please provide an answer before proceeding',
                            );
                        }
                    }}
                    className='w-full/50 mt-4 rounded-lg px-6 py-2 text-center text-base font-bold hover:bg-primary/90 active:bg-primary/80'
                >
                    Next <AiOutlineRight />
                </Button>
            </section>
        </div>
    );
};

export default Quiz;
