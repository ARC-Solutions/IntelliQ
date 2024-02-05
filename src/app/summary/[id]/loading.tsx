import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const loading = () => {
    return (
        <div className='mx-auto flex w-full flex-col items-center justify-center px-6 py-4 text-white sm:w-10/12'>
            <div className='mb-14 flex w-full flex-row items-center justify-between'>
                <Skeleton className='h-[48px] w-[225px] rounded-lg' />
                <Skeleton className='h-[36px] w-[190px] rounded-lg' />
            </div>
            <div className='flex w-full flex-wrap justify-between gap-4 pb-14'>
                <Skeleton className='h-[200px] rounded-lg sm:h-[180px] sm:w-[570px] md:w-5/12' />
                <Skeleton className='h-[200px] rounded-lg sm:h-[180px] sm:w-[570px] md:w-5/12' />
            </div>
            <div className='relative w-full overflow-auto'>
                <Table className='mt-14 w-full caption-bottom overflow-x-auto text-sm'>
                    <TableHeader>
                        <TableRow>
                            {Array.from({ length: 3 }, (_, index) => (
                                <TableHead key={index}>
                                    <Skeleton className='h-8 w-[100px]' />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 4 }, (_, index) => (
                            <TableRow key={index}>
                                {Array.from({ length: 3 }, (_, index) => (
                                    <TableCell key={index}>
                                        <Skeleton className='h-8 w-full' />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default loading;
