import { useCallback, useEffect, useState } from "react";
import { useToastMessages } from "../../hooks/useScroll";
import { useAppDispatch } from "../../redux";
import { deleteErrors } from "../../redux/reducer";
import { Toast } from "./Toast";
import "./toast.scss";

const TIME_TO_SHOW_TOAST = 5000;

export const ToastWidget = () => {
  const errorMessages = useToastMessages();

  const dispatch = useAppDispatch();

  const handleFunction = useCallback(
    (errors: string[]) => {
      const copyErrors = [...errors];
      copyErrors.shift();
      dispatch(deleteErrors(copyErrors));
    },
    [dispatch]
  );

  useEffect(() => {
    if (errorMessages.length === 0) {
      return;
    }
    const timeoutID = setTimeout(() => {
      handleFunction(errorMessages);
    }, TIME_TO_SHOW_TOAST);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [errorMessages, handleFunction]);

  if (errorMessages.length === 0) {
    return null;
  }

  return <Toast toastMessage={errorMessages[0]} />;
};
