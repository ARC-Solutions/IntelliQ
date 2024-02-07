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
import { HistoryQuestions } from '@/contexts/quiz-context';

type Props = {
    summaryQuiz: HistoryQuestions[];
};

const SummaryTable = ({ summaryQuiz }: Props) => {
    return (
        //overfow-x-auto ensures smooth scrolling for mobile users

        <Table className='mt-14 overflow-x-auto'>
            <TableCaption className='text-base'>Summary of your recent quiz</TableCaption>
            <TableHeader>
                <TableRow className='hover:bg-transparent'>
                    {/* Number gets hidden when the screen width is below 640px*/}
                    <TableHead className='hidden w-1/12 text-lg text-white sm:table-cell'>
                        No.
                    </TableHead>
                    <TableHead className='w-1/2 text-lg text-white'>
                        Question & Correct Answer
                    </TableHead>
                    <TableHead className='w-1/2 text-lg text-white'>Your Answer</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {summaryQuiz.map((quiz, i) => {
                    return (
                        <TableRow
                            key={i}
                            // hover:bg-[#47455b]
                            className={`hover:bg-[#403f50]`}
                        >
                            <TableCell className='hidden text-xl font-medium sm:table-cell'>
                                {i + 1}
                            </TableCell>
                            <TableCell>
                                <h2 className='font-base text-lg'>{quiz.text}</h2>
                                <p className='text-lg opacity-60 group-hover:opacity-80'>
                                    {quiz.correctAnswer}
                                </p>
                            </TableCell>
                            <TableCell className='text-lg'>
                                <h2
                                    className={`${
                                        quiz.userAnswer === quiz.correctAnswer
                                            ? 'text-green-500'
                                            : 'text-red-500'
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
