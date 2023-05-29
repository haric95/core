"use client";

import React, { useEffect, useState } from "react";

export const GlobalContext = React.createContext({
  isMobile: false,
  scrollPosition: 0,
});

const breakpoint = 768;

export const GlobalContextWrapper = ({ children }: React.PropsWithChildren) => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < breakpoint) {
        setIsMobile(true);
      } else if (window.innerWidth >= breakpoint) {
        setIsMobile(false);
      }
    });
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <GlobalContext.Provider value={{ isMobile, scrollPosition }}>
      {children}
    </GlobalContext.Provider>
  );
};
