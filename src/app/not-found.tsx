"use client";
import Lottie from "lottie-react";
import Error from "../../public/404.json";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const ErrorPage = () => {
  const router = useRouter();
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40] md:w-[30vw] flex flex-col items-center">
      <Lottie animationData={Error} />
      <Button onClick={() => router.push("/")}>Back Home</Button>
    </div>
  );
};

export default ErrorPage;
