'use client';

import Lottie from 'lottie-react';
import Loading2 from '../../public/loading2.json';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';

type Props = {
    finished: boolean;
};
const loadingTexts = [
    'Preparing Your Challenge... 🧠✨',
    'Unlocking the Quiz Adventure... 🔓📚',
    'Sharpening Your Wits... ✏️🤔',
    'Get Ready to Test Your Knowledge... 📝🧐',
    'Loading Brainpower... 🚀💡',
];
const LoadingQuestions = ({ finished }: Props) => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState(loadingTexts[0]);
    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * loadingTexts.length);
            setLoadingText(loadingTexts[randomIndex]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (finished) {
                    return 100;
                }
                if (prev === 100) {
                    return 99;
                }
                if (Math.random() < 0.1) {
                    return prev + 1;
                }
                return prev + 0.3;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [finished]);
    return (
        <div className='absolute left-1/2 top-1/2 flex w-[40] -translate-x-1/2 -translate-y-1/2 flex-col items-center md:w-[30vw]'>
            <Lottie animationData={Loading2} />
            <Progress value={progress} />
            <h1 className='mt-2 text-xl'>{loadingText}</h1>
        </div>
    );
};

export default LoadingQuestions;
