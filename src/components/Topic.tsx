"use client";
import { useQuiz } from "@/contexts/QuizContext";
import { RecommendedTopic } from "./Topics";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";
const Topic = ({ name, icon }: RecommendedTopic) => {
  const { fetchQuestions } = useQuiz();
  return (
    <Card
      onClick={() => {
        fetchQuestions(name, 4);
        redirect('/quiz');
      }}
      className='w-[150px] cursor-pointer'
    >
      <CardContent>
        <h2>{name}</h2>
        {icon}
      </CardContent>
    </Card>
  );
};

export default Topic;
