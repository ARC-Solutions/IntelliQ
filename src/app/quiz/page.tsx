import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateQuiz from "@/components/CreateQuiz";
export const metadata: Metadata = {
  title: "Quiz",
};
const QuizCreation = async () => {
  const supabase = createServerComponentClient({
    cookies,
  });
  const {session} = (await supabase.auth.getSession()).data;
  if (!session) {
    redirect("/");
  }

  return <CreateQuiz />;
};

export default QuizCreation;
