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
import { Unit } from "./types/enum";
import "./App.scss";
import { checkAuth, getOptions } from "./serviceAxios/UIActions";
import { useGettingUser } from "./hooks/useScroll";
import { ToastWidget } from "./components/Toast/ToastWidget";

function App() {
  const [user] = useGettingUser();
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
      if (localStorage.getItem("token")) {
        await checkAuth(dispatch);
      }
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
    if (user == null) {
      return;
    }

    (async () => {
      const result = await getOptions(user.id, dispatch);
      dispatch(setBookMarkedCity(result));
    })();
  }, [user, dispatch]);

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
      <ToastWidget />
    </main>
  );
}

export default App;
