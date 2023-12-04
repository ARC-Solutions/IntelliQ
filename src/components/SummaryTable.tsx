import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { HistoryQuestions } from '@/contexts/QuizContext';
import { ScrollArea } from './ui/scroll-area';
type Props = {
  summaryQuiz: HistoryQuestions[];
};

const SummaryTable = ({ summaryQuiz }: Props) => {
  return (
    //overfow-x-auto ensures smooth scrolling for mobile users

    <Table className='overflow-x-auto mt-14'>
      <TableCaption className='text-base'>Summary of your recent quiz</TableCaption>
      <TableHeader>
        <TableRow className='hover:bg-transparent'>
          {/* Number gets hidden when the screen width is below 640px*/}
          <TableHead className='w-1/12 text-white text-lg hidden sm:table-cell'>No.</TableHead>
          <TableHead className='w-1/2 text-white text-lg'>Question & Correct Answer</TableHead>
          <TableHead className='w-1/2 text-white text-lg'>Your Answer</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {summaryQuiz.map((quiz, i) => {
          return (
            <TableRow
              key={i}
              // hover:bg-[#47455b]
              className={`hover:bg-[#403f50] ${i % 2 !== 0 ? 'bg-primary/20' : ''}`}
            >
              <TableCell className='font-medium text-xl hidden sm:table-cell'>{i + 1}</TableCell>
              <TableCell>
                <h2 className='font-base text-lg'>{quiz.text}</h2>
                <p className='opacity-60 text-lg group-hover:opacity-80'>{quiz.correctAnswer}</p>
              </TableCell>
              <TableCell className='text-lg'>
                <h2
                  className={`${
                    quiz.userAnswer === quiz.correctAnswer ? 'text-green-500' : 'text-red-500'
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
