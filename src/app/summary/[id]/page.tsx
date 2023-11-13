import SummaryPage from "@/components/SummaryPage";
import { Metadata } from "next";

import React, { useEffect } from "react";
export const metadata: Metadata = {
  title: "Summary",
};
const Summary = ({ params }: { params: { id: string } }) => {
  return <SummaryPage quizID={params.id}/>;
};

export default Summary;
