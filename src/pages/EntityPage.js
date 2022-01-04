import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initSection } from "../slices/sectionsReducer";
import { isEmpty } from "lodash";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Board from "../components/Board/Board";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const EntityPage = (data) => {
  const [elementType, setElementType] = useState("Field");
  const dispatch = useDispatch();
  //useParams
  const entity = useSelector(
    (store) => store.entity.byId[data.match.params.id]
  );

  const handleChange = (event, newAlignment) => {
    setElementType(newAlignment);
  };

  const handleClick = () => {
    dispatch(initSection(entity.id, elementType));
  };

  return (
    <Box>
      <Grid container direction={"row"}>
        <Grid item>
          <Box
            sx={{
              backgroundColor: "#EBECF0",
              margin: 1,
              padding: 1,
              color: "#172B4D",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "30px !important",
                fontWeight: "800 !important",
                paddingBottom: "10px",
              }}
            >
              {!isEmpty(entity) ? entity.name : <Skeleton width="30%" />}
            </Typography>
            <Typography sx={{ paddingBottom: "10px" }}>
              {!isEmpty(entity) ? (
                entity.labels.value
              ) : (
                // <LinearProgress color="inherit" />
                <Skeleton width="15%" />
              )}
            </Typography>
            <Typography paragraph>
              {!isEmpty(entity) ? (
                entity.descriptions.value
              ) : (
                <Skeleton width="60%" />
              )}
            </Typography>
            <Divider />
            <ToggleButtonGroup
              color="primary"
              value={elementType}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="Field">Field</ToggleButton>
              <ToggleButton value="Action">Action</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid item>
          <Board
            entityId={data.match.params.id}
            elementType={elementType}
            arraySectionsId={!isEmpty(entity) && entity.sections}
          />
        </Grid>
      </Grid>

      <Fab
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
        }}
        aria-label={"Add"}
        color={"blue"}
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default EntityPage;
