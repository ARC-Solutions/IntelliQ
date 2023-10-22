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
  const { currentUser } = useAuth();
  if (currentUser) {
    return (
      <Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {currentUser?.img ? (
              <div className="relative w-full h-full aspect-square">
                <Image
                  src={currentUser?.img}
                  fill
                  alt="user"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarImage src="https://github.com/shadcn.png" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{currentUser.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Sign out <IoExitOutline />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Avatar>
    );
  }
};

export default UserAvatar;
