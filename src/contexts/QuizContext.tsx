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
interface Quiz {
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
  currentQuiz: CurrentQuiz | null;
  quizHistory: QuizHistory[] | null;
}
type QuizAction =
  | { type: "FETCH_QUIZ_REQUEST" }
  | { type: "FETCH_QUIZ_SUCCESS"; payload: CurrentQuiz };

export interface QuizContextValues extends QuizContextValue {
  dispatch: React.Dispatch<QuizAction>;
  fetchQuestions: (interests: string, numberOfQuestions: string) => void;
}
const initialState: QuizContextValue = {
  isLoading: false,
  currentQuiz: null,
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
    return { ...state, isLoading: false, currentQuiz: action.payload };
  } else {
    return state;
  }
};
export const QuizProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const supabase = createClientComponentClient();
  const fetchQuestions = async (
    interests: string,
    numberOfQuestions: string
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
