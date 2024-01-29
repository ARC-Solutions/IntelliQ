import {Skeleton} from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div className='w-[400] sm:w-[800px] mx-auto text-white flex flex-col items-center justify-center p-4 '>
            <Skeleton className='flex h-9 w-48 mb-5 rounded-full'/>
            <div className='w-full p-6 rounded-lg shadow-none text-center'>
                <div className='flex justify-between items-center mb-4'>
                    <Skeleton className="flex h-[36px] w-[130px] rounded-md"/>
                    <Skeleton className="flex h-[42px] w-[150px] rounded-md"/>
                </div>
                <Skeleton className="h-[80px] rounded-lg w-full text-center items-center"/>
                <div className='w-auto mt-4'>
                    <Skeleton className="h-[58px] w-[720px] rounded-lg mb-5 inline-flex items-center"/>
                    {Array.from({ length: 3}, (_, index) => (
                        <Skeleton className="h-[58px] w-[720px] rounded-lg mb-5" key={index}/>
                    ))}
                </div>
                <Skeleton className="h-[36px] w-[100px] rounded-lg"/>
            </div>
        </div>
    );
}

export default loading
