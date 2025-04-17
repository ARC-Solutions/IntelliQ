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
import GoogleAnalytics from '@/app/google-analytics';

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
    description: 'Test your expertise across various subjects with IntelliQ.',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.png',
        apple: '/apple-touch-icon.png',
    },
    applicationName: 'IntelliQ',
    creator: '@rickyraveanu @noppin7 @nikola-petro',
    openGraph: {
        title: 'IntelliQ',
        description: 'Test your expertise across various subjects with IntelliQ.',
        siteName: 'IntelliQ',
        type: 'website',
        locale: 'en-US',
        url: 'www.intelliq.dev',
        images: [
            {
                url: 'https://www.intelliq.dev/intelliq_og.png',
                width: 1920,
                height: 1080,
                alt: 'IntelliQ',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'IntelliQ',
        description: 'Test your expertise across various subjects with IntelliQ.',
        creator: '@rickyraveanu @noppin7 @nikola-petro',
        images: [
            {
                url: 'https://www.intelliq.dev/intelliq_og.png',
                width: 1920,
                height: 1080,
                alt: 'IntelliQ',
            },
        ],
    },
    category: 'education',
    alternates: {
        canonical: 'https://www.intelliq.dev',
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
    keywords: [
        'Quiz',
        'AI Quiz',
        'Interactive Quiz',
        'Custom Quiz',
        'Personalized Learning',
        'Educational Platform',
        'Document Quizzes',
        'Multiplayer Quizzes',
        'Single Player Quizzes',
        'Random Quizzes',
        'Knowledge Testing',
        'Education',
        'Learn',
        'AI Powered',
        'Trivia',
        'Self Assessment',
        'Quiz Creator',
        'Quiz Builder',
        'Learning Platform',
        'Smart Quiz',
    ],
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'http://localhost:3000'),
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
