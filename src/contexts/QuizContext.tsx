"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-toastify";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
type Props = {
  children: React.ReactNode;
};
export interface Quiz {
  correctAnswer: string;
  options: string[];
  text: string;
}
interface CurrentQuiz {
  id: number;
  quiz: Quiz[];
  topic: string;
  createdAt: string;
  length: number;
}
interface QuizHistory {}
interface QuizContextValue {
  isLoading: boolean;
  fetchingFinished: boolean;
  currentQuiz: CurrentQuiz | null;
  quizHistory: QuizHistory[] | null;
}
type QuizAction =
  | { type: "FETCH_QUIZ_REQUEST" }
  | { type: "FETCH_QUIZ_ERROR" }
  | { type: "FETCH_QUIZ_SUCCESS"; payload: CurrentQuiz };

export interface QuizContextValues extends QuizContextValue {
  dispatch: React.Dispatch<QuizAction>;
  fetchQuestions: (interests: string, numberOfQuestions: number) => void;
}
const initialState: QuizContextValue = {
  isLoading: false,
  fetchingFinished: false,
  currentQuiz: null,
  // currentQuiz: {
  //   createdAt: "2023-10-27T19:14:19.051Z",
  //   id: 17,
  //   length: 3,
  //   topic: "C#",
  //   quiz: [
  //     {
  //       correctAnswer: "c) string",
  //       options: ["a) int", "b) float", "c) string", "d) boolean"],
  //       text: "1. Which of the following is NOT a primitive data type in C#?",
  //     },
  //     {
  //       correctAnswer: "a) class",
  //       options: ["a) class", "b) struct", "c) interface", "d) enum"],
  //       text: "2. Which keyword is used to define a class in C#?",
  //     },
  //     {
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
  quizHistory: null,
};

const QuizContext = createContext<QuizContextValues | null>(null);
const quizReducer = (
  state: QuizContextValue,
  action: QuizAction
): QuizContextValue => {
  if (action.type === "FETCH_QUIZ_REQUEST") {
    return { ...state, isLoading: true };
  } else if (action.type === "FETCH_QUIZ_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      fetchingFinished: true,
      currentQuiz: action.payload,
    };
  } else if (action.type === "FETCH_QUIZ_ERROR") {
    return { ...state, isLoading: false };
  } else {
    return state;
  }
};
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
      const response = await fetch(
        "https://intelliq-be.azurewebsites.net/api/quiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ interests, numberOfQuestions }),
        }
      );

      const data = await response.json();
      const { id: quizID, createdAt, topic } = data.newQuiz;
      const { count: length } = data.insertedQuestions;
      const currentQuiz = data.rawQuestions;
      const quiz: CurrentQuiz = {
        id: quizID,
        quiz: currentQuiz,
        topic,
        createdAt,
        length,
      };
      dispatch({ type: "FETCH_QUIZ_SUCCESS", payload: quiz });
    } catch (error: any) {
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
