import { useSelector } from "react-redux";
import { useState, useEffect, useRef, BaseSyntheticEvent } from "react";
import { RootState, useAppDispatch } from "../../../redux";
import {
  addGraphOptionsAction,
  deleteBookMarkedCity,
  removeForecastCityAction,
  setBookMarkedCity,
} from "../../../redux/reducer";
import Card from "./Card";
import Graph from "./Graph";
import { setBookmarkedCities } from "../../../services/localStorageCities";
import { SelectPanelViewOption, Unit } from "../../../types/enum";
import { CardsGraphWrapperType } from "./types";
import sprite from "../../../svg/sprite.svg";
import "./styles.scss";
import { getArrayContainerItem } from "../../../helpers/getArrayItem";
import { NUMBER_OF_ITEM } from "../../../constants";
import Popup from "../../Popup";
import { getFunctionOptions } from "../../../services/getGraphOptions";
import { toggleTemp } from "../../../helpers/temperatureType";
import { InitialGraphOptionsType } from "../../../types/commonTypes";

export const CardsGraphWrapper = ({
  infoCities: { id, selectViewPanel, daily, name, bookMarked },
}: CardsGraphWrapperType) => {
  const [isShowingStar, setShowingStar] = useState(false);
  const [panelBurgerView, setShowingPanelBurger] = useState(false);
  const dispatch = useAppDispatch();
  const listOfForecastCities = useSelector(
    (state: RootState) => state.forecastCities.cities
  );

  const currentCity = listOfForecastCities.find((item) => item.name === name);

  const bookMarkedCities = useSelector(
    (state: RootState) => state.bookMarkedCities.bookMarkedCities
  );
  const temperatureType = useSelector(
    (state: RootState) => state.typeOfTemp.toggleTemp
  );
  const option: InitialGraphOptionsType = currentCity?.graphOptions
    ? currentCity.graphOptions
    : getFunctionOptions(temperatureType, name, daily);

  const [graphOptions, setGraphOptions] = useState(option);
  const [graphOptionsToggle, setGraphOptionsToggle] =
    useState<InitialGraphOptionsType>();
  const cardBox: any = useRef();

  const bookMarkedLength = bookMarkedCities.length;

  const handleStar = () => {
    if (isShowingStar) {
      dispatch(deleteBookMarkedCity(currentCity?.id));
    } else {
      const bookMarkedCity = bookMarkedCities.find(
        (item) => item.name === name
      );
      if (!bookMarkedCity) {
        dispatch(setBookMarkedCity(currentCity));
      }
    }

    setShowingStar(!isShowingStar);
  };

  const handleBurgerMenu = () => {
    setShowingPanelBurger(true);
  };

  const hidePaneViewBurger = (e: BaseSyntheticEvent) => {
    const currentClickedElement = e.target;
    if (
      currentClickedElement.closest(".popup-container") &&
      !currentClickedElement.closest(".popup-container__cross")
    ) {
      return;
    }
    setShowingPanelBurger(false);
  };

  const removeInfo = () => {
    dispatch(removeForecastCityAction(id));
  };

  useEffect(() => {
    if (bookMarked) {
      setShowingStar(true);
    }
    const box = cardBox.current;
    box.addEventListener("click", hidePaneViewBurger);

    return () => {
      box.removeEventListener("click", hidePaneViewBurger);
    };
  }, []);

  useEffect(() => {
    setBookmarkedCities(bookMarkedCities);
  }, [bookMarkedLength]);

  useEffect(() => {
    const toggleOptions = {
      ...graphOptions,
      yAxis: {
        title: {
          text: `Temperature in ${Unit[temperatureType]}`,
        },
      },
      series: graphOptions.series.map((item) => {
        return {
          ...item,
          data: item.data?.map((item) => {
            return Number(toggleTemp(item, temperatureType));
          }),
        };
      }),
    };

    setGraphOptionsToggle(toggleOptions);
    dispatch(addGraphOptionsAction({ id, graphOptions }));
  }, [temperatureType, graphOptions]);

  return (
    <div ref={cardBox} className="info-container">
      {selectViewPanel === SelectPanelViewOption.Card && (
        <Card name={name} daily={daily} />
      )}
      {selectViewPanel === SelectPanelViewOption.Graph && (
        <Graph name={name} daily={daily} graphOptions={graphOptionsToggle} />
      )}
      <div onClick={handleBurgerMenu} className="info-container__burger">
        {getArrayContainerItem(NUMBER_OF_ITEM)}
      </div>
      <div className="info-container__star-container">
        <svg className="info-container__star" onClick={handleStar}>
          <use
            href={`${sprite}${
              isShowingStar ? "#icon-star-full" : "#icon-star-empty"
            }`}
          />
        </svg>
      </div>
      <div onClick={removeInfo} className="info-container__clear">
        <svg className="info-container__cross">
          <use href={`${sprite}#icon-cross`} />
        </svg>
      </div>

      <Popup
        panelBurgerView={panelBurgerView}
        hidePaneViewBurger={hidePaneViewBurger}
        id={id}
        selectViewPanel={selectViewPanel}
        setGraphOptions={setGraphOptions}
      />
    </div>
  );
};

export default CardsGraphWrapper;
