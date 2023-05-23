"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PATHS = [
  { label: "Arts", path: "/arts" },
  { label: "Food", path: "/food" },
  { label: "Fashion", path: "/fashion" },
  { label: "Social", path: "/social" },
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();

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
          {PATHS.map((path, index) => (
            <Link
              href={path.path}
              className={`hover-underline-animation ${
                index !== PATHS.length - 1 ? "mr-4" : ""
              } ${pathname === path.path ? "font-bold" : ""}`}
              key={path.label}
            >
              <p>{path.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
