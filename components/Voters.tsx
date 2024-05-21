"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import { format } from "timeago.js";
import CustomGrid from "@/components/utils/CustomGrid";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useGlobalTheme } from "@/utils/themeContext";
import { useGetVoters } from "@/utils/hooks/useUser";
const Voters = () => {
  const { data, isLoading } = useGetVoters();
  const { colors } = useGlobalTheme();
  const columns: GridColDef[] = [
    { field: "displayName", headerName: "Name", width: 200 },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },

    {
      field: "Joined",
      headerName: "Joined",
      width: 200,
      valueGetter: (params) => format(params.row.createdAt),
    },
  ];
  return (
    <Box
      m={2}
      pt={{
        xs: 0,
        lg: 0.6,
      }}
    >
      <Box my={2} className="space-y-2">
        <Typography variant="h3">Voters Grid</Typography>
        <Typography variant="h5" color={colors.indigo[500]}>
          Home
          <ChevronRightIcon
            sx={{
              color: colors.indigo[500],
            }}
          />
          Voters
        </Typography>
      </Box>
      <CustomGrid columns={columns} rows={data} isLoading={isLoading} />
    </Box>
  );
};

export default Voters;
