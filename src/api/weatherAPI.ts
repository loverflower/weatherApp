import { CoordinateType } from "./../types/types";
import { API_KEY } from "../configuration/config";
import { URL } from "../configuration/config";
import { CoordsByZoneType } from "./types";

export const getWeatherByCoords = async ({
  latitude,
  longitude,
}: CoordinateType) => {
  try {
    const currentResult = await fetch(
      `${URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    const response = await currentResult.json();
    if (response.cod >= 400) {
      return;
    }

    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getWeatherByName = async (name?: string | number) => {
  try {
    const currentResult = await fetch(
      `${URL}weather?q=${name}&appid=${API_KEY}`
    );
    const response = await currentResult.json();

    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getWeatherByZone = async (
  inputCode?: string | number,
  inputZone?: string | number
): Promise<CoordsByZoneType> => {
  const currentResult = await fetch(
    `${URL}weather?zip=${inputCode},${inputZone}&appid=${API_KEY}`
  );
  const response = await currentResult.json();

  return {
    ...response,
    coord: { latitude: response.coord.lat, longitude: response.coord.lon },
  };
};

export const getDailyForecastByCoords = async (
  lat?: number | string,
  lon?: number | string
) => {
  const currentResult = await fetch(
    `${URL}onecall?lat=${lat}&lon=${lon}&exclude="part"&appid=${API_KEY}`
  );
  const { daily } = await currentResult.json();

  return daily;
};
