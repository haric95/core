"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlobalContext } from "@/state/globalContext";

const PATHS = [
  { label: "Arts", path: "/arts" },
  { label: "Food", path: "/food" },
  { label: "Fashion", path: "/fashion" },
  { label: "Social", path: "/social" },
];

const MAX_LOGO_SIZE = 512;
const MIN_LOGO_SIZE = 256;

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  const { isMobile, scrollPosition } = useContext(GlobalContext);
  const [logoSize, setLogoSize] = useState(
    pathname === "/" ? MAX_LOGO_SIZE : MIN_LOGO_SIZE
  );

  const handleScroll = useCallback(() => {
    setLogoSize(
      Math.min(
        logoSize,
        Math.round(Math.max(MIN_LOGO_SIZE, MAX_LOGO_SIZE - scrollPosition))
      )
    );
  }, [logoSize, scrollPosition]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={`w-full p-8`}>
      <div className="w-full flex justify-center">
        <Link href="/">
          <Image
            src="/logo-transparent.png"
            alt="logo"
            width={logoSize}
            height={logoSize}
            className="mb-4"
          />
        </Link>
      </div>
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
