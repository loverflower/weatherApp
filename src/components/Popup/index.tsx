import { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux";
import {
  addGraphOptionsAction,
  changeViewOfInfoForecastCities,
} from "../../redux/reducer";
import { thunkPopup } from "../../thunkPopup";
import sprite from "../../svg/sprite.svg";
import ToggleButton from "../ToggleButton";
import "./styles.scss";
import { InitialGraphOptionsType } from "../../types/commonTypes";
import { PopupType } from "./types";

export const Popup = ({
  panelBurgerView,
  hidePaneViewBurger,
  id,
  selectViewPanel,
  setGraphOptions,
}: PopupType) => {
  const [popupView, setPopupView] = useState(selectViewPanel);
  const [inputCity, setInputCity] = useState();
  const dispatch = useAppDispatch();
  const listOfForecastCities = useSelector(
    (state: RootState) => state.forecastCities.cities
  );

  const [errorPopup, setErrorPopup] = useState(false);

  const isLoadingPopupData = useSelector(
    (state: RootState) => state.loadingData.isDataPopup
  );

  const handleToggle = () => {
    setPopupView(!popupView);
    dispatch(changeViewOfInfoForecastCities({ id, popupView }));
  };

  const handlePanelTypeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currentCity = listOfForecastCities.filter(
      (element) => element.name === event.target.value
    );

    setGraphOptions((prev: InitialGraphOptionsType) => {
      const result = prev.series.find((el) => el.name === currentCity[0].name);

      if (result) {
        return prev;
      }

      return {
        ...prev,
        series: [
          ...prev.series,
          {
            name: currentCity[0].name,
            data: currentCity[0].daily?.map((item) => item.temp),
          },
        ],
      };
    });
  };

  const changeInput = (e: React.BaseSyntheticEvent) => {
    setErrorPopup(false);
    setInputCity(e.target.value);
  };

  const formSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (e.target[0].value === "" || Number(e.target[0].value)) {
      setErrorPopup(true);
      return;
    }

    const option = await dispatch(thunkPopup(e.target[0].value, setErrorPopup));
    if (!option) {
      return;
    }

    setGraphOptions((prev: InitialGraphOptionsType) => {
      setInputCity(undefined);
      e.target[0].value = "";
      const result = prev.series.find((item) => item.name === option?.name);
      if (result) {
        return prev;
      }
      const graphData = {
        ...prev,
        series: [...prev.series, option],
      };
      dispatch(addGraphOptionsAction({ id, graphData }));
      return {
        ...prev,
        series: [...prev.series, option],
      };
    });
  };

  return (
    <div
      className={clsx("popup-container", {
        infoContainerPopupActive: panelBurgerView,
      })}
    >
      <div className="popup-container__cross">
        <svg className="popup-container__svg" onClick={hidePaneViewBurger}>
          <use href={`${sprite}#icon-cross`} />
        </svg>
      </div>
      <div className="popup-container__toggle">
        <span>Switch view</span>
        <ToggleButton
          handleToggle={handleToggle}
          selectViewPanel={selectViewPanel}
        />
      </div>
      <div className="popup-container__select">
        <span>Select added cities </span>
        <select
          disabled={!selectViewPanel}
          name="select"
          onChange={handlePanelTypeSelect}
          className="searching-container__select select-small"
        >
          <option value="" hidden>
            choose
          </option>
          {listOfForecastCities
            .filter((element) => element.id !== id)
            .map((element) => (
              <option value={element.name}>{element.name}</option>
            ))}
        </select>
      </div>
      <div className="popup-container__input">
        <span>Input</span>
        <form onSubmit={formSubmit}>
          <input
            value={inputCity}
            onChange={changeInput}
            name="input"
            className={clsx("searching-container__input", "input-small", {
              activePopupInput: errorPopup,
            })}
            type="text"
            placeholder="...City"
            disabled={!selectViewPanel}
          />
          <button
            className="btn btn-short popup-container__btn-margin"
            disabled={isLoadingPopupData || !selectViewPanel || errorPopup}
            type="submit"
          >
            {isLoadingPopupData ? "Wait" : "Go"}
          </button>
        </form>
      </div>
      {errorPopup && (
        <p className="searching-container__error">
          Dude..., stop spelling wrong data :)
        </p>
      )}
    </div>
  );
};
export default Popup;
