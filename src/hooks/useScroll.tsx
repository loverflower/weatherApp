import { useState, useEffect } from "react";

export const useScroll = (height: number, className: string) => {
  const [viewOfSearchingPanel, setViewOfSearchingPanel] = useState("");

  const scrollWindow = () => {
    window.scrollY > height
      ? setViewOfSearchingPanel(className)
      : setViewOfSearchingPanel("");
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollWindow);
    return () => {
      window.removeEventListener("scroll", scrollWindow);
    };
  }, []);

  return viewOfSearchingPanel;
};
