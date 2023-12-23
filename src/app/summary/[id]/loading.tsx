import {Skeleton} from "@/components/ui/skeleton"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const loading = () => {
    return (
        <div className="w-full sm:w-10/12 mx-auto text-white flex flex-col items-center justify-center px-6 py-4">
            <div className='w-full flex flex-row justify-between items-center mb-14'>
                <Skeleton className="h-[48px] w-[225px] rounded-lg"/>
                <Skeleton className="h-[36px] w-[190px] rounded-lg"/>
            </div>
            <div className='w-full flex flex-wrap justify-between gap-4 pb-14'>
                <Skeleton className="h-[200px] md:w-5/12 rounded-lg sm:h-[180px] sm:w-[570px]"/>
                <Skeleton className="h-[200px] md:w-5/12 rounded-lg sm:h-[180px] sm:w-[570px]"/>
            </div>
            <div className='relative w-full overflow-auto'>
                <Table className="w-full caption-bottom text-sm overflow-x-auto mt-14">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Skeleton className="h-8 w-[100px]"/>
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-8 w-[100px]"/>
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-8 w-[100px]"/>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Skeleton className="h-8 w-full"/>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-8 w-full"/>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-8 w-full"/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Skeleton className="h-8 w-full"/>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-8 w-full"/>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-8 w-full"/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Skeleton className="h-8 w-full"/>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-8 w-full"/>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-8 w-full"/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Skeleton className="h-8 w-full"/>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-8 w-full"/>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-8 w-full"/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default loading;
