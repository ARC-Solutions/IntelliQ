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
      className='w-full my-3 p-7 text-sm sm:text-xl bg-black 
      text-white border rounded-lg border-white border-opacity-30
      justify-start hover:text-black hover:border-none font-medium'
    >
      <span id='letter' className='me-4 text-base sm:text-2xl'>
        {letter}
      </span>
      <span id='answer' className='capitalize'>
        {answer}
      </span>
    </Button>
  );
};

export default Answer;
