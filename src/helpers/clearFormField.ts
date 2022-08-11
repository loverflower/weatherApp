import { FormattedFormResultType } from "../types/commonTypes";
import { SearchOption, SelectPanelViewOption } from "../types/enum";

export const clearFormsField = (
  event: React.BaseSyntheticEvent,
  checkedFormData: FormattedFormResultType
) => {
  event.target[0].value = "";
  if (checkedFormData.formName === SearchOption.City) {
    event.target[1].value = SelectPanelViewOption.Card;
  }
  if (
    checkedFormData.formName === SearchOption.Coords ||
    checkedFormData.formName === SearchOption.Zone
  ) {
    event.target[1].value = "";
    event.target[2].value = SelectPanelViewOption.Card;
  }
};
