"use client";
import { useQuizLogic } from "@/contexts/QuizLogicContext";
import { Button } from "./ui/button";

type Props = {
  answer: string;
  letter: string;
};

const Answer = ({ answer, letter }: Props) => {
  const { dispatch } = useQuizLogic();
  return (
    <Button
      onClick={() => dispatch({ type: "SET_SELECTED_ANSWER", payload: answer })}
      className="w-[500px]"
    >
      <span id="letter">{letter}</span>
      <span id="answer" className="capitalize">
        {answer}
      </span>
    </Button>
  );
};

export default Answer;
