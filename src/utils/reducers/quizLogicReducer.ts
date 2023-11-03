import { QuizLogicValues, Action } from "@/contexts/QuizLogicContext";

export const quizLogicReducer = (state: QuizLogicValues, action: Action) => {
  if (action.type === "QUIZ_FINISHED") {
    return { ...state, quizFinished: true };
  }
  if (action.type === "SET_SELECTED_ANSWER") {
    return { ...state, selectedAnswer: action.payload };
  } else {
    return state;
  }
};
