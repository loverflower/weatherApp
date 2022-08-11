import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CardGraphType } from "../../../../types/commonTypes";
import "./styles.scss";

const Graph = ({ graphOptions }: CardGraphType) => (
  <HighchartsReact highcharts={Highcharts} options={graphOptions} />
);
export default Graph;
