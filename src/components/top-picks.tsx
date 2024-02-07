import React from 'react';
import { BiSolidBrain } from 'react-icons/bi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Topics from './topics';

const TopPicks = () => {
    return (
        <Card className='h-auto w-full'>
            <CardHeader className='pb-0'>
                <div className='flex items-center space-x-2'>
                    <BiSolidBrain className='h-6 w-6' />
                    <CardTitle className='text-[1.5rem]'>Our Top Picks!</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription className='pb-3 text-base lg:text-xs xl:text-base'>
                    Challenge yourself by exploring one of our suggested topics.
                </CardDescription>
                <Topics />
            </CardContent>
        </Card>
    );
};

export default TopPicks;
