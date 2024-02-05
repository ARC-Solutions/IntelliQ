import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <Skeleton className='mb-5 flex h-9 w-96 rounded-full' />
            <Skeleton className='m-2 mb-5 flex h-9 w-72 rounded-full' />
            <div className='m-2 flex items-center justify-center'>
                <div className='relative w-80 sm:w-[450px]'>
                    <Skeleton className='mb-1.5 h-9'></Skeleton>
                    <Skeleton className='h-[540px]'></Skeleton>
                </div>
            </div>
        </div>
    );
};

export default loading;
