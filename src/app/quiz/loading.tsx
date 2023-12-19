import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
  return (
      <div className='flex flex-col items-center justify-center'>
        <Skeleton className='flex h-9 w-48 mb-5 rounded-full'/>
        <div className='flex justify-between items-center mb-4'>
          <Skeleton className="flex h-[36px] w-[130px] rounded-md"/>
          <Skeleton className="flex h-[42px] w-[150px] rounded-md"/>
        </div>
        <div>
            <Skeleton className="h-[24px] w-[300px] mb-20 rounded-md"/>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <Skeleton className="h-[80px] w-[720px] rounded-lg mb-10"/>
          <div className='w-auto'>
            <Skeleton className="h-[58px] w-[720px] rounded-lg mb-5"/>
            <Skeleton className="h-[58px] w-[720px] rounded-lg mb-5"/>
            <Skeleton className="h-[58px] w-[720px] rounded-lg mb-5"/>
            <Skeleton className="h-[58px] w-[720px] rounded-lg mb-5"/>
          </div>
          <Skeleton className="h-[36px] w-[100px] rounded-lg"/>
        </div>
      </div>
  );
}

export default loading