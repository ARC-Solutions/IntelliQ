"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../contexts/UserContext";
import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
const SignUpCard = () => {
  const [isANewUser, setIsAnewUser] = useState(false);
  const {
    currentUser,
    setCurrentUser,
    signinUsingEmail,
    signinUsingOAuth,
    signupUsingEmail,
  } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;
    const confirmPassword = confirmPasswordRef.current?.value as string;

    if (!email || !password || (isANewUser && !confirmPassword)) {
      toast.error("Please fill out all the fields");
      return;
    }
    if (isANewUser) {
      confirmPassword === password
        ? signupUsingEmail({ email, password })
        : toast.error("Your Password does not match");
    } else {
      signinUsingEmail({ email, password });
    }
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>ARC-Solutions</CardTitle>
        <CardDescription>Let's Sign You In</CardDescription>
        <Button>
          <FcGoogle size="" />
        </Button>
      </CardHeader>
      <CardContent>
        <form>
          <div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter you email address"
                ref={emailRef}
              />
            </div>
            <div>
              <Label htmlFor="name">Your Password</Label>
              <Input
                id="name"
                placeholder="Enter your Password"
                ref={passwordRef}
              />
            </div>
            {isANewUser && (
              <div>
                <Label htmlFor="name">Confirm Password</Label>
                <Input
                  id="name"
                  placeholder="Confirm your Password"
                  ref={confirmPasswordRef}
                />
              </div>
            )}
          </div>
        </form>
        <Button onClick={handleSubmit}>
          {isANewUser ? "Sign Up" : "Sign In"}
        </Button>
      </CardContent>
      <CardFooter>
        <h3>
          Already have an account?{" "}
          <span
            className="cursor-pointer"
            onClick={() => setIsAnewUser(!isANewUser)}
          >
            {isANewUser ? "Sign In" : "Sign Up"}
          </span>
        </h3>
      </CardFooter>
    </Card>
  );
};

export default SignUpCard;