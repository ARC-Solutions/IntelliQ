"use client";
import React from "react";
import { BiSolidBrain } from "react-icons/bi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadMore from "./load-more";
import { useQuiz } from "@/contexts/QuizContext";
import SingleQuiz from "./SingleQuiz";
import { ScrollArea } from "./ui/scroll-area";
const QuizHistory = ({ totalQuiz }: { totalQuiz: number }) => {
  const { quizzes } = useQuiz();

  return (
    <Card className="w-[350px] ">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          History
          <BiSolidBrain />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          You have played a total of {totalQuiz} quizzes
        </CardDescription>
        <ScrollArea className="h-72">
          <div className="p-4">
            {quizzes?.map((quiz) => {
              return <SingleQuiz quiz={quiz} key={quiz.id} />;
            })}
            <LoadMore />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default QuizHistory;
