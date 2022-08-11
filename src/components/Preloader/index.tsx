import clsx from "clsx";
import svgDay from "./../../svg/day.svg";
import "./styles.scss";
import { PreloaderType } from "./types";

const Preloader = ({ small }: PreloaderType) => (
  <div className={clsx("svg-container", { svgContainerSmall: small })}>
    <img className="svg-container__img" src={svgDay} alt="svg" />
  </div>
);
export default Preloader;
