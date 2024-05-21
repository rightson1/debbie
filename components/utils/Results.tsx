"use client";
import { useGetVotes } from "@/utils/hooks/useVotes";
import React, { useMemo } from "react";
import { useGlobalTheme } from "@/utils/themeContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomPie from "@/components/utils/CustomPie";
import { positionsType } from "@/types";
const Results = ({ post, title }: { post: positionsType; title: string }) => {
  const { data: votes } = useGetVotes();
  const { colors } = useGlobalTheme();
  const missRiaraVotes = useMemo(() => {
    return votes?.filter((vote) => vote.post === post);
  }, [votes]);

  return (
    <Box
      className="items-center flex-center
             h-[90vh] flex-col justify-center p-4 overflow-hidden "
      bgcolor={colors.card}
      p={1}
      m={1}
      py={2}
      sx={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" color="skyblue">
        {title}
      </Typography>
      <CustomPie pieData={missRiaraVotes || []} />
    </Box>
  );
};

export default Results;
