import { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import EntityItem from "./EntityItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getEntities } from "../../actions/entitiesActions";

const Entities = () => {
  const dispatch = useDispatch();
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const myEntities = dispatch(getEntities(10, 0));
    myEntities.then((response) => {
      setEntities(response);
    });
  }, [dispatch]);

  useEffect(() => {
    console.log(entities);
  }, [entities]);

  return (
    <Box sx={{ width: "50%", margin: "auto" }}>
      <Typography variant="h1">Entities</Typography>
      <List>
        {!isEmpty(entities) &&
          entities.map((entity, index) => (
            <Fragment key={`Fragment${index}`}>
              <EntityItem
                key={`entityItem${index}`}
                enityId={entity.id}
                entityName={entity.name && entity.name}
                entityLabels={entity.labels && entity.labels}
              />
              <Divider component="li" key={`Divider${index}`} />
            </Fragment>
          ))}
      </List>
    </Box>
  );
};

export default Entities;
