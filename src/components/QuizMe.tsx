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
    <Link href={"/quiz"}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            Quiz Me!
            <BsFillQuestionDiamondFill />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Challenge yourself to a quiz with a topic of your choice
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default QuizMe;
