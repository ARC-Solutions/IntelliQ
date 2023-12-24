import './globals.css';
import {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {cn} from '@/lib/utils';
import Navbar from '@/components/ui/Navbar';
import {AuthProvider} from '@/contexts/UserContext';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SupabaseProvider} from '@/contexts/SupabaseContext';
import {QuizProvider} from '@/contexts/QuizContext';
import QuizLogicContextProvider from '@/contexts/QuizLogicContext';
import {Toaster} from '@/components/ui/toaster';
import Particles from "@/components/Particles";
import GoogleAnalytics from "@/app/GoogleAnalytics";

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
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
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

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang='en'>
        <body
            className={cn(inter.className, `antialiased min-h-screen pt-32 bg-gradient-to-tl from-black via-violet-700/10 to-black`)}>
        <Particles
            className="absolute inset-0 -z-10 animate-fade-in"
            quantity={500}
        />
        <GoogleAnalytics />
        <SupabaseProvider>
            <AuthProvider>
                <QuizProvider>
                    <QuizLogicContextProvider>
                        <Navbar/>
                        {children}
                        <Toaster/>
                    </QuizLogicContextProvider>
                </QuizProvider>
            </AuthProvider>
            <ToastContainer position='top-right' autoClose={2000}/>
        </SupabaseProvider>
        </body>
        </html>
    );
}
