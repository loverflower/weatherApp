import {
  addForecastCityAction,
  gettingErrorOfForecastAction,
  isLoadingForecastAction,
} from "../redux/reducer";
import { AppDispatch } from "../redux";
import { getWeatherForecast } from "../services/getCurrentWeather";
import { clearFormsField } from "../helpers/clearFormField";
import { FormattedFormResultType } from "../types/commonTypes";
import { transformForecastData } from "../helpers/formatInputData";

export const thunk = (
  checkedFormData: FormattedFormResultType,
  event: React.BaseSyntheticEvent,
  forecastCities: FormattedFormResultType[]
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(isLoadingForecastAction(true));
      const currentWeatherForecast = await getWeatherForecast(checkedFormData);

      if (!currentWeatherForecast) {
        dispatch(gettingErrorOfForecastAction(true));
        return;
      }

      const forecastCityData = {
        ...checkedFormData,
        ...currentWeatherForecast,
        daily: transformForecastData(currentWeatherForecast),
      };
      clearFormsField(event, checkedFormData);
      dispatch(isLoadingForecastAction(false));
      const result = forecastCities.find(
        (item) => item.name === forecastCityData.name
      );
      if (result) {
        return;
      }

      dispatch(addForecastCityAction(forecastCityData));
    } catch (err) {
      console.error(err);
    }
  };
};
