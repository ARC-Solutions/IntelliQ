import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import VideoTopics from '@/components/video-topics';
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
            <VideoTopics />
        </div>
    );
}
