import React from "react";
import { BiSolidBrain } from "react-icons/bi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Topics from "./Topics";
const TopPicks = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          Our Top Picks!
          <BiSolidBrain />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Challenge yourself to a quiz with a topic of your choice
        </CardDescription>
        <Topics />
      </CardContent>
    </Card>
  );
};

export default TopPicks;
