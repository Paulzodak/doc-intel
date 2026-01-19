"use client";
import * as React from "react";

export function useShowNav() {
  const [isNavbarVisible, setIsNavbarVisible] = React.useState(true);
  // const w: any = window ? window : null;
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  React.useEffect(() => {
    window?.pageYOffset;
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== undefined) {
        const currentScrollPos = window?.pageYOffset;
        // console.log("prevScrollPos", prevScrollPos);
        // console.log("currentScrollPos", currentScrollPos);
        if (prevScrollPos + 2 > currentScrollPos + 2) {
          setIsNavbarVisible(true); // Scrolling up, show the navbar
        } else if (prevScrollPos > 300) {
          setIsNavbarVisible(false); // Scrolling down, hide the navbar
        }

        setPrevScrollPos(currentScrollPos);
      }
    };

    // Add the scroll event listener when the component mounts
    window?.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return isNavbarVisible;
}
