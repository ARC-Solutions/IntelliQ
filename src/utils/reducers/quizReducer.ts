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
      ...state,
      isLoading: false,
      fetchingFinished: false,
      currentQuiz: null,
    };
  } else if (action.type === "RESET_ALL") {
    return {
      isLoading: false,
      fetchingFinished: false,
      currentQuiz: null,
      summaryQuiz: null,
    };
  } else if (action.type === "SUBMIT_QUIZ_SUCESS") {
    return {
      ...state,
      summaryQuiz: action.payload,
    };
  } else {
    return state;
  }
};
