import Link from "next/link";
import React from "react";
import Image from "next/image";
type Props = {};

const Navbar = async (props: Props) => {
  return (
    <div className="fixed inset-x-0 top-0 bg-background z-[10] h-fit border-b border-primary py-2">
      <div className="flex items-center justify-center h-full gap-2 px-8 mx-auto max-w-7-xl">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://raw.githubusercontent.com/ARC-Solutions/IntelliQ/main/public/IntelliQ_Logo.png"
            style={{ width: "150px", height: "auto" }}
            alt="IntelliQ_Logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
