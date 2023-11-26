'use client';
import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { IoTimer } from 'react-icons/io5';
import { AiFillCheckSquare, AiFillCloseSquare, AiOutlineRight } from 'react-icons/ai';
import { Card, CardDescription } from '@/components/ui/card';
import QAndA from '@/components/QAndA';
import { useQuizLogic } from '@/contexts/QuizLogicContext';
import { showToast } from '@/utils/showToast';
import Summarizing from '../../public/summarizing.json';
import Lottie from 'lottie-react';

const Quiz = () => {
  const { currentQuiz, submitQuiz, summaryQuiz } = useQuiz();
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
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40] md:w-[30vw] flex flex-col items-center'>
        <h1 className='mt-2 text-xl'>Summarizing</h1>
        <Lottie animationData={Summarizing} />
      </div>
    );
  }
  return (
    <div className='w-[400] sm:w-[800px] mx-auto text-white flex flex-col items-center justify-center p-4 '>
      <header className='text-4xl sm:text-6xl font-bold mb-4'>
        {currentQuiz.quiz[questionNumber].questionTitle}
      </header>
      <section className='w-full p-6 rounded-lg shadow-md text-center'>
        <div className='flex justify-between items-center mb-4'>
          <Button className='text-black text-sm sm:text-xl font-medium p-2 pr-3 rounded inline-flex items-center'>
            <IoTimer className='text-base sm:text-2xl mr-2' />{' '}
            <span id='time'>
              {time.minutes > 0 ? `${time.minutes}m ` : ''}
              {time.seconds}s
            </span>
          </Button>
          <Card className='flex items-center text-green-500 text-2xl font-bold border-b-[0.5px] rounded-lg border-white border-opacity-20'>
            <div className='flex items-center mx-2'>
              <AiFillCheckSquare className='text-xl sm:text-2xl' />
              <span className='ml-1 text-xl sm:text-2xl'>{correctAnswer}</span>
            </div>
            <div className='flex items-center text-red-500 mx-2'>
              <span className='mr-1 text-xl sm:text-2xl'>{wrongAnswer}</span>
              <AiFillCloseSquare className='text-xl sm:text-2xl' />
            </div>
          </Card>
        </div>

        <CardDescription className='flex items-start my-3 text-sm sm:text-base'>
          <span>{questionNumber + 1}</span>&nbsp;out of {currentQuiz.quiz.length} Questions
        </CardDescription>
        <QAndA quiz={currentQuiz.quiz} questionNumber={questionNumber} />
        <Button
          disabled={quizFinished}
          onClick={() => {
            if (selectedAnswer) {
              dispatch({
                type: 'VALIDATE_ANSWER',
                payload: {
                  question: currentQuiz.quiz[questionNumber].text,
                  correctAnswer: currentQuiz.quiz[questionNumber].correctAnswer.slice(3),
                  userAnswer: selectedAnswer,
                },
              });
              setQuestionNumber((prevQuestionNumber) => {
                return prevQuestionNumber >= currentQuiz.quiz.length - 1
                  ? prevQuestionNumber
                  : prevQuestionNumber + 1;
              });

              if (questionNumber >= currentQuiz.quiz.length - 1) {
                setQuizFinished(true);
                setTotalTimeInSeconds(time.minutes * 60 + time.seconds);
              }
            } else {
              showToast('destructive', 'WARNING!', 'Please choose an answer before proceeding');
            }
          }}
          className='mt-4 w-full/50 text-center rounded-lg text-base font-bold px-6 py-2 hover:bg-primary/90 active:bg-primary/80'
        >
          Next <AiOutlineRight />
        </Button>
      </section>
    </div>
  );
};

export default Quiz;
