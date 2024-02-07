import SummaryPage from '@/components/summary-page';
import { Metadata } from 'next';
import React from 'react';
import { fetchAllQuizzes } from '@/utils/fetch-all-quizzes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Particles from '@/components/particles';

export const metadata: Metadata = {
    title: 'Summary',
};
const Summary = async ({ params }: { params: { id: string } }) => {
    const supabase = createServerComponentClient({
        cookies,
    });
    const { session } = (await supabase.auth.getSession()).data;
    const accessToken = session?.access_token as string;
    const data = await fetchAllQuizzes(accessToken, 0);
    console.log(data);

    return (
        <div>
            <Particles className='animate-fade-in absolute inset-0 -z-10' quantity={500} />
            <SummaryPage quizID={params.id} createdQuiz={data} />
        </div>
    );
};

export default Summary;
