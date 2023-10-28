import SignUpCard from '@/components/SignUpCard';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function Home() {
  const supabase = createServerComponentClient(
    {
      
      cookies,
    },
    {
      supabaseUrl: 'https://zqlyjxjncdapbnvopnnn.supabase.co/',
      supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbHlqeGpuY2RhcGJudm9wbm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyMjI0NzAsImV4cCI6MjAxMzc5ODQ3MH0.suewiHX8bn4G7JP8E5RaQVAkJo_OziefF8Zc31MBcnM',
    },
  );
  const session = (await supabase.auth.getSession()).data.session;
  if (session) {
    redirect('/dashboard');
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-2xl sm:text-3xl text-center font-candara font-semibold'>
        Quiz Yourself on Your Chosen Topic with
        <span className='text-primary'> IntelliQ</span>.
      </h1>
      <div className='text-[14.5px] sm:text-[17.5px] font-light opacity-70 m-2 mb-5 text-center'>
        I am IntelliQ, created and maintained by
        <span className='text-primary'> ARC-Solutions</span>
      </div>
      <div className='flex items-center justify-center'>
        <SignUpCard />
      </div>
    </div>
  );
}
