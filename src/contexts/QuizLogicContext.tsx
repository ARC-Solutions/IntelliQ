"use client";
import { createContext, useContext, useState } from "react";

interface ContextValue {
  questionNumber: number;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
}
const Context = createContext<ContextValue | null>(null);
const QuizLogicContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  return (
    <Context.Provider value={{ questionNumber, setQuestionNumber }}>
      {children}
    </Context.Provider>
  );
};

export const useQuizLogic = (): ContextValue => {
  const quizLogicContext = useContext(Context);
  if (quizLogicContext === undefined) {
    throw new Error("useQuizLogic must be used within an QuizLogicContextProvider");
  }
  return quizLogicContext as ContextValue;
};

export default QuizLogicContextProvider;
