import {
  CardContent,
  CardHeader,
  IconButton,
  TextField,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { PlaceType, StepType } from "../../../types";
import { reorder } from "../../../utils/helpers";
import { useStepStyles } from "../style";
import DraggableLIstItem from "./DraggableItem";
import clsx from "clsx";
import StepsInput from "../StepsInput";

type SettingStepProps = {
  handleStepName: (text: StepType) => void;
};

export default function SettingStep({
  handleStepName,
}: SettingStepProps): JSX.Element {
  const classes = useStepStyles();
  const [placeName, setPlaceName] = useState("");
  const [places, setpPlaces] = useState<PlaceType[]>(() => {
    const savedPlaces = localStorage.getItem("places");

    if (savedPlaces) {
      return JSON.parse(savedPlaces);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places));
  }, [places]);

  const handlePlaceName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPlaceName(value);
  };

  const addToplaces = () => {
    if (placeName.trim()) {
      setpPlaces((prev) => [
        ...prev,
        { name: placeName, id: new Date().getTime() },
      ]);
      setPlaceName("");
    }
  };

  const deleteFromplaces = (id: number) => {
    setpPlaces((prev) => prev.filter((el) => el.id !== id));
  };

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const newPlaceList = reorder(
        places,
        result.source.index,
        result.destination.index,
      );

      setpPlaces(newPlaceList);
    },
    [places],
  );

  return (
    <>
      <CardHeader
        onClick={() => handleStepName("APP")}
        action={
          <IconButton aria-label="Back">
            <ClearIcon />
          </IconButton>
        }
        title="Settings"
      />
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" type="PLACE">
            {(dropProvided, dropSnapshot) => (
              <div
                ref={dropProvided.innerRef}
                className={clsx(classes.list, {
                  [classes.list_dropping]: dropSnapshot.isDraggingOver,
                })}
                {...dropProvided.droppableProps}
              >
                {places.map((place, i) => (
                  <DraggableLIstItem
                    key={place.id}
                    place={place}
                    index={i}
                    deleteFromplaces={deleteFromplaces}
                  />
                ))}

                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <StepsInput
          value={placeName}
          onChange={handlePlaceName}
          label="Add Location"
          onClick={addToplaces}
        />
      </CardContent>
    </>
  );
}
