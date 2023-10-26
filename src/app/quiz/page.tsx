import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quiz",
};
const Quiz = async () => {
  const supabase = createServerComponentClient({
    cookies,
  });
  const session = (await supabase.auth.getSession()).data.session;
  if (!session) {
    redirect("/");
  }

  return <div>Mark ist noob</div>;
};

export default Quiz;
