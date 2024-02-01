import Link from "next/link";
import {Button} from "@/components/ui/button";

const Main = () => {
    return (
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
    );
};

export default Main;