"use client";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useGetPositions } from "@/utils/hooks/usePosition";
import { useGlobalTheme } from "@/utils/themeContext";
import { useGetVotes } from "@/utils/hooks/useVotes";
import CustomPie from "@/components/utils/CustomPie";

const Settings = () => {
  const { data: positions } = useGetPositions();
  const [position, setPosition] = useState<string>("");
  const { colors } = useGlobalTheme();
  const { data: votes, refetch, isLoading } = useGetVotes(position);
  useEffect(() => {
    refetch();
  }, [positions]);
  return (
    <Box component={"form"} m={2} bgcolor={colors.surface} p={2}>
      <div className="flex justify-between items-center">
        <Typography variant="h5">Results</Typography>
      </div>
      <Box mt={2} className="flex flex-col gap-5">
        <FormControl fullWidth>
          <FormLabel>Select Position to see results</FormLabel>
          <Select
            value={position}
            onChange={(e) => setPosition(e.target.value as string)}
          >
            {positions?.map((pos) => (
              <MenuItem key={pos._id} value={pos._id}>
                {pos.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box className="flex justify-center items-center">
          {position &&
            (votes ? (
              <CustomPie pieData={votes} />
            ) : isLoading ? (
              <Typography variant="h6">Loading...</Typography>
            ) : (
              <Typography variant="h6">No votes yet</Typography>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
