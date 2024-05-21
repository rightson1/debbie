"use client";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  useAddSettings,
  useGetSettings,
  useUpdateSettings,
} from "@/utils/hooks/useSettings";
import { customToast } from "@/components/helpers/functions";
import { ElectionStatus } from "@/types";

const Console = () => {
  const { colors } = useGlobalTheme();
  const { mutateAsync: addSettings } = useAddSettings();
  const { mutateAsync: editSettings } = useUpdateSettings();
  const { data: settings } = useGetSettings();

  const [electionStatus, setElectionStatus] =
    useState<ElectionStatus>("closed");
  useEffect(() => {
    if (settings) {
      setElectionStatus(settings.electionStatus);
    }
  }, [settings]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateSettings = async () => {
      if (!settings) {
        await addSettings({ electionStatus });
      } else {
        await editSettings({ electionStatus });
      }
    };
    customToast({
      userFunction: updateSettings,
      successMessage: "Settings updated successfully",
    });
  };
  return (
    <Box
      m={1}
      bgcolor={colors.surface}
      p={1}
      mb={20}
      onSubmit={submit}
      component={"form"}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Settings</Typography>
      </div>
      <Box mt={2} className="flex flex-col gap-5">
        <FormControl fullWidth>
          <FormLabel>Election Status</FormLabel>
          <Select
            value={electionStatus}
            onChange={(e) =>
              setElectionStatus(e.target.value as ElectionStatus)
            }
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </FormControl>

        <div className="w-full flex justify-end">
          <Button variant="contained" type="submit" startIcon={<AddIcon />}>
            Save
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default Console;
