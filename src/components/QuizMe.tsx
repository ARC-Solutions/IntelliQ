import React from "react";
import {BsFillQuestionDiamondFill} from "react-icons/bs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {FaArrowRight} from "react-icons/fa6";

const QuizMe = () => {
    return (

        <Card className='w-full shadow-lg'>
            <CardHeader className='pb-0'>
                <div className='flex items-center space-x-2'>
                    <BsFillQuestionDiamondFill className='w-6 h-6'/>
                    <CardTitle className='text-[1.5rem]'>Quiz Me!</CardTitle>
                </div>
                <CardDescription>
                    Challenge yourself to a quiz with a topic of your choice.
                </CardDescription>
            </CardHeader>

            <CardContent className='p-4'>
                <Link href={'/quiz'}>
                    <div className="flex justify-center items-center">
                        <Button className="w-full text-sm bg-[#c8b6ff]" variant="outline">
                            <div className="flex items-center justify-center">
                                <p>Discover Your AI Quiz</p>
                                <FaArrowRight className="w-4 h-4 ml-2"/>
                            </div>
                        </Button>

                    </div>
                </Link>
            </CardContent>

        </Card>

    );
};

export default QuizMe;
