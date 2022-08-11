import clsx from "clsx";
import List from "../List";
import sprite from "../../svg/sprite.svg";
import { FilloutType } from "./types";

const Fillout = ({ bookedMarkedCities, showingFillOut }: FilloutType) => (
  <div
    className={clsx("fillout", "scroll", {
      fillout__active: showingFillOut,
    })}
  >
    <p className="fillout__title">Your favorite cities:</p>
    <ul className="fillout__order">
      {bookedMarkedCities?.map((item, number: number) => (
        <List key={number} city={item} />
      ))}
      {bookedMarkedCities.length === 0 && (
        <div className="fillout__box">
          <svg className="fillout__img">
            <use href={`${sprite}#icon-search`} />
          </svg>
          <p className="fillout__result">No result yet</p>
        </div>
      )}
    </ul>
  </div>
);

export default Fillout;
