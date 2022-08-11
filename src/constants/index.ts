import { ButtonType, FormType } from "../types/commonTypes";
import { SearchOption } from "../types/enum";

export const ABSOLUTE_TEMP_ZERO = 273.15;
export const SELECT_DEFAULT_VALUE: string = "Card";
export const NUMBER_OF_ITEM: number = 3;
export const START_STICKY_HEIGHT = 148;
export const STICKY_CLASS_NAME = "sticky-searching";

export const buttonsTypes: ButtonType[] = [
  { value: SearchOption.City, label: "use city name" },
  { value: SearchOption.Coords, label: "use coords" },
  { value: SearchOption.Zone, label: "use zone" },
];

export const formTypes: FormType[] = [
  {
    value: SearchOption.City,
    label: "City",
    placeholders: { first: "...City" },
  },
  {
    value: SearchOption.Coords,
    label: "Coords",
    placeholders: { first: "...lat", second: "...long" },
  },
  {
    value: SearchOption.Zone,
    label: "Zone",
    placeholders: { first: "...zone", second: "...code" },
  },
];
