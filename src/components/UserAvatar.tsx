"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/UserContext";
import Image from "next/image";
const UserAvatar = () => {
  const { currentUser } = useAuth();
  return (
    <Avatar>
      {currentUser?.img ? (
        <div className="relative w-full h-full aspect-square">
          <Image fill src={currentUser?.img} alt="user" />
        </div>
      ) : (
        <AvatarImage src="https://github.com/shadcn.png" />
      )}
    </Avatar>
  );
};

export default UserAvatar;
