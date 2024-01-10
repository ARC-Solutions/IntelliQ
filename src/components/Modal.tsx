import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {FaGithub} from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';
import Image from 'next/image';

const Modal = () => {
  return (
    <div className='flex items-center justify-center h-[76.5vh]'>
      <Card className='w-full md:w-auto lg:w-[970px] md:h-[410px] border-primary rounded-none p-4 pb-10 m-4 shadow-[0_0px_18px_-4px_rgba(0,0,0,0.24)] shadow-primary'>
        <CardHeader className='pb-3 pt-0'>
          <CardTitle className='text-2xl sm:text-4xl font-bold pb-3'>
            Welcome to IntelliQ!
          </CardTitle>
          <div className='flex items-center'>
            <FaGithub className='w-6 h-6 sm:w-7 sm:h-7 mr-2' />
            <a href='https://github.com/ARC-Solutions' target='_blank'>
              <p className='text-sm sm:text-lg font-extralight'>ARC-Solutions</p>
            </a>
            &nbsp; &nbsp;
            <FaXTwitter className='w-6 h-6 sm:w-7 sm:h-7  mr-2' />
            <a href='https://twitter.com/ARCTeamGroup' target='_blank'>
              <p className='text-sm sm:text-lg font-extralight'>ARCTeamGroup</p>
            </a>
          </div>
          <p className='text-sm sm:text-base lg:text-lg font-extralight pt-3'>
            {' '}
            Welcome to our AI quiz platform where your interests take the lead. Explore a wide range
            of personalized quizzes tailored to your passions, making learning and discovery an
            engaging and enjoyable experience.
          </p>
        </CardHeader>
        <CardContent className='pb-1'>
          <div className='border-b-[0.5px] border-primary pt-1 pb-1 opacity-30'></div>
          <h1 className='py-2 mt-4 text-lg'>Build with</h1>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-2 justify-content-between  '>
            <div className='flex items-center'>

              <Image src='/nextjs.png' width={36} height={36} alt='NextJs_Logo' className='mr-2' />
              <p className='font-extralight text-xl'>Next.js</p>
            </div>
            <div className='flex items-center'>
              <Image src='/aws.png' width={36} height={36} alt='AWS_Logo' className='mr-2' />
              <p className='font-extralight text-xl'>AWS</p>
            </div>
            <div className='flex items-center'>
              <Image src='/tailwind.png' width={36} height={36} alt='TailwindCSS_Logo' className='mr-2' />
              <p className='font-extralight text-lg'>Tailwind</p>
            </div>
            <div className='flex items-center'>
              <Image src='/openai.png' width={36} height={36} alt='OpenAI_Logo' className='mr-2' />
              <p className='font-extralight text-lg'>OpenAI</p>
            </div>
            <div className='flex items-center md:pt-5 '>
              <Image src='/typescript.png' width={36} height={36} alt='TypeScript_Logo' className='mr-2' />
              <p className='font-extralight text-xl'>TypeScript</p>
            </div>
            <div className='flex items-center md:pt-5'>
              <Image src='/supabase.png' width={36} height={36} alt='Supabase_Logo' className='mr-2' />
              <p className='font-extralight text-xl'>Supabase</p>
            </div>
            <div className='flex items-center md:pt-5'>
              <Image src='/shadcn.png' width={36} height={36} alt='Shadcn_Logo' className='mr-2' />
              <p className='font-extralight text-lg'>Shadcn</p>
            </div>
            <div className='flex items-center md:pt-5'>
              <Image src='/azure.png' width={36} height={36} alt='Azure_Logo' className='mr-2' />
              <p className='font-extralight text-lg'>Azure</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Modal;
