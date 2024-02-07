import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FaGithub, FaQuestionCircle } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Image from 'next/image';

const InfoDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='rounded-xl bg-[#c8b6ff] text-sm font-bold'>
                    What Is IntelliQ <FaQuestionCircle className='ml-2' />
                </Button>
            </DialogTrigger>
            <DialogContent className='md:max-w-auto max-w-[333px] rounded-none border-primary shadow-[0_0px_18px_-4px_rgba(0,0,0,0.24)] shadow-primary sm:max-w-[700px] lg:max-w-[970px]'>
                <DialogHeader>
                    <DialogTitle>Welcome To IntelliQ!</DialogTitle>
                    <DialogDescription>
                        <div className='flex items-center'>
                            <FaGithub className='mr-2 h-6 w-6 text-white sm:h-7 sm:w-7' />
                            <a href='https://github.com/ARC-Solutions' target='_blank'>
                                <p className='text-sm font-extralight text-white sm:text-lg'>
                                    GitHub
                                </p>
                            </a>
                            &nbsp; &nbsp;
                            <FaXTwitter className='mr-2 h-6 w-6 text-white  sm:h-7 sm:w-7' />
                            <a href='https://twitter.com/ARCTeamGroup' target='_blank'>
                                <p className='text-sm font-extralight text-white sm:text-lg'>
                                    Twitter
                                </p>
                            </a>
                        </div>
                        <p className='pt-3 text-sm font-extralight text-white sm:text-base lg:text-lg'>
                            {' '}
                            Welcome to our AI quiz platform where your interests take the lead.
                            Explore a wide range of personalized quizzes tailored to your passions,
                            making learning and discovery an engaging and enjoyable experience.
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <div className='border-b-[0.5px] border-primary pb-1 pt-1 opacity-30'></div>
                <h1 className='mt-4 py-2 text-lg'>Built with</h1>
                <div className='justify-content-between mt-2 grid w-full grid-cols-2 gap-6 md:grid-cols-4'>
                    <div className='flex items-center'>
                        <Image
                            src='/svgs/nextjs.svg'
                            width={36}
                            height={36}
                            alt='NextJs_Logo'
                            className='mr-2'
                        />
                        <p className='text-xl font-extralight'>Next.js</p>
                    </div>
                    <div className='flex items-center'>
                        <Image
                            src='/svgs/aws-amplify.svg'
                            width={36}
                            height={36}
                            alt='AWS_Logo'
                            className='mr-2'
                        />
                        <p className='text-xl font-extralight'>Amplify</p>
                    </div>
                    <div className='flex items-center'>
                        <Image
                            src='/svgs/tailwindcss.svg'
                            width={36}
                            height={36}
                            alt='TailwindCSS_Logo'
                            className='mr-2'
                        />
                        <p className='text-lg font-extralight'>Tailwind</p>
                    </div>
                    <div className='flex items-center'>
                        <Image
                            src='/svgs/openai_dark.svg'
                            width={36}
                            height={36}
                            alt='OpenAI_Logo'
                            className='mr-2'
                        />
                        <p className='text-lg font-extralight'>OpenAI</p>
                    </div>
                    <div className='flex items-center md:pt-5 '>
                        <Image
                            src='/svgs/typescript.svg'
                            width={36}
                            height={36}
                            alt='TypeScript_Logo'
                            className='mr-2'
                        />
                        <p className='text-xl font-extralight'>TypeScript</p>
                    </div>
                    <div className='flex items-center md:pt-5'>
                        <Image
                            src='/svgs/supabase.svg'
                            width={36}
                            height={36}
                            alt='Supabase_Logo'
                            className='mr-2'
                        />
                        <p className='text-xl font-extralight'>Supabase</p>
                    </div>
                    <div className='flex items-center md:pt-5'>
                        <Image
                            src='/svgs/shadcn-ui_dark.svg'
                            width={36}
                            height={36}
                            alt='Shadcn_Logo'
                            className='mr-2'
                        />
                        <p className='text-lg font-extralight'>Shadcn</p>
                    </div>
                    <div className='flex items-center md:pt-5'>
                        <Image
                            src='/svgs/azure.svg'
                            width={36}
                            height={36}
                            alt='Azure_Logo'
                            className='mr-2'
                        />
                        <p className='text-lg font-extralight'>Azure</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default InfoDialog;
