import { AppDispatch } from "../redux";
import { gettingErrorOfForecastAction } from "../redux/reducer";
import {
  FormattedFormResultType,
  filteredForecastDataType,
} from "../types/commonTypes";
import { SearchOption } from "../types/enum";

export const validationForm = (
  formResult: FormattedFormResultType,
  dispatch: AppDispatch
) => {
  if (formResult.formName === SearchOption.City) {
    if (!formResult.inputCity || Number(formResult.inputCity)) {
      dispatch(gettingErrorOfForecastAction(true));
      return;
    } else {
      return formResult;
    }
  }

  if (formResult.formName === SearchOption.Coords) {
    if (
      !formResult.inputCoordsLat ||
      !formResult.inputCoordsLong ||
      !Number(formResult.inputCoordsLat) ||
      !Number(formResult.inputCoordsLong)
    ) {
      dispatch(gettingErrorOfForecastAction(true));
      return;
    } else {
      return formResult;
    }
  }

  if (formResult.formName === SearchOption.Zone) {
    if (!formResult.inputCode || !formResult.inputZone) {
      dispatch(gettingErrorOfForecastAction(true));
      return;
    } else {
      return formResult;
    }
  }
};

export const transformForecastData = (
  forecastData: any
): filteredForecastDataType[] => {
  const filteredForecastData: filteredForecastDataType[] = [];
  forecastData.daily.forEach((item: any) => {
    filteredForecastData.push({
      temp: item.temp.day,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      dt: item.dt,
    });
  });

  return filteredForecastData;
};
