import {Skeleton} from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <Skeleton className='flex h-9 w-96 mb-5 rounded-full'/>
            <Skeleton className='flex h-9 w-72 m-2 mb-5 rounded-full'/>
            <div className='flex items-center justify-center m-2'>
                <div className='relative w-80 sm:w-[450px]'>
                    <Skeleton className='h-9 mb-1.5'></Skeleton>
                    <Skeleton className='h-[540px]'></Skeleton>
                </div>
            </div>
        </div>
    );
};

export default loading;