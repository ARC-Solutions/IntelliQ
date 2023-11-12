"use client";

import { createContext, useContext, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { quizReducer } from "@/utils/reducers/quizReducer";
import { UserAnswer } from "./QuizLogicContext";
type Props = {
  children: React.ReactNode;
};
export interface Quiz {
  correctAnswer: string;
  options: string[];
  text: string;
  questionTitle: string;
}
interface HistoryQuestions {
  correctAnswer: string;
  text: string;
  userAnswer: string;
}
interface CurrentQuiz {
  quiz: Quiz[];
  topic: string;
}
interface QuizHistory {
  quiz_id: string;
  rawQuestions: {
    timeTaken: number;
    quiz_title: string;
    correctAnswersCount: number;
    questions: HistoryQuestions[];
  };
}
export interface QuizContextValue {
  isLoading: boolean;
  submitting: boolean;
  fetchingFinished: boolean;
  currentQuiz: CurrentQuiz | null;
  summaryQuiz: QuizHistory | null;
}
export type QuizAction =
  | { type: "FETCH_QUIZ_REQUEST" }
  | { type: "FETCH_QUIZ_ERROR" }
  | { type: "RESET_QUIZ" }
  | { type: "RESET_ALL" }
  | { type: "FETCH_QUIZ_SUCCESS"; payload: CurrentQuiz }
  | { type: "SUBMIT_QUIZ_SUCESS"; payload: QuizHistory }
  | { type: "SUBMIT_QUIZ_REQUEST" };

export interface QuizContextValues extends QuizContextValue {
  dispatch: React.Dispatch<QuizAction>;
  fetchQuestions: (interests: string, numberOfQuestions: number) => void;
  submitQuiz: (userAnswer: UserAnswer[]) => void;
}
const initialState: QuizContextValue = {
  isLoading: false,
  fetchingFinished: false,
  submitting: false,
  currentQuiz: null,
  // currentQuiz: {
  //   topic: "C#",
  //   quiz: [
  //     {
  //       questionTitle: "NIce",
  //       correctAnswer: "c) string",
  //       options: ["a) int", "b) float", "c) string", "d) boolean"],
  //       text: "1. Which of the following is NOT a primitive data type in C#?",
  //     },
  //     {
  //       questionTitle: "NIce",
  //       correctAnswer: "a) class",
  //       options: ["a) class", "b) struct", "c) interface", "d) enum"],
  //       text: "2. Which keyword is used to define a class in C#?",
  //     },
  //     {
  //       questionTitle: "NIce",
  //       correctAnswer: "c) To import a namespace",
  //       options: [
  //         "a) To declare a new variable.",
  //         "b) To define a class",
  //         "c) To import a namespace",
  //         "d) To create a loop",
  //       ],
  //       text: "3. What is the purpose of the using directive in C#?",
  //     },
  //   ],
  // },
  summaryQuiz: null,
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
  const submitQuiz = async (userAnswer: UserAnswer[]) => {
    //   try {
    //     const {
    //       data: { session },
    //     } = await supabase.auth.getSession();
    //     const accessToken = session?.access_token;
    //     const quizTitle = state.currentQuiz?.topic;
    //     const questions = userAnswer.map((ans, i) => {
    //       const { correctAnswer, question, userAnswer } = ans;
    //       const options = state.currentQuiz?.quiz[i].options.map((opt) =>
    //         opt.slice(3)
    //       );
    //       return { text: question, correctAnswer, userAnswer, options };
    //     });
    //     const rawQuestions = {
    //       quizTitle,
    //       questions,
    //       timeTaken: 180,
    //     };
    //     dispatch({ type: "SUBMIT_QUIZ_REQUEST" });
    //     const response = await fetch(
    //       "https://intelliq-be.azurewebsites.net/api/submit-quiz",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //         body: JSON.stringify({ rawQuestions }),
    //       }
    //     );
    //     const data = await response.json();
    //     dispatch({ type: "SUBMIT_QUIZ_SUCESS", payload: data });
    //     console.log(data);
    //   } catch (error: any) {
    //     toast(error.message);
    //     console.log(error);
    //   }
  };
  return (
    <QuizContext.Provider
      value={{ ...state, dispatch, fetchQuestions, submitQuiz }}
    >
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
