import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { PlaceType } from "../../../types";
import { useStepStyles } from "../style";
import MenuIcon from "@material-ui/icons/Menu";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

type LIstItemProps = {
  place: PlaceType;
  deleteFromplaces: (id: number) => void;
  index: number;
};

export default function DraggableLIstItem({
  place,
  deleteFromplaces,
  index,
}: LIstItemProps): JSX.Element {
  const classes = useStepStyles();

  return (
    <Draggable draggableId={place.id.toString()} index={index}>
      {(daragProvided) => (
        <div
          ref={daragProvided.innerRef}
          {...daragProvided.draggableProps}
          className={classes.listItemWrapper}
        >
          <ListItem className={classes.listItem}>
            <ListItemIcon {...daragProvided.dragHandleProps}>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary={place.name} />
            <IconButton edge="end" onClick={() => deleteFromplaces(place.id)}>
              <DeleteForeverIcon />
            </IconButton>
          </ListItem>
        </div>
      )}
    </Draggable>
  );
}
