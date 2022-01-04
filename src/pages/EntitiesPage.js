import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatEntitiesGirdData } from "../utils/formatEntitiesGirdData";
import { isEmpty } from "lodash";
import { useHistory } from "react-router-dom";
import { getEntities, updateEntitiesInfo } from "../slices/entitiesReducer";
import DataGrid from "../components/DataGrid/DataGrid";
import ShearchBar from "../components/ShearchBar/ShearchBar";

const EntitiesPage = () => {
  const dispatch = useDispatch();
  const entities = useSelector((store) => store.entity.byId);
  const nbEntities = useSelector((store) => store.entity.nbMax);

  const [skip, setSkip] = useState(0);
  const history = useHistory();

  useEffect(() => {
    dispatch(getEntities(10, skip));
  }, [dispatch, skip]);

  const handleEntityRowsChange = useCallback(
    (entity) => {
      if (!isEmpty(entity)) dispatch(updateEntitiesInfo(entity));
    },
    [dispatch]
  );

  const exploreEntity = (id) => {
    history.push(`/entities/${id}`);
  };

  if (!isEmpty(entities)) {
    return (
      <>
        <ShearchBar />
        <DataGrid
          data={formatEntitiesGirdData(entities, {
            exploreEntity,
          })}
          paginationSkip={setSkip}
          maxRow={nbEntities}
          handleEditRowsModelChange={handleEntityRowsChange}
        />
      </>
    );
  }
  return null;
};

export default EntitiesPage;
