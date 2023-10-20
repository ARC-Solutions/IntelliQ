"use client";
import { useAuth } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const { currentUser } = useAuth();
  if(!currentUser){
    redirect("/");
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
