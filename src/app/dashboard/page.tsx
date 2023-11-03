import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DashboardPage from "@/components/DashboardPage";
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
  return <DashboardPage />;
};

export default Dashboard;
