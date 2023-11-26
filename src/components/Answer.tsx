'use client';
import { useQuizLogic } from '@/contexts/QuizLogicContext';
import { Button } from './ui/button';

type Props = {
  answer: string;
  letter: string;
};

const Answer = ({ answer, letter }: Props) => {
  const { dispatch } = useQuizLogic();
  return (
    <Button
      onClick={() => dispatch({ type: 'SET_SELECTED_ANSWER', payload: answer })}
      className='w-full mt-2 mb-2 p-6 text-xl bg-black 
      text-white border rounded-lg border-white border-opacity-30
      justify-start hover:text-black font-medium'
    >
      <span id='letter' className='me-4'>
        {letter}
      </span>
      <span id='answer' className='capitalize'>
        {answer}
      </span>
    </Button>
  );
};

export default Answer;
