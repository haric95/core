import React from "react";
import Image from "next/image";
import Link from "next/link";
import { manrope } from "@/app/layout";

export const Navigation: React.FC = () => {
  return (
    <div className={`w-full p-8`}>
      <div className="w-full flex justify-center">
        <Link href="/">
          <Image
            src="/logo-transparent-m.png"
            alt="logo"
            width="128"
            height="128"
            className="mb-4"
          />
        </Link>
      </div>
      {/* <div className="w-full flex justify-center mb-4 opacity-80">
        <p>Humanitarian Project</p>
      </div> */}
      <div className={`w-full flex justify-center opacity-80`}>
        <div className="flex justify-between">
          <Link href="/arts" className="hover-underline-animation mr-4">
            <p>Arts</p>
          </Link>
          <Link href="/food" className="hover-underline-animation mr-4">
            <p>Food</p>
          </Link>
          <Link href="/fashion" className="hover-underline-animation mr-4">
            <p>Fashion</p>
          </Link>
          <Link href="/social" className="hover-underline-animation">
            <p>Social</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
