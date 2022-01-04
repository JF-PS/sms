import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { getItemSection } from "../../slices/sectionsReducer";
import { updateName, deleteSection } from "../../slices/sectionsReducer";
import { isEmpty } from "lodash";

import List from "@mui/material/List";
import ListItemCustom from "./ListItemCustom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";

const Column = ({ column }) => {
  const section = useSelector((store) => store.section.byId[column.id]);
  const [nameNotEditable, setNameNotEditable] = useState(false);
  const [columnName, setColumnName] = useState(section && section.name);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemSection(column.id));
  }, [column, dispatch]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        dispatch(updateName(column.id, columnName));
        setNameNotEditable(false);
      }
    },
    [dispatch, columnName, column]
  );

  const handleEditionClick = () => {
    setNameNotEditable((current) => !current);
  };

  const handleRemoveClick = () => {
    dispatch(deleteSection(section.entityId, column.id, section.elementType));
  };

  const handleChange = (event) => {
    setColumnName(event.target.value);
  };

  return (
    <>
      {column && column.list ? (
        <Box
          sx={{
            backgroundColor: "#EBECF0",
            margin: 1,
            padding: 1,
            color: "#172B4D",
            borderRadius: 2,

            "&:hover > div > div": {
              visibility: "visible",
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {nameNotEditable ? (
              <TextField
                id="standard-basic"
                label="Column Name"
                variant="standard"
                onChange={handleChange}
                autoFocus
                value={columnName}
                onKeyPress={handleKeyPress}
              />
            ) : (
              <Typography
                style={{ fontWeight: "bold" }}
                onClick={handleEditionClick}
              >
                {columnName}
              </Typography>
            )}

            {section &&
              section.name !== "fieldsRootSection" &&
              section.name !== "actionsRootSection" && (
                <Box
                  sx={{
                    visibility: "hidden",
                    textAlign: "right",
                  }}
                >
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={handleRemoveClick}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
          </Stack>

          <Droppable droppableId={column.id}>
            {(provided) => (
              <List ref={provided.innerRef}>
                {column &&
                  column.list &&
                  !isEmpty(column.list) &&
                  section &&
                  column.list.map((itemObject, index) => {
                    return (
                      <ListItemCustom
                        sectionId={section.id}
                        elementType={section.elementType}
                        index={index}
                        itemObject={itemObject}
                        key={index}
                        entityId={section.entityId}
                      />
                    );
                  })}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </Box>
      ) : (
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={118} />
        </Stack>
      )}
    </>
  );
};

export default Column;
