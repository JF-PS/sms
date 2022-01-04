import { useState, useCallback, useEffect } from "react";
import entityService from "../services/EntityService";

const useEntity = () => {
  const [entities, setEntities] = useState({
    columns: [{ field: "id", hide: true }],
    rows: [{ id: 0 }],
  });

  const formatGirdData = (entities) => {
    const rows = Object.values(entities).reduce((acc, value) => {
      acc[entities.indexOf(value)] = {
        id: value.id,
        name: value.name,
        labels: value.labels.singular.en ? value.labels.singular.en : "",
        descriptions: value.descriptions.en ? value.descriptions.en : "",
      };
      return acc;
    }, []);

    const columns = [
      {
        field: "id",
        hide: true,
      },
      {
        field: "name",
        headerName: "name",
        width: 200,
        editable: true,
      },
      {
        field: "labels",
        headerName: "labels",
        width: 200,
        editable: true,
      },
      {
        field: "descriptions",
        headerName: "descriptions",
        width: 1000,
        editable: true,
      },
    ];

    setEntities({ columns, rows });
  };

  const callEntities = useCallback(() => {
    entityService.getEntity().then((entities) => {
      formatGirdData(entities);
    });
  }, []);

  return { callEntities, entities };
};

export default useEntity;
