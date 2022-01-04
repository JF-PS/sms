import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Icones from "../Icones/Icones";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";

const EntityItem = ({ enityId, entityName, entityLabels }) => {
  const history = useHistory();
  // var entities = store.subscribe(() => store.getState().entitiesReducer);

  const handleClick = (id) => {
    history.push(`/entities/${id}`);
  };

  return (
    <ListItem
      onClick={() => handleClick(enityId)}
      alignItems="flex-start"
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="edit">
            <Icones iconeName="EditIcon" />
          </IconButton>
          <IconButton edge="end" aria-label="delete">
            <Icones iconeName="DeleteForeverIcon" />
          </IconButton>
        </>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <Icones iconeName="FolderIcon" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={entityName}
        secondary={entityLabels && entityLabels.fr && entityLabels.fr}
      />
    </ListItem>
  );
};

export default EntityItem;
