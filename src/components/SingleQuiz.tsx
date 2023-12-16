"use client";
import React from "react";
import {Card, CardContent, CardTitle} from "./ui/card";
import {Button} from "./ui/button";
import {QuizHistories, useQuiz} from "@/contexts/QuizContext";
import {FaBookOpen} from "react-icons/fa6";
import {MdAccessTimeFilled} from "react-icons/md";

type Props = {
    quiz: QuizHistories;
};

const SingleQuiz = ({quiz}: Props) => {
    const {fetchSingleQuiz} = useQuiz();
    return (
        <Card className="flex flex-row items-center gap-6 p-4 cursor-pointer" onClick={() => {
            fetchSingleQuiz(quiz.id)
        }}>
            <FaBookOpen className="w-4 h-4"/>
            <CardTitle className="flex-grow">{quiz.quiz_title}</CardTitle>
            <Button>
                <MdAccessTimeFilled/>
                {quiz.created_at}
            </Button>
        </Card>
    );
};

export default SingleQuiz;
