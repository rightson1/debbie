import * as React from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
export default function CustomGrid({
  columns,
  rows,
  isLoading,
}: {
  columns: GridColDef[];
  rows?: GridRowsProp;
  isLoading?: boolean;
}) {
  const { colors } = useGlobalTheme();
  const borderString = `1px solid ${colors.active} !important`;
  return (
    <Box
      height="75vh"
      width={"full"}
      sx={{
        bgcolor: colors.surface,

        "& .MuiDataGrid-root": {
          border: "none",

          width: "full",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: borderString,
        },

        "& .MuiDataGrid-toolbarContainer": {
          bgcolor: colors.card + " !important",
          borderBottom: borderString,
        },
        "& .MuiDataGrid-columnHeaders": {
          bgcolor: colors.card + " !important",
          borderBottom: borderString,
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.surface + " !important",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: borderString,
          bgcolor: colors.card + " !important",
        },
        "& .MuiCheckbox-root": {
          color: `${colors.indigo[200]} !important`,
        },

        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          // color: ` ${colors.grey[100]} !important`,
        },
      }}
    >
      <DataGrid
        rows={rows || []}
        getRowId={(row) => row._id || row.id}
        columns={columns}
        // getRowId={(row) => row._id}
        loading={isLoading || rows?.length === 0}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
