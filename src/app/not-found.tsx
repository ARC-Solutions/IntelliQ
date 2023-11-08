"use client";
import Lottie from "lottie-react";
import Error from "../../public/404.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type Props = {};

const ErrorPage = (props: Props) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40] md:w-[30vw] flex flex-col items-center">
      <Lottie animationData={Error} />
      <Link href={"https://www.intelliq.arc-solutions.xyz/"}>
        <Button>Back Home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
