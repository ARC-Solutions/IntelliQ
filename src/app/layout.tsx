import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import Navbar from '@/components/ui/navbar';
import { AuthProvider } from '@/contexts/user-context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SupabaseProvider } from '@/contexts/supabase-context';
import { QuizProvider } from '@/contexts/quiz-context';
import QuizLogicContextProvider from '@/contexts/quiz-logic-context';
import { Toaster } from '@/components/ui/toaster';
import GoogleAnalytics from '@/components/google-analytics';
import CookieConsent from '@/components/cookie-banner/cookie';

const inter = Inter({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '600', '700', '800'],
});
export const revalidate = 0;
export const metadata: Metadata = {
    title: {
        default: 'IntelliQ',
        template: '%s | IntelliQ',
    },
    description: 'Test your expertise across various subjects with IntelliQ',
    openGraph: {
        title: 'IntelliQ',
        description: 'Test your expertise across various subjects with IntelliQ',
        url: 'www.intelliq.dev',
        siteName: 'IntelliQ',
        images: [
            {
                url: 'https://www.intelliq.dev/intelliq_og.png',
                width: 1920,
                height: 1080,
            },
        ],
        locale: 'en-US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        title: 'IntelliQ',
        card: 'summary_large_image',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.png',
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body
                className={cn(
                    inter.className,
                    `min-h-screen bg-gradient-to-tl from-black via-violet-700/10 to-black pt-32 antialiased`,
                )}
            >
                <GoogleAnalytics />
                <SupabaseProvider>
                    <AuthProvider>
                        <QuizProvider>
                            <QuizLogicContextProvider>
                                <Navbar />
                                {children}
                                <CookieConsent className='animate-fade-in' />
                                <Toaster />
                            </QuizLogicContextProvider>
                        </QuizProvider>
                    </AuthProvider>
                    <ToastContainer position='top-right' autoClose={2000} />
                </SupabaseProvider>
            </body>
        </html>
    );
}
