import { isEmpty } from "lodash";
import * as React from "react";
import Icones from "../components/Icones/Icones";
import { GridActionsCellItem } from "@mui/x-data-grid";

export const formatEntitiesGirdData = (entities, actions) => {
  if (isEmpty(entities)) return null;

  const rows = Object.values(entities).map((value) => ({
    id: value.id,
    name: value.name,
    labels: value.labels && value.labels.value ? value.labels.value : "",
    descriptions:
      value.descriptions && value.descriptions.value
        ? value.descriptions.value.substring(0, 40)
        : "",
  }));

  const columns = [
    {
      field: "id",
      hide: false,
      width: 100,
      headerAlign: "center",
    },

    {
      field: "actions",
      type: "actions",
      headerName: "actions",
      width: 200,
      sortable: false,
      align: "center",
      headerAlign: "center",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icones iconeName="VisibilityIcon" />}
          label="view"
          onClick={() => actions.exploreEntity(params.id)}
        />,
      ],
    },
    {
      field: "name",
      headerName: "name",
      flex: 1,
      editable: true,
      headerAlign: "center",
    },
    {
      field: "labels",
      headerName: "labels",
      flex: 1,
      editable: true,
      headerAlign: "center",
    },
    {
      field: "descriptions",
      headerName: "descriptions",
      flex: 1,
      editable: true,
      headerAlign: "center",
    },
  ];

  return { columns, rows };
};
