import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Main = () => {
    return (
        <main className='flex flex-col items-center justify-center space-y-8 px-8 py-16'>
            <h2 className='pb-5 text-center text-5xl font-bold'>
                Welcome to <span className='text-primary'> IntelliQ</span>
            </h2>
            <p className='max-w-lg text-center text-xl'>
                We create quizzes based on your interests.
            </p>
            <Link href='/signup'>
                <Button className='rounded bg-[#c8b6ff] px-8 py-2 text-[#040404]'>
                    Get Started
                </Button>
            </Link>
        </main>
    );
};

export default Main;
