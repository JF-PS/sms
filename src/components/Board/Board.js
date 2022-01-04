import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { getEntitySection, updateElements } from "../../slices/sectionsReducer";
import { formatDraggableData } from "../../utils/formatDraggableData";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

const Board = ({ entityId, arraySectionsId, elementType }) => {
  const [columns, setColumns] = useState({});
  const sections = useSelector((store) => store.section.byId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntitySection(entityId, elementType));
  }, [dispatch, entityId, elementType]);

  useEffect(() => {
    if (!isEmpty(sections)) {
      /*
       * each column has to have a unique id, each item has to
       * have a unique id and ideally consecutive else funky things happen
       * each droppable has to have a unique id, each draggable also.
       */
      if (arraySectionsId) {
        setColumns((current) => {
          return formatDraggableData(
            arraySectionsId,
            sections,
            elementType,
            current
          );
        });
      }
    }
  }, [sections, arraySectionsId, elementType]);

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      console.log(start);
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      dispatch(updateElements(newCol.id, newCol.list));

      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      // Update the state
      dispatch(
        updateElements(
          newEndCol.id,
          newEndCol.list,
          newStartCol.id,
          start.list[source.index]
        )
      );

      return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container direction={"row"}>
        {Object.values(columns).map((column, index) => {
          return (
            <Grid item key={index}>
              <Column column={column} key={column.id} />
            </Grid>
          );
        })}
      </Grid>
    </DragDropContext>
  );
};

export default Board;
