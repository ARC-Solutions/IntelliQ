"use client";
import { IoExitOutline } from "react-icons/io5";
import { Avatar } from "@/components/ui/avatar";
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
import { FaUserCircle } from "react-icons/fa";
const UserAvatar = () => {
  const { currentUser, signout } = useAuth();
  if (currentUser) {
    return (
      <Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="relative w-full h-full aspect-square">
              {currentUser?.img ? (
                <Image
                  priority
                  src={currentUser.img}
                  fill
                  alt="user"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <FaUserCircle className="w-full h-full" />
              )}
            </div>
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
