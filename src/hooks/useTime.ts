import { useState, useEffect } from "react";
import { getCurrentTime } from "../helpers/time";

export const useTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const changeTime = () => setCurrentTime(getCurrentTime());
  useEffect(() => {
    let timer = setInterval(changeTime, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return currentTime;
};
