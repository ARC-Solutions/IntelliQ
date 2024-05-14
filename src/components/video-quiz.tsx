'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaArrowRight } from 'react-icons/fa6';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { showToast } from '@/utils/show-toast';
import { useQuiz } from '@/contexts/quiz-context';
import { useRouter } from 'next/navigation';

const VideoQuiz = () => {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const supabase = createClientComponentClient();
    const { setVideoLoading, setVideoTranscriptsAndTopics } = useQuiz();
    const handleSubmit = async () => {
        if (
            !inputRef.current?.value ||
            !inputRef.current?.value.startsWith('https://www.youtube.com/watch?v=')
        ) {
            showToast('destructive', 'WARNING!', 'Please Enter A Valid Youtube Url');
            return;
        }
        try {
            const input = inputRef.current?.value;
            setVideoLoading(true);
            const {
                data: { session },
            } = await supabase.auth.getSession();
            const accessToken = session?.access_token;
            const response = await fetch(`${process.env.NEXT_PUBLIC_PY_BE_URL}v1/transcribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    url: input,
                }),
            });
            const data = await response.json();
            console.log(data);
            
            setVideoTranscriptsAndTopics(data);
            router.push('/quiz/video');
        } catch (error) {
            console.log(error);
            showToast('destructive', 'ERROR!', 'An error occurred while processing your request');
        }
    };

    return (
        <Card className='w-full shadow-lg'>
            <CardHeader className='pb-0'>
                <div className='flex items-center space-x-2'>
                    <IoPlayCircleOutline className='h-6 w-6' />
                    <CardTitle className='text-[1.5rem]'>Your Video Quiz</CardTitle>
                </div>
            </CardHeader>

            <CardContent className='flex flex-col gap-2 p-3'>
                <div className='flex items-center justify-center gap-4'>
                    <Input
                        ref={inputRef}
                        className='py-6'
                        placeholder='https://www.youtube.com/watch?v=...'
                    />

                    <Button onClick={handleSubmit} className='w-1/2 py-6'>
                        <div className='flex items-center justify-center'>
                            <p>Start Learning!</p>
                            <FaArrowRight className='ml-2 h-4 w-4' />
                        </div>
                    </Button>
                </div>
                <p className='text-xs text-slate-400'>
                    Video requires subtitles for feature functionality
                </p>
            </CardContent>
        </Card>
    );
};

export default VideoQuiz;
