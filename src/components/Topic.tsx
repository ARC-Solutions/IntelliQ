"use client";
import {useQuiz} from "@/contexts/QuizContext";
import {RecommendedTopic} from "./Topics";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {redirect} from "next/navigation";
import {cloneElement} from "react";

const Topic = ({name, icon}: RecommendedTopic) => {
    const {fetchQuestions} = useQuiz();
    const sizeIcon = cloneElement(icon, {className: 'w-10 h-10'});
    return (
      <Card
        onClick={() => {
          fetchQuestions(name, 4);
          redirect('/quiz');
        }}
        className='w-full xl:w-[200px] cursor-pointer block'
      >
        <CardContent className='flex items-center space-x-2 p-6 h-auto'>
          {sizeIcon}

          <CardTitle className='text-[1rem]'>{name}</CardTitle>
        </CardContent>
      </Card>
    );
};

export default Topic;
