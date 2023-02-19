import { VFC } from "react";
import "./toast.scss";

interface Props {
  toastMessage: string;
}

export const Toast: VFC<Props> = ({ toastMessage }) => {
  return <div className="toast">{toastMessage}</div>;
};
