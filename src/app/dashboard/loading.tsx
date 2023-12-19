import {Skeleton} from "@/components/ui/skeleton";

const loading = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <Skeleton className='flex h-9 w-48 mb-5 rounded-full'/>
            <div>
                <Skeleton className="flex h-[170px] w-[350px] mb-20 rounded-md"/>
            </div>
            <div className="space-y-5">
                <Skeleton className="h-[424px] w-[350px] rounded-lg"/>
                <Skeleton className="h-[430px] w-[350px] rounded-lg"/>
            </div>
        </div>
    );
};

export default loading;
