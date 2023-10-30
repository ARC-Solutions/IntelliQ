import { QuizLogicValues, Action } from "@/contexts/QuizLogicContext";

export const quizLogicReducer = (state: QuizLogicValues, action: Action) => {
  if (action.type === "QUIZ_FINISHED") {
    return { ...state, quizFinished: true };
  }
  else{
    return state;
  }
};
