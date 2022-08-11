import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux";
import { ListType } from "./types";
import "./styles.scss";
import "../../styles/fillout.scss";
import { thunkFillout } from "../../thunkFillout";
import clsx from "clsx";

const List = ({ city }: ListType) => {
  const dispatch = useAppDispatch();
  const forecastCities = useSelector(
    (state: RootState) => state.forecastCities.cities
  );
  const [isBlockingCityButton, setBlockingCityButton] = useState(false);

  const showForecastData = () => {
    const result = forecastCities.find((item) => item.name === city.name);
    if (result) {
      return;
    }
    setBlockingCityButton(true);

    dispatch(thunkFillout(city, setBlockingCityButton));
  };

  return (
    <li className="fillout__list">
      <button
        className={clsx("fillout__item", {
          gettingBookmarkedData: isBlockingCityButton,
        })}
        onClick={showForecastData}
        disabled={isBlockingCityButton}
      >
        <p className="fillout__cityName">{city.name}</p>
      </button>
    </li>
  );
};
export default List;
