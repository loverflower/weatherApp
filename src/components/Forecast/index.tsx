import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Preloader from "../Preloader";
import { changeOrderForecastCityAction } from "../../redux/reducer";
import CardsGraphWrapper from "./CardsGraphWrapper";
import { DndParamObjType } from "./types";
import "./styles.scss";
import "./../../styles/scroll.scss";

const ForecastWrapper = () => {
  const dispatch = useAppDispatch();
  const forecastListOfCities = useSelector(
    (state: RootState) => state.forecastCities.cities
  );

  const isLoadingForecastData = useSelector(
    (state: RootState) => state.loadingData.isForecastUpload
  );

  const getDropResult = (event: DropResult) => {
    const dndParamObj: DndParamObjType = {
      source: event.source.index,
      destination: event.destination?.index,
    };
    dispatch(changeOrderForecastCityAction(dndParamObj));
  };

  return (
    <DragDropContext onDragEnd={getDropResult}>
      <Droppable droppableId="first">
        {(provided) => (
          <section
            className="forecast-wrapper scroll"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {forecastListOfCities.map((item, index) => (
              <Draggable index={index} draggableId={item.id} key={item.id}>
                {(provided) => (
                  <div
                    className="info-container"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <CardsGraphWrapper infoCities={item} key={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {isLoadingForecastData && <Preloader />}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default ForecastWrapper;
