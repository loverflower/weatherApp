import { useState, useEffect } from "react";
import { useAppDispatch } from "./redux";
import Header from "./components/Header";
import SearchingCities from "./components/SearchingCity";
import Footer from "./components/Footer";
import ForecastWrapper from "./components/Forecast";
import { getGeolocation } from "./geolocation";
import { getWeatherByCoords } from "./api/weatherAPI";
import { transformResult } from "./services/transformResult";
import { CurrentCityType } from "./types/commonTypes";
import { setBookMarkedCity } from "./redux/reducer";
import { getBookmarkedCities } from "./services/localStorageCities";
import { Unit } from "./types/enum";
import "./App.scss";

function App() {
  const [currentCity, setCurrentCity] = useState<CurrentCityType | undefined>();
  const [temperatureType, setTemperatureType] = useState(Unit.Celsius);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const coordinates = await getGeolocation();
      const result = await getWeatherByCoords(coordinates);
      const correctResult = transformResult(result);

      setCurrentCity(correctResult);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const coordinates = await getGeolocation();
      const result = await getWeatherByCoords(coordinates);
      const correctResult = transformResult(result);

      setCurrentCity(correctResult);
    })();
  }, []);

  useEffect(() => {
    if (localStorage) {
      const finalResult = getBookmarkedCities();
      finalResult?.forEach((element) => {
        if (element) {
          dispatch(setBookMarkedCity(element));
        }
      });
    }
  }, []);

  return (
    <main className="container">
      <Header
        currentCity={currentCity}
        setTemperatureType={setTemperatureType}
        temperatureType={temperatureType}
      />
      <SearchingCities />
      <ForecastWrapper />
      <Footer />
    </main>
  );
}

export default App;
