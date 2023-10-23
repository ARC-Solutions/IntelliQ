"use client";
import { IoExitOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/UserContext";
import Image from "next/image";
const UserAvatar = () => {
  const { currentUser, signout } = useAuth();
  if (currentUser) {
    return (
      <Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {currentUser?.img ? (
              <AvatarImage src={currentUser.img} />
            ) : (
              <AvatarImage src="https://github.com/shadcn.png" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {currentUser.name && (
              <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
            )}
            <DropdownMenuLabel>{currentUser.email}</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signout}>
              Sign out <IoExitOutline />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Avatar>
    );
  }
};

export default UserAvatar;