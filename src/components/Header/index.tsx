import { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { toggleTempAction } from "../../redux/reducer";
import { RootState, useAppDispatch } from "../../redux";
import ToggleButton from "../ToggleButton";
import CurrentTime from "./CurrentTime";
import Fillout from "../Fillout";
import {
  toggleTemp,
  getTempType,
  getNextTempType,
} from "../../helpers/temperatureType";
import { transformTime } from "../../helpers/time";
import { headerProps } from "./types";
import spriteWeather from "../../svg/weathericonsprite.svg";
import { API_URL_ICONS } from "../../configuration/config";
import "./styles.scss";
import "../../styles/btn.scss";
import "../../styles/fillout.scss";
import "../../styles/scroll.scss";
import "../Forecast/CardsGraphWrapper/styles.scss";

const Header = ({ currentCity }: headerProps) => {
  const [showingFillOut, setShowingFillOut] = useState(false);
  const [isToggleButtonActive, setToggleButton] = useState(false);

  const dispatch = useAppDispatch();
  const temperatureType = useSelector(
    (state: RootState) => state.typeOfTemp.toggleTemp
  );

  const bookedMarkedCities = useSelector(
    (state: RootState) => state.bookMarkedCities.bookMarkedCities
  );

  const handleFillOut = () => setShowingFillOut((prev) => !prev);
  const handleToggle = () => {
    setToggleButton(!isToggleButtonActive);
    dispatch(toggleTempAction(getNextTempType(isToggleButtonActive)));
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__time">
          {currentCity && (
            <>
              <span>Your city: {currentCity?.name} </span>
              <CurrentTime />
            </>
          )}
        </div>

        <div className="header__location">
          {currentCity && (
            <>
              <span>Your current location: {currentCity?.name} </span>
              <span className="header__temperature">
                {toggleTemp(currentCity?.temp, temperatureType)}
                {getTempType(temperatureType)}
              </span>
              <span>
                <img
                  className="header__img"
                  src={`${API_URL_ICONS}${currentCity?.icon}@2x.png`}
                  alt="icon"
                />
              </span>
            </>
          )}
        </div>

        <div className="header__toggle">
          <div className="header__measure">
            <div>
              <span>℃</span>
              <span>℉</span>
            </div>
          </div>
          <ToggleButton
            handleToggle={handleToggle}
            selectTempType={temperatureType}
          />
          <button
            className={clsx("btn", "btn-big", {
              active: showingFillOut,
            })}
            onClick={handleFillOut}
          >
            {showingFillOut ? "Hide favorite cities" : "Show favorite cities"}
          </button>
        </div>
        <Fillout
          bookedMarkedCities={bookedMarkedCities}
          showingFillOut={showingFillOut}
        />
      </div>

      {currentCity && (
        <div className="header__info">
          <span className="header__weather-items">
            <svg className="svg-small">
              <use href={`${spriteWeather}#barometer`} />
            </svg>
            {currentCity?.pressure} Pa
          </span>
          <span className="header__weather-items">
            <svg className="svg-small">
              <use href={`${spriteWeather}#humidity`} />
            </svg>
            {currentCity?.humidity} %
          </span>
          <span className="header__weather-items">
            <svg className="svg-small">
              <use href={`${spriteWeather}#wind`} />
            </svg>
            {currentCity?.wind.speed} km/h
          </span>
          <span className="header__weather-items">
            <svg className="svg-small">
              <use href={`${spriteWeather}#sunrise`} />
            </svg>
            {transformTime(currentCity?.sunRise)}
          </span>
          <span className="header__weather-items">
            <svg className="svg-small">
              <use href={`${spriteWeather}#sunset`} />
            </svg>
            {transformTime(currentCity?.sunSet)}
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
