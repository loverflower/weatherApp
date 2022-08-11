import dayjs from "dayjs";
import { filteredForecastDataType } from "../types/commonTypes";

export const getCurrentTime = () => {
  return dayjs().format("HH:mm:ss");
};

export const transformTime = (time?: number) => {
  if (!time) {
    return;
  }

  return dayjs(time * 1000).format("HH:mm");
};

export const getTransformTime = (time: number) =>
  dayjs(time * 1000).format("DD-MM-YYYY");

export const getForecastData = (data?: filteredForecastDataType[]) =>
  data?.map((item) => dayjs(item.dt * 1000).format("DD-MM-YYYY"));
