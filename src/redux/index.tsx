import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { IUploadOptions } from "@testing-library/user-event";
import { useDispatch } from "react-redux";
import { IUser } from "../models/response/AuthResponse";
import {
  BookMarkedWeather,
  ForecastCities,
  ProcessOfGettingData,
  TempReducer,
  AuthReducer,
  UserReducer,
  ErrorToastReducer,
} from "./reducer";

export type LoadingDataType = {
  isForecastUpload: boolean;
  errors: {
    forecastDataError: boolean;
  };
};

const rootReducer = combineReducers({
  typeOfTemp: TempReducer,
  forecastCities: ForecastCities,
  loadingData: ProcessOfGettingData,
  bookMarkedCities: BookMarkedWeather,
  errors: ErrorToastReducer,
  userInfo: UserReducer,
  auth: AuthReducer,
});

export const mainStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof mainStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
