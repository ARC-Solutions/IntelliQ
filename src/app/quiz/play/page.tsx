import Quiz from '@/components/Quiz';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Particles from '@/components/Particles';

export const metadata: Metadata = {
    title: 'Quiz',
};

const QuizGame = async () => {
    const supabase = createServerComponentClient({
        cookies,
    });
    const { session } = (await supabase.auth.getSession()).data;
    if (!session) {
        redirect('/');
    }
    return (
        <div>
            <Quiz />
            <Particles className='animate-fade-in absolute inset-0 -z-10' quantity={500} />
        </div>
    );
};

export default QuizGame;
