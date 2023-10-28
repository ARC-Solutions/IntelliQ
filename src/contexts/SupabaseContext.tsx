'use client';
import { createPagesBrowserClient, type SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

type SupabaseContext = {
  supabase: SupabaseClient;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [supabase] = useState(() =>
    createPagesBrowserClient({
      supabaseUrl: 'https://zqlyjxjncdapbnvopnnn.supabase.co/',
      supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbHlqeGpuY2RhcGJudm9wbm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyMjI0NzAsImV4cCI6MjAxMzc5ODQ3MH0.suewiHX8bn4G7JP8E5RaQVAkJo_OziefF8Zc31MBcnM',
    }),
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        router.refresh();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);
  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }
  return context;
};
