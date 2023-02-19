import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

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

export const useGettingUser = () => {
  const user = useSelector((state: RootState) => state.userInfo.user);
  const isLoading = useSelector(
    (state: RootState) => state.userInfo.isLoadingUser
  );
  const userData = user?.id == null ? null : user;
  return [userData, isLoading] as const;
};

export const useToastMessages = () => {
  const messages = useSelector(
    (state: RootState) => state.errors.errorsMessages
  );
  return messages;
};

// export const useAuth = () => {
//   const auth = useSelector((state: RootState) => state.auth.auth);
//   return auth;
// };
