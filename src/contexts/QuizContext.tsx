"use client";

import { createContext, useContext, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { quizReducer } from "@/utils/reducers/quizReducer";
type Props = {
  children: React.ReactNode;
};
export interface Quiz {
  correctAnswer: string;
  options: string[];
  text: string;
  questionTitle: string;
}
interface CurrentQuiz {
  quiz: Quiz[];
  topic: string;
}
interface QuizHistory {}
export interface QuizContextValue {
  isLoading: boolean;
  fetchingFinished: boolean;
  currentQuiz: CurrentQuiz | null;
  quizHistory: QuizHistory[] | null;
}
export type QuizAction =
  | { type: "FETCH_QUIZ_REQUEST" }
  | { type: "FETCH_QUIZ_ERROR" }
  | { type: "RESET_QUIZ" }
  | { type: "FETCH_QUIZ_SUCCESS"; payload: CurrentQuiz };

export interface QuizContextValues extends QuizContextValue {
  dispatch: React.Dispatch<QuizAction>;
  fetchQuestions: (interests: string, numberOfQuestions: number) => void;
}
const initialState: QuizContextValue = {
  isLoading: false,
  fetchingFinished: false,
  // currentQuiz: null,
  currentQuiz: {
    topic: "C#",
    quiz: [
      {
        questionTitle: "NIce",
        correctAnswer: "c) string",
        options: ["a) int", "b) float", "c) string", "d) boolean"],
        text: "1. Which of the following is NOT a primitive data type in C#?",
      },
      {
        questionTitle: "NIce",
        correctAnswer: "a) class",
        options: ["a) class", "b) struct", "c) interface", "d) enum"],
        text: "2. Which keyword is used to define a class in C#?",
      },
      {
        questionTitle: "NIce",
        correctAnswer: "c) To import a namespace",
        options: [
          "a) To declare a new variable.",
          "b) To define a class",
          "c) To import a namespace",
          "d) To create a loop",
        ],
        text: "3. What is the purpose of the using directive in C#?",
      },
    ],
  },
  quizHistory: null,
};

const QuizContext = createContext<QuizContextValues | null>(null);

export const QuizProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const supabase = createClientComponentClient();
  const fetchQuestions = async (
    interests: string,
    numberOfQuestions: number
  ) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      dispatch({ type: "FETCH_QUIZ_REQUEST" });
      const url = `https://intelliq-be.azurewebsites.net/api/quiz?numberOfQuestions=${numberOfQuestions}&interests=${interests}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      const { quizTitle: topic, questions } = data.rawQuestions[0];

      const quiz: CurrentQuiz = {
        quiz: questions,
        topic,
      };
      dispatch({ type: "FETCH_QUIZ_SUCCESS", payload: quiz });
    } catch (error: any) {
      dispatch({ type: "FETCH_QUIZ_ERROR" });
      toast.error(error);
    }
  };

  return (
    <QuizContext.Provider value={{ ...state, dispatch, fetchQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextValues => {
  const quizContext = useContext(QuizContext);
  if (quizContext === undefined) {
    throw new Error("useQuiz must be used within an QuizProvider");
  }
  return quizContext as QuizContextValues;
};
