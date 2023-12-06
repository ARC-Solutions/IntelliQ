import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DashboardPage from "@/components/DashboardPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Metadata } from "next";
import { fetchAllQuizzes } from "@/utils/fetchAllQuizzes";
export const metadata: Metadata = {
  title: "Dashboard",
};
const Dashboard = async () => {
  const supabase = createServerComponentClient({
    cookies,
  });
  const { session } = (await supabase.auth.getSession()).data;
  const accessToken = session?.access_token as string;
  const data = await fetchAllQuizzes(accessToken, 0);

  
  if (!session) {
    redirect("/");
  }
  return <DashboardPage prevQuizzes={data}/>;
};

export default Dashboard;
