import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import {LuBrain, LuPuzzle} from "react-icons/lu";

export default async function Home() {
    const supabase = createServerComponentClient({
        cookies,
    });
    const session = (await supabase.auth.getSession()).data.session;
    if (session) {
        redirect('/dashboard');
    }
    const currentYear = new Date().getFullYear();
    return (<div className="min-h-screen bg-transparent">
        <main className="flex flex-col items-center justify-center px-8 py-16 space-y-8">
            <h2 className="text-5xl font-bold text-center">Welcome to <span
                className='text-primary'> IntelliQ</span></h2>
            <p className="text-xl text-center max-w-lg">
                We create quizzes based on your interests.
            </p>
            <Link href='/signup'>
                <Button className="bg-[#c8b6ff] text-[#040404] px-8 py-2 rounded">Get Started</Button>
            </Link>
        </main>
        <section className="flex flex-col items-center justify-center px-8 py-16 space-y-8 bg-transparent"
                 id="features">
            <h2 className="text-4xl font-bold text-center">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card
                    className='h-full w-full bg-purple-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-none'>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <LuBrain className="h-12 w-12"/>
                        <h3 className="text-2xl font-bold">AI Powered</h3>
                        <p className="text-center">
                            AI technology ensures that you get the most relevant quizzes based on your
                            interests.
                        </p>
                    </CardContent>
                </Card>
                <Card
                    className='h-full w-full bg-purple-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-none'>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <LuPuzzle className="h-12 w-12"/>
                        <h3 className="text-2xl font-bold">Custom Quizzes</h3>
                        <p className="text-center">Create your own quizzes and share them with your friends.</p>
                    </CardContent>
                </Card>
            </div>
        </section>
        <section className="flex flex-col items-center justify-center px-8 py-16 space-y-8 bg-transparent"
                 id="about">
            <h2 className="text-4xl font-bold text-center">About Us</h2>
            <p className="text-lg text-center max-w-lg">
                We are ARC-Solutions, a team of AI enthusiasts who believe in the power of personalized learning.
            </p>
        </section>
        <section className="flex flex-col items-center justify-center px-8 py-16 space-y-8 bg-transparent"
                 id="contact">
            <h2 className="text-4xl font-bold text-center">Contact Us</h2>
            <p className="text-lg text-center max-w-lg">Have any questions or feedback? We'd love to hear from
                you.</p>
            <Link
                href='mailto:contact@arc-solutions.xyz'>
                <Button className="bg-[#c8b6ff] text-[#040404] px-8 py-2 rounded">Contact Us</Button>
            </Link>
        </section>
        <footer className="flex items-center justify-center px-8 py-4 bg-transparent text-gray-600">
            <p className="text-sm">© {currentYear} ARC-Solutions. All rights reserved.</p>
        </footer>
    </div>)
}