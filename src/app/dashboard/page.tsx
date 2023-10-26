import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import QuizMe from "@/components/QuizMe";
import TopPicks from "@/components/TopPicks";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  const supabase = createServerComponentClient({
    cookies,
  });
  const { session } = (await supabase.auth.getSession()).data;
  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <QuizMe />
      <TopPicks />
    </div>
  );
};

export default Dashboard;
