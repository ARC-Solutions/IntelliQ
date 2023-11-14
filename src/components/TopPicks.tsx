import React from 'react';
import { BiSolidBrain } from 'react-icons/bi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Topics from './Topics';
const TopPicks = () => {
  return (
    <Card className='w-[350px] '>
      <CardHeader>
        <CardTitle className='text-xl sm:text-2xl'>
          Our Top Picks!
          <BiSolidBrain />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Challenge yourself by exploring one of our suggested topics.
        </CardDescription>
        <Topics />
      </CardContent>
    </Card>
  );
};

export default TopPicks;
