"use client";
import { useAuth } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      redirect("/");
    }
  }, [currentUser]);
  return <div>Dashboard</div>;
};

export default Dashboard;
