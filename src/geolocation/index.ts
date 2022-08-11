import { CoordinateType } from "../types/types";

export const getGeolocation = async (): Promise<CoordinateType> => {
  const {
    coords: { latitude, longitude },
  } = await new Promise((resolve) =>
    navigator.geolocation.getCurrentPosition(resolve, () => {
      console.error(" geolocation is turned off");
    })
  );

  return { latitude, longitude };
};
