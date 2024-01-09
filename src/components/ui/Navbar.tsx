import Link from "next/link";
import React from "react";
import Image from "next/image";
import UserAvatar from "../UserAvatar";

type Props = {};

const Navbar = async () => {
  return (
    <div className="fixed inset-x-0 top-0 bg-background z-[10] h-fit border-b border-primary py-2">
      <div className="flex items-center justify-center h-full gap-2 px-8 mx-auto max-w-7-xl">
        <Link href="/" className="flex items-center gap-2">
          <Image
            priority
            src="/intelliq_logo.png"
            width={150}
            height={150}
            alt="IntelliQ_Logo"
          />
        </Link>
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
