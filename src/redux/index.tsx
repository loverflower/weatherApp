import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  BookMarkedWeather,
  ForecastCities,
  ProcessOfGettingData,
  TempReducer,
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
});

export const mainStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof mainStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
