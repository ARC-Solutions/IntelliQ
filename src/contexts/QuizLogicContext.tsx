"use client";
import { createContext, useContext, useState, useReducer } from "react";
import { quizLogicReducer } from "@/utils/reducers/quizLogicReducer";

export interface QuizLogicValues {
  quizFinished: boolean;
  selectedAnswer: string | null;
}
export interface ContextValue extends QuizLogicValues {
  questionNumber: number;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
  dispatch: React.Dispatch<Action>;
}
export type Action =
  | { type: "QUIZ_FINISHED" }
  | { type: "SET_SELECTED_ANSWER"; payload: string | null };

const initialState: QuizLogicValues = {
  quizFinished: false,
  selectedAnswer: null,
};
const Context = createContext<ContextValue | null>(null);
const QuizLogicContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [state, dispatch] = useReducer(quizLogicReducer, initialState);
  return (
    <Context.Provider
      value={{ ...state, questionNumber, setQuestionNumber, dispatch }}
    >
      {children}
    </Context.Provider>
  );
};

export const useQuizLogic = (): ContextValue => {
  const quizLogicContext = useContext(Context);
  if (quizLogicContext === undefined) {
    throw new Error(
      "useQuizLogic must be used within an QuizLogicContextProvider"
    );
  }
  return quizLogicContext as ContextValue;
};

export default QuizLogicContextProvider;
