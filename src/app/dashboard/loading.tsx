import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <Skeleton className='mb-5 flex h-9 w-56 rounded-full' />
            <Skeleton className='mb-5 flex h-9 w-40 rounded-full' />
            <div className='m-2 mt-12 gap-8 lg:grid lg:grid-flow-col'>
                <div className='col-span-1 m-4 lg:m-0'>
                    <Skeleton className='h-[150px] w-full rounded-lg' />
                </div>
                <div className='col-span-1 row-span-2 m-4 mt-10 lg:m-0'>
                    <Skeleton className='h-[370px] w-full rounded-lg lg:w-[410px]' />
                </div>
                <div className='row-span-3 m-4 mt-10 lg:m-0 lg:mt-0'>
                    <Skeleton className='h-[554px] w-[546px] rounded-lg' />
                </div>
            </div>
        </div>
    );
};

export default loading;
