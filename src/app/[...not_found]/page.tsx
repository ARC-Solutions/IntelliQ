'use client';

import Lottie from 'lottie-react';
import Error from '../../../public/404.json';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
    return (
        <div className='absolute left-1/2 top-1/2 flex w-[40] -translate-x-1/2 -translate-y-1/2 flex-col items-center md:w-[30vw]'>
            <Lottie animationData={Error} />
            <Link href='/'>
                <Button>Back Home</Button>{' '}
            </Link>
        </div>
    );
};

export default NotFoundPage;
