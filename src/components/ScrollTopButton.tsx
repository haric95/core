"use client";

import { GlobalContext } from "@/state/globalContext";
import React, { useContext } from "react";
import { BsArrowUp } from "react-icons/bs";

export const ScrollTopButton: React.FC = () => {
  const { scrollPosition } = useContext(GlobalContext);
  return (
    <button
      className={`fixed top-8 md:top-16 left-8 md:left-16 border-black border-[1px] radius-xl flex justify-center items-center h-8 w-8 transition-opacity transition-duration-500 ${
        scrollPosition < 20 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <BsArrowUp />
    </button>
  );
};
