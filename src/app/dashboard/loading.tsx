import {Skeleton} from "@/components/ui/skeleton";

const loading = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <Skeleton className='flex h-9 w-48 mb-5 rounded-full'/>
            <div className='lg:grid lg:grid-flow-col gap-8 mt-12 m-2'>
                <div className='col-span-1 m-4 lg:m-0'>
                    <Skeleton className='w-full h-[150px] rounded-lg'/>
                </div>
                <div className='row-span-2 mt-10 col-span-1 m-4 lg:m-0'>
                    <Skeleton className='lg:w-[410px] w-full h-[370px] rounded-lg'/>
                </div>
                <div className='row-span-3 mt-10 lg:mt-0 m-4 lg:m-0'>
                    <Skeleton className='w-[546px] h-[554px] rounded-lg'/>
                </div>
            </div>
        </div>
    );
};

export default loading;
