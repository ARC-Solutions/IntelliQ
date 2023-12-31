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
      className='group font-normal w-full my-3 p-7 text-sm sm:text-lg bg-black text-white border rounded-lg border-primary border-opacity-30 justify-start hover:text-black hover:border-none focus:bg-primary focus:text-black'
    >
      <span
        id='letter'
        className='me-4 text-base sm:text-2xl border border-primary/60 px-2 py-1 border-opacity-20 rounded-md group-hover:border-black group-focus:border-black'
      >
        {letter}
      </span>
      <span id='answer' className='capitalize'>
        {answer}
      </span>
    </Button>
  );
};

export default Answer;
