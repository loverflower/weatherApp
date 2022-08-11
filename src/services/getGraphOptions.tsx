import { getForecastData } from "../helpers/time";
import { filteredForecastDataType } from "../types/commonTypes";
import { Unit } from "../types/enum";

export const getFunctionOptions = (
  temperatureType: number,
  cityName?: string,
  daily?: filteredForecastDataType[]
) => {
  const options = {
    chart: {
      type: "spline",
      height: 203,
      backgroundColor: "#f8f7ec",
      borderRadius: "5px",
    },
    title: {
      text: `Forecast for ${cityName}`,
    },
    credits: {
      enabled: false,
    },

    yAxis: {
      title: {
        text: `Temperature in ${Unit[temperatureType]}`,
      },
    },

    plotOptions: {
      series: {
        animation: false,
      },
    },
    legend: {
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      x: -10,
      y: 0,
    },

    xAxis: {
      categories: getForecastData(daily),
    },
    series: [{ name: cityName, data: daily?.map((item) => item.temp) }],
  };

  return options;
};
