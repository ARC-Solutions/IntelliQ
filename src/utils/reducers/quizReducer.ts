import { QuizAction, QuizContextValue } from "@/contexts/QuizContext";

export const quizReducer = (
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
  } else if (action.type === "RESET_QUIZ") {
    return {
      isLoading: false,
      fetchingFinished: false,
      currentQuiz: null,
      quizHistory: null,
    };
  } else {
    return state;
  }
};
