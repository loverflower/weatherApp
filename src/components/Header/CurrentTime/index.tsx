import { useTime } from "../../../hooks/useTime";

const CurrentTime = () => {
  const currentTime = useTime();

  return <span>Local time: {currentTime}</span>;
};
export default CurrentTime;
