"use client";
import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import { Button } from "./ui/button";
import { QuizHistories, useQuiz } from "@/contexts/QuizContext";
import { FaBookOpen } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import { redirect } from "next/navigation";
import { FiDelete } from "react-icons/fi";
import {CalendarIcon} from "@radix-ui/react-icons";

type Props = {
  quiz: QuizHistories;
};

const SingleQuiz = ({ quiz }: Props) => {
  const { fetchSingleQuiz } = useQuiz();
  return (
      <Card className="text-white rounded-lg p-4">
        <CardHeader className='cursor-pointer' onClick={()=> {fetchSingleQuiz(quiz.id)}}>
          <CardTitle>{quiz.quiz_title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="text-purple-600" />
            <span>{quiz.created_at}</span>
          </div>
          <Button className="text-red-500 bg-[#fefefe] hover:bg-red-500 hover:text-white" variant="destructive">
              <FiDelete className="w-4 h-4 mr-2"/> Delete
          </Button>
        </CardContent>
      </Card>
  );
};

export default SingleQuiz;
