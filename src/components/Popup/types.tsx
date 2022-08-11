import { BaseSyntheticEvent } from "react";

export type PopupType = {
  panelBurgerView: boolean;
  hidePaneViewBurger: (e: BaseSyntheticEvent) => void;
  id: string;
  selectViewPanel?: number | boolean;
  setGraphOptions: Function;
};
