'use client';

import Lottie from 'lottie-react';
import loading from '../../public/VideoLoading.json';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';

const loadingTexts = [
    'Preparing Your Challenge... 🧠✨',
    'Unlocking the Quiz Adventure... 🔓📚',
    'Sharpening Your Wits... ✏️🤔',
    'Get Ready to Test Your Knowledge... 📝🧐',
    'Loading Brainpower... 🚀💡',
];
const VideoLoading = () => {
    const [loadingText, setLoadingText] = useState(loadingTexts[0]);
    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * loadingTexts.length);
            setLoadingText(loadingTexts[randomIndex]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='absolute left-1/2 top-1/2 flex w-[40] -translate-x-1/2 -translate-y-1/2 flex-col items-center md:w-[30vw]'>
            <Lottie animationData={loading} />
            <h1 className='mt-2 text-xl'>{loadingText}</h1>
        </div>
    );
};

export default VideoLoading;
