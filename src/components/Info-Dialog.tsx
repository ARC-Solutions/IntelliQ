import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FaGithub, FaQuestionCircle} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import Image from "next/image";

const InfoDialog = () => {
    return (<Dialog>
            <DialogTrigger asChild>
                <Button className='text-sm bg-[#c8b6ff] rounded-xl font-bold'>
                    What Is IntelliQ <FaQuestionCircle className='ml-2'/>
                </Button>
            </DialogTrigger>
            <DialogContent className='md:max-w-auto lg:max-w-[940px] sm:max-w-[700px] max-w-[333px] border-primary rounded-none p-4 pb-10 m-4 shadow-[0_0px_18px_-4px_rgba(0,0,0,0.24)] shadow-primary'>
                <DialogHeader>
                    <DialogTitle>
                        Welcome To IntelliQ!
                    </DialogTitle>
                    <DialogDescription>
                        <div className='flex items-center'>
                            <FaGithub className='w-6 h-6 sm:w-7 sm:h-7 mr-2 text-white'/>
                            <a href='https://github.com/ARC-Solutions' target='_blank'>
                                <p className='text-sm sm:text-lg font-extralight text-white'>GitHub</p>
                            </a>
                            &nbsp; &nbsp;
                            <FaXTwitter className='w-6 h-6 sm:w-7 sm:h-7  mr-2 text-white'/>
                            <a href='https://twitter.com/ARCTeamGroup' target='_blank'>
                                <p className='text-sm sm:text-lg font-extralight text-white'>Twitter</p>
                            </a>
                        </div>
                        <p className='text-sm sm:text-base lg:text-lg font-extralight pt-3 text-white'>
                            {' '}
                            Welcome to our AI quiz platform where your interests take the lead. Explore a wide range
                            of personalized quizzes tailored to your passions, making learning and discovery an
                            engaging and enjoyable experience.
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <div className='border-b-[0.5px] border-primary pt-1 pb-1 opacity-30'></div>
                <h1 className='py-2 mt-4 text-lg'>Built with</h1>
                <div
                    className='grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-2 justify-content-between'>
                    <div className='flex items-center'>
                        <Image src='/svgs/nextjs.svg' width={36} height={36} alt='NextJs_Logo' className='mr-2'/>
                        <p className='font-extralight text-xl'>Next.js</p>
                    </div>
                    <div className='flex items-center'>
                        <Image src='/svgs/aws-amplify.svg' width={36} height={36} alt='AWS_Logo' className='mr-2'/>
                        <p className='font-extralight text-xl'>AWS Amplify</p>
                    </div>
                    <div className='flex items-center'>
                        <Image src='/svgs/tailwindcss.svg' width={36} height={36} alt='TailwindCSS_Logo'
                               className='mr-2'/>
                        <p className='font-extralight text-lg'>Tailwind</p>
                    </div>
                    <div className='flex items-center'>
                        <Image src='/svgs/openai_dark.svg' width={36} height={36} alt='OpenAI_Logo' className='mr-2'/>
                        <p className='font-extralight text-lg'>OpenAI</p>
                    </div>
                    <div className='flex items-center md:pt-5 '>
                        <Image src='/svgs/typescript.svg' width={36} height={36} alt='TypeScript_Logo'
                               className='mr-2'/>
                        <p className='font-extralight text-xl'>TypeScript</p>
                    </div>
                    <div className='flex items-center md:pt-5'>
                        <Image src='/svgs/supabase.svg' width={36} height={36} alt='Supabase_Logo'
                               className='mr-2'/>
                        <p className='font-extralight text-xl'>Supabase</p>
                    </div>
                    <div className='flex items-center md:pt-5'>
                        <Image src='/svgs/shadcn-ui_dark.svg' width={36} height={36} alt='Shadcn_Logo'
                               className='mr-2'/>
                        <p className='font-extralight text-lg'>Shadcn</p>
                    </div>
                    <div className='flex items-center md:pt-5'>
                        <Image src='/svgs/azure.svg' width={36} height={36} alt='Azure_Logo' className='mr-2'/>
                        <p className='font-extralight text-lg'>Azure</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>);
};

export default InfoDialog;