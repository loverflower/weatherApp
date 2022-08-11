import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { API_URL_ICONS } from "../../../../configuration/config";
import { getTempType, toggleTemp } from "../../../../helpers/temperatureType";
import { getTransformTime } from "../../../../helpers/time";
import { CardGraphType } from "../../../../types/commonTypes";
import "./styles.scss";

const Card = ({ name, daily }: CardGraphType) => {
  const temperatureType = useSelector(
    (state: RootState) => state.typeOfTemp.toggleTemp
  );

  return (
    <div className="card-container">
      <div className="card-container__header">
        <h3 className="card-container__title">Forecast, 7 days: {name}</h3>
      </div>
      <div className="card-container__grid">
        {daily?.map((item, index: number) => (
          <div className="card-container__flex" key={index}>
            <span className="card-container__time">
              {getTransformTime(item.dt)}
            </span>
            <span>
              <img
                className="card-container__img"
                src={`${API_URL_ICONS}${item.icon}@2x.png`}
                alt="icons"
              />
            </span>
            <span className="card-container__temperature">
              {toggleTemp(item.temp, temperatureType)}
              {getTempType(temperatureType)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
