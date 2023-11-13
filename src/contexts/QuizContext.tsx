"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
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
export interface HistoryQuestions {
  correctAnswer: string;
  text: string;
  userAnswer: string;
}
interface CurrentQuiz {
  quiz: Quiz[];
  topic: string;
}
export interface QuizHistory {
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
  fetchingFinished: boolean;
  currentQuiz: CurrentQuiz | null;
  summaryQuiz: QuizHistory | null;
}
export type QuizAction =
  | { type: "FETCH_QUIZ_REQUEST" }
  | { type: "FETCH_QUIZ_ERROR" }
  | { type: "RESET_QUIZ" }
  | { type: "RESET_ALL" }
  | { type: "RESET_SUMMARY_QUIZ" }
  | { type: "FETCH_QUIZ_SUCCESS"; payload: CurrentQuiz }
  | { type: "SUBMIT_QUIZ_SUCESS"; payload: QuizHistory };

export interface QuizContextValues extends QuizContextValue {
  dispatch: React.Dispatch<QuizAction>;
  fetchQuestions: (interests: string, numberOfQuestions: number) => void;
  submitQuiz: (userAnswer: UserAnswer[], timeTaken: number) => void;
}
const initialState: QuizContextValue = {
  isLoading: false,
  fetchingFinished: false,
  currentQuiz: null,
  // currentQuiz: {
  //   topic: "C#",
  //   quiz: [
  //     {
  //       questionTitle: "NIce",
  //       correctAnswer: "c) string",
  //       options: ["a) int", "b) float", "c) string", "d) boolean"],
  //       text: "Which of the following is NOT a primitive data type in C#?",
  //     },
  //     {
  //       questionTitle: "NIce",
  //       correctAnswer: "a) class",
  //       options: ["a) class", "b) struct", "c) interface", "d) enum"],
  //       text: "Which keyword is used to define a class in C#?",
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
  //       text: "What is the purpose of the using directive in C#?",
  //     },
  //   ],
  // },
  // summaryQuiz: {
  //   quiz_id: "blabla",
  //   rawQuestions: {
  //     correctAnswersCount: 2,
  //     questions: [
  //       {
  //         text: "Which of the following is NOT a primitive data type in C#?",
  //         correctAnswer: "string",
  //         userAnswer: "string",
  //       },
  //       {
  //         text: "Which keyword is used to define a class in C#?",
  //         correctAnswer: "class",
  //         userAnswer: "class",
  //       },
  //       {
  //         text: "What is the purpose of the using directive in C#?",
  //         correctAnswer: "To import a namespace",
  //         userAnswer: "To declare a function",
  //       },
  //     ],
  //     quiz_title: "C#",
  //     timeTaken: 132,
  //   },
  // },
  summaryQuiz: null,
};

const QuizContext = createContext<QuizContextValues | null>(null);

export const QuizProvider = React.memo(({ children }: Props) => {
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
      const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz`;
      dispatch({ type: "FETCH_QUIZ_REQUEST" });
      const url = `${URL}?numberOfQuestions=${numberOfQuestions}&interests=${interests}`;
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
  const submitQuiz = async (userAnswer: UserAnswer[], timeTaken: number) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken = session?.access_token;

      const quizTitle = state.currentQuiz?.topic;
      const questions = userAnswer.map((ans, i) => {
        const { correctAnswer, question, userAnswer } = ans;
        const options = state.currentQuiz?.quiz[i].options.map((opt) =>
          opt.slice(3)
        );
        return { text: question, correctAnswer, userAnswer, options };
      });

      const rawQuestions = {
        quizTitle,
        questions,
        timeTaken,
      };
      const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/submit-quiz`;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ rawQuestions }),
      });
      const data = await response.json();
      dispatch({ type: "SUBMIT_QUIZ_SUCESS", payload: data });
    } catch (error: any) {
      toast(error.message);
      console.log(error);
    }
  };
  return (
    <QuizContext.Provider
      value={{ ...state, dispatch, fetchQuestions, submitQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
});
QuizProvider.displayName = "QuizProvider";

export const useQuiz = (): QuizContextValues => {
  const quizContext = useContext(QuizContext);
  if (quizContext === undefined) {
    throw new Error("useQuiz must be used within an QuizProvider");
  }
  return quizContext as QuizContextValues;
};
