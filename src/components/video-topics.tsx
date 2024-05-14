'use client';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { useQuiz } from '@/contexts/quiz-context';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingQuestions from './loading-questions';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { videoContext } from '@/contexts/quiz-context';
import { useRouter } from 'next/navigation';
const CreateQuizVideo = () => {
    const interestsRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const numberOfQuestionsRef = useRef<HTMLInputElement>(null);
    const {
        fetchQuestions,
        isLoading,
        fetchingFinished: finished,
        videoTranscriptsAndTopics,
        currentQuiz,
    } = useQuiz();
    const [currentIndex, setCurrentIndex] = useState(0);
    const topics = (videoTranscriptsAndTopics as videoContext).topics as string[];
    const summary = (videoTranscriptsAndTopics as videoContext).summary as string;
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, wholeVideo: Boolean) => {
        e.preventDefault();
        const interests = wholeVideo ? summary : topics[currentIndex];
        const numberOfQuestions = 4;
        // if (Number(numberOfQuestions) <= 0 || Number(numberOfQuestions) > 10) {
        //     toast.error('Number of questions should be between 1 and 10.');
        //     return;
        // }
        fetchQuestions(interests, Number(numberOfQuestions), 'Multiple Choice');
    };
    useEffect(() => {
        if (!topics) {
            router.push('/dashboard');
        }
    }, [topics]);
    useEffect(() => {
        if (currentQuiz) {
            const url = `/quiz/play`;
            router.push(url);
        }
    }, [currentQuiz]);
    const handleNext = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentIndex(currentIndex - 1);
    };
    if (isLoading) {
        return <LoadingQuestions finished={finished} />;
    }

    return (
        <div className='flex h-[76.5vh] items-center justify-center'>
            <Card className='w-max border-b-[0.5px] border-white border-opacity-40 p-4 pb-1 pt-1 sm:w-[450px]'>
                <CardHeader>
                    <CardTitle className='text-3xl'>Choose a Topic</CardTitle>
                    <CardDescription className='text-sm font-thin'>
                        We've analyzed the topics in your provided video, covering each subject
                        thoroughly.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Carousel className='w-full'>
                        <CarouselContent>
                            {topics?.map((topic, i) => {
                                return (
                                    <CarouselItem key={i}>
                                        <div className='p-1'>
                                            <Card>
                                                <CardContent className='flex aspect-square items-center justify-center p-6'>
                                                    <span className='text-center text-3xl font-semibold'>
                                                        {topic}
                                                    </span>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        <span onClick={handlePrevious}>
                            <CarouselPrevious />
                        </span>
                        <span onClick={handleNext}>
                            <CarouselNext />
                        </span>
                    </Carousel>
                </CardContent>
                <CardFooter>
                    <div className='flex-col'>
                        <Button onClick={(e) => handleSubmit(e, false)}>Create Quiz</Button>
                        <p>Or</p>
                        <Button onClick={(e) => handleSubmit(e, true)}>Quiz on Entire Video</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CreateQuizVideo;
