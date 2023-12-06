import SummaryPage from "@/components/SummaryPage";
import { Metadata } from "next";
import React from "react";
import { fetchAllQuizzes } from "@/app/dashboard/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Summary",
};
const Summary = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient({
    cookies,
  });
  const { session } = (await supabase.auth.getSession()).data;
  const accessToken = session?.access_token as string;
  const data = await fetchAllQuizzes(accessToken, 0);
  console.log(data);
  
  return <SummaryPage quizID={params.id} createdQuiz={data} />;
};

export default Summary;
