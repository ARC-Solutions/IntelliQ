import Quiz from "@/components/Quiz";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Quiz",
};
type Props = {
  params: {
    quizID: string;
  };
};

const QuizGame = async ({ params: { quizID } }: Props) => {
  const supabase = createServerComponentClient({
    cookies,
  });
  const { session } = (await supabase.auth.getSession()).data;
  if (!session) {
    redirect("/");
  }
  return <Quiz />;
};

export default QuizGame;
