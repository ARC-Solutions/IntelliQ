"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { QuizHistories, useQuiz } from "@/contexts/QuizContext";
import { FaBookOpen } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import { redirect } from "next/navigation";

type Props = {
  quiz: QuizHistories;
};

const SingleQuiz = ({ quiz }: Props) => {
  const { fetchSingleQuiz } = useQuiz();
  return (
    <Card className="cursor-pointer"
      onClick={() => {
        fetchSingleQuiz(quiz.id);
        
      }}
    >
      <CardContent>
        <div>
          <FaBookOpen />
          <h3>{quiz.quiz_title}</h3>
        </div>
        <Button>
          <MdAccessTimeFilled />
          {quiz.created_at}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SingleQuiz;
