"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuiz } from "@/contexts/QuizContext";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import LoadingQuestions from "./LoadingQuestions";

const CreateQuiz = () => {
  const interestsRef = useRef<HTMLInputElement>(null);
  const numberOfQuestionsRef = useRef<HTMLInputElement>(null);
  const {
    fetchQuestions,
    currentQuiz,
    isLoading,
    fetchingFinished: finished,
  } = useQuiz();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const interests = interestsRef.current?.value as string;
    const numberOfQuestions = numberOfQuestionsRef.current?.value as string;
    if (!interests || !numberOfQuestions) {
      toast.error("Please fill out all the fields");
      return;
    }
    fetchQuestions(interests, Number(numberOfQuestions));
  };

  useEffect(() => {
    if (currentQuiz) {
      const url = `/quiz/play`;
      redirect(url);
    }
  }, [currentQuiz]);

  if (isLoading) {
    return <LoadingQuestions finished={finished} />;
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Create a Quiz</CardTitle>
        <CardDescription>Are you ready to be challenged?</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div>
            <div>
              <Label htmlFor="topic">Topic</Label>
              <Input
                type="text"
                id="topic"
                placeholder="Enter a Topic"
                ref={interestsRef}
              />
              <CardDescription>
                Provide a topic you&apos;d like to have a quiz about
              </CardDescription>
            </div>
            <div>
              <Label htmlFor="number">Number of Questions</Label>
              <Input
                id="number"
                type="number"
                min={1}
                max={10}
                placeholder="How many Questions?"
                ref={numberOfQuestionsRef}
              />
              <CardDescription>
                Choose the number of quiz questions you want
              </CardDescription>
            </div>
            <Button onClick={handleSubmit}>Create</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CreateQuiz;
