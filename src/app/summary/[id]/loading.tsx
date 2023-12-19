import { Skeleton } from "@/components/ui/skeleton"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const loading = () => {
  return (
      <div className="p-4">
        <div className="flex flex-col items-center justify-center">
          <div className='w-full flex flex-row justify-between items-center mb-14'>
            <Skeleton className="h-[48px] w-[225px] rounded-lg"/>
            <Skeleton className="h-[36px] w-[190px] rounded-lg"/>
          </div>
          <div className='w-full flex flex-wrap justify-between gap-4'>
            <Skeleton className="h-[200px] md:w-5/12 rounded-lg"/>
            <Skeleton className="h-[200px] md:w-5/12 rounded-lg"/>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-8 w-[100px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-8 w-[100px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-8 w-[100px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-8 w-[100px]" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
  );
};

export default loading;
