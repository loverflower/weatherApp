import React, { useState } from "react";
import clsx from "clsx";
import { v4 as keyRandom } from "uuid";
import { useSelector } from "react-redux";
import {
  changeSearchingFormAction,
  gettingErrorOfForecastAction,
} from "../../redux/reducer";
import { RootState, useAppDispatch } from "../../redux";
import { thunk } from "../../thunk";
import { useScroll } from "../../hooks/useScroll";
import { validationForm } from "../../helpers/formatInputData";
import { SearchOption, SelectPanelViewOption } from "../../types/enum";
import {
  buttonsTypes,
  formTypes,
  SELECT_DEFAULT_VALUE,
  START_STICKY_HEIGHT,
  STICKY_CLASS_NAME,
} from "../../constants";
import punish from "../../img/power-punish.png";
import "./styles.scss";

const SearchingCities = () => {
  const [selectView, setSelectView] = useState(SELECT_DEFAULT_VALUE);
  const [typeOfViewSearch, setTypeOfViewSearch] = useState<SearchOption>(
    SearchOption.City
  );
  const viewOfSearchingPanel = useScroll(
    START_STICKY_HEIGHT,
    STICKY_CLASS_NAME
  );
  const forecastCities = useSelector(
    (state: RootState) => state.forecastCities.cities
  );

  const isLoadingForecastData = useSelector(
    (state: RootState) => state.loadingData.isForecastUpload
  );

  const forecastDataError = useSelector(
    (state: RootState) => state.loadingData.errors.forecastDataError
  );
  const currentFormActive = useSelector(
    (state: RootState) => state.loadingData.activeForm
  );

  const dispatch = useAppDispatch();

  const changeInput = () => {
    dispatch(gettingErrorOfForecastAction(false));
  };

  const handlePanelTypeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currentSelect = +event.target.value;
    setSelectView(SelectPanelViewOption[currentSelect]);
  };

  const changeCitiesInputType = (typeOfViewSearch: number) => {
    setSelectView(SELECT_DEFAULT_VALUE);
    setTypeOfViewSearch(typeOfViewSearch);
    dispatch(gettingErrorOfForecastAction(false));
  };

  const getFormData = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    let validatedResultForm;
    let commonResultFields = {
      formName: +SearchOption[event.currentTarget.name],
      id: keyRandom(),
      bookMarked: false,
    };

    if (currentFormActive === SearchOption.City) {
      const formResult = {
        inputCity: event.target[0].value,
        selectViewPanel: +event.target[1].value,
      };
      validatedResultForm = validationForm(
        { ...formResult, ...commonResultFields },
        dispatch
      );
    }

    if (currentFormActive === SearchOption.Coords) {
      const formResult = {
        inputCoordsLat: event.target[0].value,
        inputCoordsLong: event.target[1].value,
        selectViewPanel: +event.target[2].value,
      };
      validatedResultForm = validationForm(
        { ...formResult, ...commonResultFields },
        dispatch
      );
    }

    if (currentFormActive === SearchOption.Zone) {
      const formResult = {
        inputCode: event.target[0].value,
        inputZone: event.target[1].value,
        selectViewPanel: +event.target[2].value,
      };

      validatedResultForm = validationForm(
        { ...formResult, ...commonResultFields },
        dispatch
      );
    }
    if (validatedResultForm) {
      dispatch(thunk(validatedResultForm, event, forecastCities));
    }
  };

  return (
    <section className={clsx("searching-container", viewOfSearchingPanel)}>
      <div className="searching-container__buttons-wrapper">
        {buttonsTypes.map(({ value, label }, index) => (
          <button
            key={index}
            className={clsx("btn", "btn-small", {
              active: value === typeOfViewSearch,
            })}
            onClick={() => {
              dispatch(changeSearchingFormAction(value));
              changeCitiesInputType(value);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="searching-container__form-wrapper">
        {formTypes.map(
          (
            { label, value, placeholders, placeholders: { first, second } },
            index
          ) => (
            <>
              {value === typeOfViewSearch && (
                <form
                  onSubmit={(event) => {
                    getFormData(event);
                  }}
                  key={index}
                  name={SearchOption[index]}
                  className="searching-container__form "
                >
                  <label
                    className={clsx("searching-container__label", {
                      activeLabel: viewOfSearchingPanel,
                    })}
                  >
                    {label}
                  </label>

                  <input
                    onChange={changeInput}
                    name="input"
                    className={clsx("searching-container__input", {
                      errorInputForm: forecastDataError,
                    })}
                    type="text"
                    placeholder={first}
                  />

                  {Object.entries(placeholders).length > 1 && (
                    <input
                      onChange={changeInput}
                      name="input"
                      className={clsx("searching-container__input", {
                        errorInputForm: forecastDataError,
                      })}
                      type="text"
                      placeholder={second}
                    />
                  )}
                  <select
                    disabled={isLoadingForecastData || forecastDataError}
                    name="select"
                    onChange={handlePanelTypeSelect}
                    className="searching-container__select"
                  >
                    <option value={SelectPanelViewOption.Card}>Card</option>
                    <option value={SelectPanelViewOption.Graph}>Graph</option>
                  </select>
                  <button
                    disabled={isLoadingForecastData || forecastDataError}
                    className="btn btn-small"
                    type="submit"
                  >
                    add {selectView}
                  </button>
                </form>
              )}
            </>
          )
        )}
      </div>

      <div
        className={clsx("error-message", {
          showMessage: forecastDataError,
        })}
      >
        <p>Incorrect input! Dude, try again...</p>
        <img className="error-message__punish" src={punish} alt="punish" />
      </div>
    </section>
  );
};

export default SearchingCities;
