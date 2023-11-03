import { QuizLogicValues, Action } from "@/contexts/QuizLogicContext";
import { showToast } from "../showToast";

export const quizLogicReducer = (state: QuizLogicValues, action: Action) => {
  if (action.type === "QUIZ_FINISHED") {
    return { ...state, quizFinished: true };
  } else if (action.type === "SET_SELECTED_ANSWER") {
    return { ...state, selectedAnswer: action.payload };
  } else if (action.type === "VALIDATE_ANSWER") {
    const { correctAnswer, userAnswer, question } = action.payload;
    let scoreCORRECT = state.correctAnswer;
    let scoreINCORRECT = state.wrongAnswer;
    if (userAnswer === correctAnswer) {
      scoreCORRECT += 1;
    } else {
      scoreINCORRECT += 1;
    }
    return {
      ...state,
      correctAnswer: scoreCORRECT,
      wrongAnswer: scoreINCORRECT,
      userAnswer: [
        ...state.userAnswer,
        {
          question,
          correctAnswer,
          userAnswer,
        },
      ],
    };
  } else {
    return state;
  }
};
