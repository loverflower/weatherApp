import {
  getDailyForecastByCoords,
  getWeatherByCoords,
  getWeatherByName,
  getWeatherByZone,
} from "../api/weatherAPI";
import { FormattedFormResultType } from "../types/commonTypes";
import { SearchOption } from "../types/enum";
import { CoordinateType } from "../types/types";

export const getWeatherForecast = async (
  formResult: FormattedFormResultType
) => {
  try {
    if (formResult.formName === SearchOption.City) {
      const {
        coord: { lat, lon },
        name,
      } = await getWeatherByName(formResult.inputCity);
      const daily = await getDailyForecastByCoords(lat, lon);

      return { name, daily };
    }

    if (formResult.formName === SearchOption.Coords) {
      const coords: CoordinateType = {
        latitude: formResult.inputCoordsLat,
        longitude: formResult.inputCoordsLong,
      };

      const { name } = await getWeatherByCoords(coords);
      const daily = await getDailyForecastByCoords(
        formResult.inputCoordsLat,
        formResult.inputCoordsLong
      );

      return { name, daily };
    }

    if (formResult.formName === SearchOption.Zone) {
      const {
        coord: { latitude, longitude },
        name,
      } = await getWeatherByZone(formResult.inputCode, formResult.inputZone);
      const daily = await getDailyForecastByCoords(latitude, longitude);

      return { name, daily };
    }
  } catch (err) {
    console.error(err);
  }
};
