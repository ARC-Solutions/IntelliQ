'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useQuiz} from '@/contexts/QuizContext';
import {redirect} from 'next/navigation';
import {useEffect, useRef} from 'react';
import {toast} from 'react-toastify';
import LoadingQuestions from './LoadingQuestions';

const CreateQuiz = () => {
  const interestsRef = useRef<HTMLInputElement>(null);
  const numberOfQuestionsRef = useRef<HTMLInputElement>(null);
  const { fetchQuestions, currentQuiz, isLoading, fetchingFinished: finished } = useQuiz();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const interests = interestsRef.current?.value as string;
    const numberOfQuestions = numberOfQuestionsRef.current?.value as string;
    if (!interests || !numberOfQuestions) {
      toast.error('Please fill out all the fields');
      return;
    }
    if (Number(numberOfQuestions) <= 0 || Number(numberOfQuestions) > 10) {
      toast.error('Number of questions should be between 1 and 10.');
      return;
    }
    fetchQuestions(interests, Number(numberOfQuestions));
  };

  useEffect(() => {
    if (currentQuiz) {
      const url = `/quiz/play`;
      redirect(url);
    }
  }, [currentQuiz]);

  if (isLoading) {
    return <LoadingQuestions finished={finished} />;
  }

  return (
    <div className='flex items-center justify-center h-[76.5vh]'>
      <Card className='w-auto sm:w-[450px] border-b-[0.5px] border-white pt-1 pb-1 p-4 border-opacity-40'>
        <CardHeader>
          <CardTitle className='text-3xl'>Create a Quiz</CardTitle>
          <CardDescription className='text-sm font-thin'>
            Are you ready to be challenged ?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div>
              <div className='mb-5'>
                <div className='mb-1.5'>
                  <Label htmlFor='topic' className='text-xl'>
                    Topic
                  </Label>
                </div>
                <Input
                  type='text'
                  id='topic'
                  placeholder='Enter a Topic'
                  ref={interestsRef}
                  className='placeholder:text-white font-medium placeholder:opacity-70 border-b-[0.5px] border-white pt-1 pb-1 border-opacity-40'
                />
                <CardDescription className='text-xs sm:text-sm font-thin mt-1'>
                  Provide a topic you&apos;d like to have a quiz about
                </CardDescription>
              </div>
              <div className='mb-5'>
                <div className='mb-1.5'>
                  <Label htmlFor='number' className='text-xl'>
                    Number of Questions
                  </Label>
                </div>
                <Input
                  id='number'
                  type='number'
                  min={1}
                  max={10}
                  placeholder='How many Questions?'
                  ref={numberOfQuestionsRef}
                  className='placeholder:text-white font-medium placeholder:opacity-70 border-b-[0.5px] border-white pt-1 pb-1 border-opacity-40'
                />
                <CardDescription className='text-xs sm:text-sm font-thin mt-1'>
                  Choose a number between 1 and 10
                </CardDescription>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              className='w-full/50 text-center rounded-sm text-base font-bold p-6 pb-2 pt-2 hover:bg-primary/90 active:bg-primary/80'
            >
              Create
            </Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default CreateQuiz;
