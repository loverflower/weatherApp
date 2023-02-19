import { AxiosResponse } from "axios";
import { AuthResponse, IUser } from "./../models/response/AuthResponse";
import { AppDispatch } from "../redux";
import {
  authAction,
  setBookMarkedCity,
  setErrors,
  setIsLoadingAuth,
  setIsLoadingUser,
  setUser,
} from "../redux/reducer";
import AuthService from "./AuthService";
import OptionService from "./OptionService";

export interface errorsInterface {
  message: string;
  error: string[];
}

export const login = async (
  email: string,
  password: string,
  dispatch: AppDispatch
) => {
  try {
    const response = await AuthService.login(email, password);

    localStorage.setItem("token", response.data.accessToken);
    dispatch(authAction(true));
    dispatch(setUser(response.data.userDto));
  } catch (e: any) {
    console.log(e.response.data.message, "e.response.data.message");
    dispatch(setErrors(e.response.data.message));
  }
};

export const registration = async (
  email: string,
  password: string,
  dispatch: AppDispatch
) => {
  try {
    dispatch(setIsLoadingUser(true));
    const response = await AuthService.registration(email, password);

    localStorage.setItem("token", response.data.accessToken);
    dispatch(authAction(true));
    dispatch(setUser(response.data.userDto));
  } catch (e: any) {
    console.log(e, "e.response.data.message");

    dispatch(setErrors(e.response.data.message));
  } finally {
    dispatch(setIsLoadingUser(false));
  }
};

export const logout = async (dispatch: AppDispatch) => {
  try {
    await AuthService.logout();
    localStorage.removeItem("token");
    dispatch(authAction(false));
    dispatch(setUser({} as IUser));
  } catch (e: any) {
    dispatch(setErrors(e.response.data.message));
  }
};

export const checkAuth = async (dispatch: AppDispatch) => {
  try {
    const response = await AuthService.checkAuth();

    localStorage.setItem("token", response.data.accessToken);
    dispatch(authAction(true));
    dispatch(setUser(response.data.userDto));
  } catch (e: any) {
    dispatch(setErrors(e.response.data.message));
  }
};

export const addOption = async (option: any, dispatch: AppDispatch) => {
  try {
    const response = await OptionService.addOption(option);

    const optionData = response.data.map((x) => ({ ...x.option }));

    dispatch(setBookMarkedCity(optionData));
  } catch (e: any) {
    dispatch(setErrors(e.response.data.message));
  }
};

export const getOptions = async (userId: number, dispatch: AppDispatch) => {
  try {
    const response = await OptionService.getOptions(userId);
    const optionData = response.data.map((x) => ({ ...x.option }));
    return optionData;
  } catch (e: any) {
    dispatch(setErrors(e.response.data.message));
  }
};

export const deleteOption = async (
  id: string,
  userId: number,
  dispatch: AppDispatch
) => {
  try {
    const response = await OptionService.deleteOption(id, userId);

    const optionData = response.data.map((x) => ({ ...x.option }));
    return optionData;
  } catch (e: any) {
    dispatch(setErrors(e.response.data.message));
  }
};
