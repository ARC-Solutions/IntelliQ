import SignUpCard from '@/components/SignUpCard';

export default function Home() {
  return (
    <div>
      <h1 className='grid grid-flow-col place-content-center text-3xl m-2'>
        Quiz yourself on your chosen topic with
        <span className='text-primary ml-1'>IntelliQ</span>.
      </h1>

      <h3 className='grid grid-flow-col place-content-center font-light opacity-70 m-2 mb-5'>
        I am IntelliQ, created and maintained by
        <span className='text-primary ml-1'>ARC-Solutions</span>
      </h3>
      <div className='grid grid-flow-col place-content-center'>
        <SignUpCard />
      </div>
    </div>
  );
}
