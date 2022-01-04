import React, { useState, useCallback } from "react";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { createSection } from "../../actions/sectionsActions";
import { updateEntitySections } from "../../actions/entitiesActions";
import useEntity from "../../hooks/useEntity";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Board from "../Board/Board";
import ItemField from "../Board/ItemField";
import Form from "../Form/Form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Popup from "../Popup/Popup";

const Entity = (data) => {
  const { entity, fieldsSections } = useEntity(data.match.params.id);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const sendValue = useCallback(
    (value) => {
      setOpen((current) => !current);
      if (!isEmpty(value)) {
        const newSection = dispatch(createSection(value));
        dispatch(
          updateEntitySections({
            sectionId: newSection.id,
            entityId: entity.id,
          })
        );
      }
    },
    [dispatch, entity]
  );

  const elementType = [
    {
      label: "Field",
      value: "Field",
    },
    {
      label: "Action",
      value: "Action",
    },
  ];

  const inputs = [
    {
      label: "Name",
      name: "name",
    },
    {
      label: "ElementType",
      name: "elementType",
      select: true,
      value: elementType,
    },
  ];

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Typography variant="h1">{!isEmpty(entity) && entity.name}</Typography>

      <Grid container spacing={2}>
        <Grid item>
          <Board
            // // parrent={entity}
            entityId={data.match.params.id}
            // initialColumns={fieldsSections}
            // itemRender={ItemField}
          />
        </Grid>
        <Grid item>
          <Button variant="text" onClick={() => setOpen((current) => !current)}>
            <AddCircleOutlineIcon
              fontSize={"large"}
              sx={{ color: "#A9A9A9" }}
            />
          </Button>
        </Grid>
      </Grid>

      <Popup open={open} title="Add Section">
        <Form inputs={inputs} sendForm={sendValue} />
      </Popup>
    </Box>
  );
};

export default Entity;
