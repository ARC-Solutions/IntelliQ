import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DashboardPage from "@/components/DashboardPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const fetchAllQuizzes = async (accessToken: string) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/quizzes`;
    const response = await fetch(URL, {
      cache: "no-store",
      next: {
        revalidate: 300,
      },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
const Dashboard = async () => {
  const supabase = createServerComponentClient({
    cookies,
  });
  const { session } = (await supabase.auth.getSession()).data;
  const accessToken = session?.access_token as string;
  const data = await fetchAllQuizzes(accessToken);

  if (!session) {
    redirect("/");
  }
  return <DashboardPage prevQuizzes={data} />;
};

export default Dashboard;
