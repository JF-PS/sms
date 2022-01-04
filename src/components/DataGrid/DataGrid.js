import { DataGrid } from "@mui/x-data-grid";
import { isEmpty } from "lodash";
import Box from "@mui/material/Box";

const MyDataGrid = ({
  data,
  handleEditRowsModelChange,
  paginationSkip,
  maxRow,
}) => {
  const provisionalStyle = {
    "& MuiDataGrid-row.Mui-odd": {
      backgroundColor: "aliceblue",
    },
  };

  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
      }}
    >
      {!isEmpty(data) && (
        <DataGrid
          sx={provisionalStyle}
          rows={data.rows}
          columns={data.columns}
          pagination
          pageSize={10}
          // editRowsModel={editRowsModel}
          onEditRowsModelChange={handleEditRowsModelChange}
          rowCount={maxRow}
          paginationMode="client"
          onPageChange={(skip) => paginationSkip(skip * 10)}
        />
      )}
    </Box>
  );
};

export default MyDataGrid;
