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
      <h1>Quiz yourself on your chosen topic with IntelliQ</h1>
      <h3>
        I am IntelliQ, created and maintained by <span>ARC-Solutions</span>
      </h3>
      <SignUpCard />
    </div>
  );
}
