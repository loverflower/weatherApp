import { SearchOption } from "../enum";

export type filteredForecastDataType = {
  temp: number;
  description: string;
  icon: string;
  dt: number;
};

export type CurrentCityType = {
  name: string;
  clouds: number;
  pressure: number;
  humidity: number;
  temp: number;
  sunRise: number;
  sunSet: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  description: string;
  icon: string;
};

export type CardGraphType = {
  daily?: filteredForecastDataType[];
  name?: string;
  graphOptions?: InitialGraphOptionsType;
};

export type TableProps = {
  currentCity: CurrentCityType;
  temperatureType: number;
};

export type ButtonType = {
  value: SearchOption;
  label: string;
};

export type FormType = {
  value: SearchOption;
  label: string;
  placeholders: { first: string; second?: string };
};

export type FormattedFormResultType = {
  formName: number;
  id: string;
  selectViewPanel: number;
  inputCoordsLat?: number | string;
  inputCoordsLong?: number | string;
  inputCity?: number | string;
  inputCode?: string | number;
  inputZone?: string | number;
  daily?: filteredForecastDataType[];
  name?: string;
  bookMarked: boolean;
  graphOptions?: InitialGraphOptionsType;
};

export type InitialGraphOptionsType = {
  chart: {
    type: string;
    height: number;
    backgroundColor: string;
    borderRadius: string;
  };
  title: {
    text: string;
  };
  yAxis: {
    title: {
      text: string;
    };
  };
  legend: {
    align: string;
    verticalAlign: string;
    layout: string;
    x: number;
    y: number;
  };

  plotOptions: {
    series: {
      animation: Boolean;
    };
  };

  xAxis: {
    categories?: string[];
  };
  series: {
    name?: string;
    data?: number[];
  }[];
  credits: {
    enabled: boolean;
  };
};
