import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
    return (
        <div className='mx-auto flex w-[400] flex-col items-center justify-center p-4 text-white sm:w-[800px] '>
            <Skeleton className='mb-5 flex h-9 w-48 rounded-full' />
            <div className='w-full rounded-lg p-6 text-center shadow-none'>
                <div className='mb-4 flex items-center justify-between'>
                    <Skeleton className='flex h-[36px] w-[130px] rounded-md' />
                    <Skeleton className='flex h-[42px] w-[150px] rounded-md' />
                </div>
                <Skeleton className='h-[80px] w-full items-center rounded-lg text-center' />
                <div className='mt-4 w-auto'>
                    <Skeleton className='mb-5 inline-flex h-[58px] w-[720px] items-center rounded-lg' />
                    {Array.from({ length: 3 }, (_, index) => (
                        <Skeleton className='mb-5 h-[58px] w-[720px] rounded-lg' key={index} />
                    ))}
                </div>
                <Skeleton className='h-[36px] w-[100px] rounded-lg' />
            </div>
        </div>
    );
};

export default loading;
