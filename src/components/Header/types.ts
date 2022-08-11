import { CurrentCityType } from "../../types/commonTypes";

export type headerProps = {
  currentCity?: CurrentCityType;
  temperatureType: number;
  setTemperatureType: (currentData: number) => void;
};
