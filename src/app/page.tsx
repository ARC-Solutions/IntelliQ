import SignUpCard from '@/components/SignUpCard';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-3xl text-center'>
        Quiz yourself on your chosen topic with
        <span className='text-primary'> IntelliQ</span>.
      </h1>
      <div className='text-[17.5px] font-light opacity-70 m-2 mb-5 text-center'>
        I am IntelliQ, created and maintained by
        <span className='text-primary'> ARC-Solutions</span>
      </div>
      <div className='flex items-center justify-center'>
        <SignUpCard />
      </div>
    </div>
  );
}
