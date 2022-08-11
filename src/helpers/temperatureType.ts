import { ABSOLUTE_TEMP_ZERO } from "../constants";
import { SelectPanelViewOption, Unit } from "../types/enum";
import { TemperatureUnit } from "../types/temperatureUnit";

export const getNextTempType = (isToggleButtonActive: boolean) =>
  isToggleButtonActive ? Unit.Celsius : Unit.Fahrenheit;

export const getNextViewType = (isToggle: boolean) =>
  isToggle ? SelectPanelViewOption.Card : SelectPanelViewOption.Graph;

export const getTempType = (temperatureType: number) =>
  Object.entries(TemperatureUnit)[temperatureType][1];

export const toggleTemp = (defaultTemp: number, unit: Unit) => {
  let resultTemp;
  if (!defaultTemp) {
    return;
  }
  if (unit === Unit.Celsius) {
    resultTemp = (defaultTemp - ABSOLUTE_TEMP_ZERO).toFixed(1);
  } else if (unit === Unit.Fahrenheit) {
    resultTemp = (1.8 * (defaultTemp - ABSOLUTE_TEMP_ZERO) + 32).toFixed(1);
  }

  return resultTemp;
};
