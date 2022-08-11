import { CurrentCityType } from "../types/commonTypes";

export const transformResult = ({
  name,
  clouds: { all },
  main: { pressure, humidity, temp },
  sys: { sunrise, sunset },
  wind: { speed, deg, gust },
  weather,
}: any): CurrentCityType => ({
  name,
  clouds: all,
  pressure,
  humidity,
  temp,
  sunRise: sunrise,
  sunSet: sunset,
  wind: {
    speed,
    deg,
    gust,
  },
  description: weather[0].description,
  icon: weather[0].icon,
});
