import React from "react";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const QuizMe = () => {
  return (
    <Link href={'/quiz'}>
      <Card className='w-[96]'>
        <CardHeader>
          <CardTitle className='text-xl sm:text-2xl'>
              Quiz Me!
              <BsFillQuestionDiamondFill />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Challenge yourself to a quiz with a topic of your choice.
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default QuizMe;
