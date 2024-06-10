import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import VideoTopics from '@/components/video-topics';
import Particles from '@/components/particles';
export const metadata: Metadata = {
    title: 'Video Topics',
};

export default async function Video() {
    const supabase = createServerComponentClient({
        cookies,
    });
    const { session } = (await supabase.auth.getSession()).data;
    if (!session) {
        redirect('/');
    }
    return (
        <div>
            <Particles className='animate-fade-in absolute inset-0 -z-10' quantity={500} />
            <VideoTopics />
        </div>
    );
}
