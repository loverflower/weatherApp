import { getDailyForecastByCoords, getWeatherByName } from "../api/weatherAPI";
import { transformForecastData } from "../helpers/formatInputData";
import { AppDispatch } from "../redux";
import { isLoadingPopupAction } from "../redux/reducer";

export const thunkPopup = (cityName: string, setErrorPopup: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoadingPopupAction(true));
    const result = await getWeatherByName(cityName);
    if (result.cod >= 400) {
      dispatch(isLoadingPopupAction(false));
      setErrorPopup(true);
      return;
    }

    const {
      name,
      coord: { lat, lon },
    } = result;
    const daily = await getDailyForecastByCoords(lat, lon);
    if (!result) {
      return;
    }
    dispatch(isLoadingPopupAction(false));
    const resultData = transformForecastData({ daily });

    const option = {
      name,
      data: resultData.map((item) => item.temp),
    };

    return option;
  };
};
