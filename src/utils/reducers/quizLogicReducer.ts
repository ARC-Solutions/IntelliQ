import { useToast } from "@/components/ui/use-toast";
import { QuizLogicValues, Action } from "@/contexts/QuizLogicContext";
import { showToast } from "../showToast";

export const quizLogicReducer = (state: QuizLogicValues, action: Action) => {
  if (action.type === "QUIZ_FINISHED") {
    return { ...state, quizFinished: true };
  } else if (action.type === "SET_SELECTED_ANSWER") {
    return { ...state, selectedAnswer: action.payload };
  } else if (action.type === "VALIDATE_ANSWER") {
    if (state.selectedAnswer === action.payload) {
      showToast(
        "success",
        "CORRECT!",
        "You've answered the question correctly"
      );
      return { ...state, correctAnswer: state.correctAnswer + 1 };
    } else {
      showToast(
        "destructive",
        "INCORRECT!",
        "Oops, that's not the correct answer. Keep trying!"
      );
      return { ...state, wrongAnswer: state.wrongAnswer + 1 };
    }
  } else {
    return state;
  }
};
