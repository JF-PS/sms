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

const FieldPage = (data) => {
  const field = useSelector((store) => store.field.byId[data.match.params.id]);

  return <div></div>;
};

export default FieldPage;
