import React from 'react';
import { BsFillQuestionDiamondFill } from 'react-icons/bs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaArrowRight } from 'react-icons/fa6';

const QuizMe = () => {
    return (
        <Card className='w-full shadow-lg'>
            <CardHeader className='pb-2'>
                <div className='flex items-center space-x-2'>
                    <BsFillQuestionDiamondFill className='h-6 w-6' />
                    <CardTitle className='text-[1.5rem]'>Quiz Me!</CardTitle>
                </div>
                <CardDescription className='text-base lg:text-xs xl:text-base'>
                    Challenge yourself to a quiz with a topic of your choice.
                </CardDescription>
            </CardHeader>

            <CardContent className=''>
                <Link href={'/quiz'}>
                    <div className='flex items-center justify-center'>
                        <Button className='w-full bg-[#c8b6ff] text-sm'>
                            <div className='flex items-center justify-center'>
                                <p>Discover Your AI Quiz</p>
                                <FaArrowRight className='ml-2 h-4 w-4' />
                            </div>
                        </Button>
                    </div>
                </Link>
            </CardContent>
        </Card>
    );
};

export default QuizMe;
