"use client";
import React, { useEffect } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { redirect } from "next/navigation";
import { BsFillMortarboardFill } from "react-icons/bs";
import { BiSolidDashboard, BiSolidTimer } from "react-icons/bi";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader } from "./ui/card";
import SummaryTable from "./SummaryTable";
import { formatTime } from "@/utils/formatTime";

const SummaryPage = ({ quizID }: { quizID: string }) => {
  const { summaryQuiz, dispatch } = useQuiz();
  if (!summaryQuiz) {
    redirect("/");
  }

  useEffect(() => {
    dispatch({ type: "RESET_QUIZ" });
  }, []);

  const correctAnswersCount = summaryQuiz.rawQuestions.correctAnswersCount;
  const totalQuestions = summaryQuiz.rawQuestions.questions.length;
  const correctPercentage = (correctAnswersCount / totalQuestions) * 100;
  const timeTaken = summaryQuiz.rawQuestions.timeTaken;
  let descriptionText = "";

  if (correctPercentage >= 70) {
    descriptionText =
      "👏 Excellent work! Your understanding of the topic is impressive. Keep it up! 👏";
  } else if (correctPercentage > 50) {
    descriptionText = "👍 Great job! Keep up the good work. 👍";
  } else {
    descriptionText = "😊 Nice try! Keep practicing to improve your score. 😊";
  }

  // Messages based on time taken
  let timeMessage = "";

  if (timeTaken < 60) {
    // Less than 1 minute
    timeMessage = "⏱️ Wow, you finished so quickly! Impressive speed! ⚡";
  } else if (timeTaken < 180) {
    // 1 to 3 minutes
    timeMessage = "⏱️ Good job! You completed the quiz at a steady pace. 🚀";
  } else {
    // More than 3 minutes
    timeMessage =
      "⏱️ Well done! You're as thoughtful as a wise tortoise in approaching each question. 🐢";
  }
  return (
    <div>
      <header className="flex">
        <h1>Summary</h1>
        <Link href={"/"}>
          <Button>
            <BiSolidDashboard />
            <span>Back to Dashboard</span>
          </Button>
        </Link>
      </header>

      {/* Metrics */}
      <div className="flex">
        {/* Score section */}
        <Card id="score" className="w-72">
          <CardHeader className="flex flex-row">
            <BsFillMortarboardFill />
            <span>Score: </span>
            <span className="text-primary">
              {summaryQuiz.rawQuestions.correctAnswersCount}
            </span>
          </CardHeader>
          <CardDescription>{descriptionText}</CardDescription>
        </Card>

        {/* time section */}
        <Card id="time" className="w-72">
          <CardHeader className="flex flex-row">
            <span className="text-primary">{formatTime(timeTaken)}</span>
            <BiSolidTimer />
          </CardHeader>
          <CardDescription>{timeMessage}</CardDescription>
        </Card>
      </div>
      <SummaryTable summaryQuiz={summaryQuiz.rawQuestions.questions} />
    </div>
  );
};

export default SummaryPage;
