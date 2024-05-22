"use client";
import Grid from "@mui/material/Grid";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import UserStat from "@/components/homepage/UserStat";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import CustomGrid from "@/components/utils/CustomGrid";
import { pieData, sampleCandidates } from "@/constants";
import CustomPie from "@/components/utils/CustomPie";
import { useAuth } from "@/utils/AuthContext";
import { useGetCandidates } from "@/utils/hooks/useCandidates";
import { useRouter } from "next/navigation";
import Settings from "../Settings";
import Results from "../utils/Results";

const Admin = () => {
  const { colors } = useGlobalTheme();
  const { user } = useAuth();
  const { data: candidates, isLoading } = useGetCandidates();
  const columns: GridColDef[] = [
    {
      field: "displayName",
      headerName: "Name",
      width: 150,
      valueGetter: (params) => {
        return params.row.user?.displayName;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: (params) => {
        return params.row.user?.email;
      },
    },
    {
      field: "position",
      headerName: "Position",
      width: 150,
      renderCell: (params) => {
        return (
          <Box>
            <Typography>{params.row.position.name}</Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box p={1}>
      <Box
        className="flex justify-between items-center gap-2 py-0 lg:h-[200px]"
        sx={{
          flexDirection: {
            xs: "column",
            lg: "row",
          },
        }}
      >
        <UserStat />
      </Box>
      <Grid container mt={1}>
        <Grid
          py={{
            xs: 1,
            md: 0,
          }}
          item
          xs={12}
          md={6}
          className="flex items-center justify-center "
        >
          <Box bgcolor={colors.card} p={2} className="w-full h-full">
            {user.admin ? <Settings /> : <Results voter={true} />}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          pl={{
            xs: 0,
            md: 1,
          }}
        >
          <CustomGrid
            columns={columns}
            rows={candidates || []}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
