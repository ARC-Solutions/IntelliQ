import SignUpCard from "@/components/SignUpCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Home() {
  const supabase = createServerComponentClient({
    cookies,
  });
  const session = (await supabase.auth.getSession()).data.session;
  if (session) {
    redirect("/dashboard");
  }
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
