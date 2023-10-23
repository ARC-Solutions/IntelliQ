import SignUpCard from '@/components/SignUpCard';

export default function Home() {
  return (
    <div>
      <h1 className='grid grid-flow-col place-content-center text-3xl'>
        Quiz yourself on your chosen topic with 
        <span className='text-primary ml-1'>IntelliQ</span>.
      </h1>

      <h3 className='grid grid-flow-col place-content-center'>
        I am IntelliQ, created and maintained by
        <span>ARC-Solutions</span>
      </h3>

      <div className='grid place-content-center'>
        <SignUpCard />
      </div>
    </div>
  );
}
