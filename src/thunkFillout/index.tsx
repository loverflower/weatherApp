import { getDailyForecastByCoords, getWeatherByName } from "../api/weatherAPI";
import { transformForecastData } from "../helpers/formatInputData";
import { AppDispatch } from "../redux";
import { addForecastCityAction } from "../redux/reducer";
import { FormattedFormResultType } from "../types/commonTypes";

export const thunkFillout = (
  {
    name,
    id,
    bookMarked,
    formName,
    selectViewPanel,
    graphOptions,
  }: FormattedFormResultType,
  setState: Function
) => {
  return async (dispatch: AppDispatch) => {
    const result: any = await getWeatherByName(name);
    if (result.cod >= 400) {
      setState(false);
      return;
    }

    const {
      coord: { lat, lon },
    } = result;
    const daily = await getDailyForecastByCoords(lat, lon);
    if (!result) {
      return;
    }

    const resultData = transformForecastData({ daily });
    const resultObj = {
      selectViewPanel,
      name,
      id,
      bookMarked,
      formName,
      daily: resultData,
      graphOptions,
    };
    dispatch(addForecastCityAction(resultObj));
    setState(false);
  };
};
