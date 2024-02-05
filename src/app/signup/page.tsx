import SignUpCard from '@/components/SignUpCard';
import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Particles from '@/components/Particles';
export const metadata: Metadata = {
    title: 'Sign Up',
};
const SignUpPage = async () => {
    const supabase = createServerComponentClient({
        cookies,
    });
    const session = (await supabase.auth.getSession()).data.session;
    if (session) {
        redirect('/dashboard');
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <Particles className='animate-fade-in absolute inset-0 -z-10' quantity={500} />
            <h1 className='text-center font-candara text-2xl font-semibold sm:text-3xl'>
                Quiz Yourself on Your Chosen Topic with
                <span className='text-primary'> IntelliQ</span>.
            </h1>
            <div className='m-2 mb-5 text-center text-[14.5px] font-light opacity-70 sm:text-[17.5px]'>
                I am IntelliQ, created and maintained by
                <span className='text-primary'> ARC-Solutions</span>
            </div>
            <div className='m-2 flex items-center justify-center'>
                <SignUpCard />
            </div>
        </div>
    );
};

export default SignUpPage;
