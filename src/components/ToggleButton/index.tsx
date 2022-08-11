import clsx from "clsx";
import { toggleButtonPros } from "./types";
import "./styles.scss";

const ToggleButton = ({
  handleToggle,
  selectViewPanel,
  selectTempType,
}: toggleButtonPros) => {
  return (
    <div className="toggle-container">
      <input
        onClick={handleToggle}
        type="checkbox"
        className={clsx("toggle-container__button", {
          toggleActive: selectViewPanel || selectTempType,
        })}
      />
    </div>
  );
};

export default ToggleButton;
