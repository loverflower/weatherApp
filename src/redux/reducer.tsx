import { createSlice } from "@reduxjs/toolkit";
import { getNextViewType } from "../helpers/temperatureType";
import { SearchOption } from "../types/enum";
import { FormattedFormResultType } from "./../types/commonTypes/index";
export const toggleTempReducer = createSlice({
  name: "TempReducer",
  initialState: { toggleTemp: 0 },
  reducers: {
    toggleTempAction(state, action) {
      state.toggleTemp = action.payload;
    },
  },
});

export const TempReducer = toggleTempReducer.reducer;
export const { toggleTempAction } = toggleTempReducer.actions;

export const ForecastCitiesReducer = createSlice({
  name: "ForecastCitiesReducer",
  initialState: {
    cities: Array<FormattedFormResultType>(),
  },
  reducers: {
    addForecastCityAction(state, action) {
      state.cities.push(action.payload);
    },
    removeForecastCityAction(state, action) {
      state.cities = state.cities.filter((item) => item.id !== action.payload);
    },

    changeOrderForecastCityAction(state, { payload: { destination, source } }) {
      const copiedCurrentOrderList = [...state.cities];
      const [movingItem] = copiedCurrentOrderList.splice(source, 1);

      copiedCurrentOrderList.splice(destination, 0, movingItem);
      state.cities = copiedCurrentOrderList;
    },

    addGraphOptionsAction(state, action) {
      state.cities = state.cities.map((item) => {
        if (item.id === action.payload.id) {
          item = {
            ...item,
            graphOptions: action.payload.graphOptions,
          };
          return item;
        } else {
          return item;
        }
      });
    },

    changeViewOfInfoForecastCities(state, action) {
      state.cities = state.cities.map((element) => {
        if (element.id === action.payload.id) {
          return {
            ...element,
            selectViewPanel: getNextViewType(action.payload.popupView),
          };
        }
        return element;
      });
    },
  },
});

export const ForecastCities = ForecastCitiesReducer.reducer;
export const {
  addForecastCityAction,
  removeForecastCityAction,
  changeOrderForecastCityAction,
  changeViewOfInfoForecastCities,
  addGraphOptionsAction,
} = ForecastCitiesReducer.actions;

export const ProcessOfGettingDataReducer = createSlice({
  name: "ProcessOfGettingData",
  initialState: {
    isForecastUpload: false,
    isDataPopup: false,
    isBookmarkedData: false,
    errors: {
      forecastDataError: false,
      forecastDataPopupError: false,
    },
    activeForm: SearchOption.City,
  },
  reducers: {
    isLoadingForecastAction(state, action) {
      state.isForecastUpload = action.payload;
    },
    isLoadingBookmarkedAction(state, action) {
      state.isBookmarkedData = action.payload;
    },
    isLoadingPopupAction(state, action) {
      state.isDataPopup = action.payload;
    },
    gettingErrorOfForecastAction(state, action) {
      state.errors.forecastDataError = action.payload;
      state.isForecastUpload = false;
    },
    changeSearchingFormAction(state, action) {
      state.activeForm = action.payload;
    },

    gettingErrorOfPopupForecastAction(state, action) {
      state.errors.forecastDataPopupError = action.payload;
    },
  },
});

export const ProcessOfGettingData = ProcessOfGettingDataReducer.reducer;
export const {
  isLoadingForecastAction,
  gettingErrorOfForecastAction,
  changeSearchingFormAction,
  isLoadingPopupAction,
  gettingErrorOfPopupForecastAction,
  isLoadingBookmarkedAction,
} = ProcessOfGettingDataReducer.actions;

export const BookMarkedWeatherReducer = createSlice({
  name: "BookMarkedWeatherReducer",
  initialState: {
    bookMarkedCities: Array<FormattedFormResultType>(),
  },
  reducers: {
    setBookMarkedCity(state, action) {
      const { formName, graphOptions, id, name, selectViewPanel } =
        action.payload;
      state.bookMarkedCities.push({
        formName,
        graphOptions,
        id,
        name,
        bookMarked: true,
        selectViewPanel,
      });
    },
    deleteBookMarkedCity(state, action) {
      state.bookMarkedCities = state.bookMarkedCities.filter(
        ({ id }) => id !== action.payload
      );
    },
  },
});

export const BookMarkedWeather = BookMarkedWeatherReducer.reducer;
export const { setBookMarkedCity, deleteBookMarkedCity } =
  BookMarkedWeatherReducer.actions;
