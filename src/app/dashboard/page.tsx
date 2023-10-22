"use client";
import { useAuth } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      redirect("/");
    }
  }, [currentUser]);
  return <div>Dashboard</div>;
};

export default Dashboard;
