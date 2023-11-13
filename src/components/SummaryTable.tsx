import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HistoryQuestions } from "@/contexts/QuizContext";
import { ScrollArea } from "./ui/scroll-area";
type Props = {
  summaryQuiz: HistoryQuestions[];
};

const SummaryTable = ({ summaryQuiz }: Props) => {
  return (
    <Table>
      <TableCaption>Summary of you recent quiz</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12">No.</TableHead>
          <TableHead className="w-1/2">Question & Correct Answer</TableHead>
          <TableHead className="w-1/2">Your Answer</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {summaryQuiz.map((quiz, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>
                <h2>{quiz.text}</h2>
                <p>{quiz.correctAnswer}</p>
              </TableCell>
              <TableCell>
                <h2
                  className={`${
                    quiz.userAnswer === quiz.correctAnswer
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {quiz.userAnswer}
                </h2>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SummaryTable;
