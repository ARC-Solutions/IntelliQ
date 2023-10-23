"use client";
import { useAuth } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Dashboard = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      redirect("/");
    }
  }, [currentUser]);
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          Quiz Me!
          <BsFillQuestionDiamondFill />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Challenge yourself to a quiz with a topic of your choice
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
