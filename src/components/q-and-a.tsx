import React, { useEffect, useState } from 'react';
import { Quiz } from '@/contexts/quiz-context';
import Answer from './answer';
import { useQuizLogic } from '@/contexts/quiz-logic-context';

type Props = {
    quiz: Quiz[];
    questionNumber: number;
    quizType: string;
    userInput: string;
    setUserInput: React.Dispatch<React.SetStateAction<string>>;
};

const QAndA = ({ quiz, questionNumber, quizType, userInput, setUserInput }: Props) => {
    const { dispatch, selectedAnswer } = useQuizLogic();
    const question = quiz[questionNumber];
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
        dispatch({ type: 'SET_SELECTED_ANSWER', payload: e.target.value });
    };

    const isFillInTheBlank = quizType === 'Fill in the blank';
    let adjustedQuestionText;
    if (isFillInTheBlank) {
        adjustedQuestionText = question.text.replace(/__/g, '<input>');
    }
    useEffect(() => {
        setUserInput('');
    }, []);
    return (
        <section>
            <h1 className='w-full items-center rounded-md bg-primary p-6 text-center text-base font-bold text-black sm:text-2xl'>
                {quizType === 'Fill in the blank'
                    ? quiz[questionNumber].questionTitle
                    : quiz[questionNumber]?.text}
            </h1>
            <div className='mt-4 w-auto text-center text-lg'>
                {isFillInTheBlank ? (
                    <>
                        {adjustedQuestionText?.split('<input>')[0]}
                        <input
                            type='text'
                            value={userInput}
                            onChange={handleInputChange}
                            className='mb-2 mt-2 inline-block rounded-md border border-gray-300 px-3 py-1 text-black'
                            style={{ width: '250px' }} // Set a specific width for the input field
                        />
                        {adjustedQuestionText?.split('<input>')[1]}
                    </>
                ) : (
                    question.options.map((answer, i) => (
                        <Answer key={i} answer={answer.slice(3)} letter={answer.substring(0, 3)} />
                    ))
                )}
            </div>
        </section>
    );
};

export default QAndA;
