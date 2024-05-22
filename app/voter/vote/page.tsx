"use client";
import { ReactElement, useMemo, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { customToast } from "@/components/helpers/functions";
import toast from "react-hot-toast";
import { useAddCandidate, useGetCandidates } from "@/utils/hooks/useCandidates";
import { IPositionFetched, Vote } from "@/types";
import { useAuth } from "@/utils/AuthContext";
import { useAddVote, useVoted } from "@/utils/hooks/useVotes";
import { useGetSettings } from "@/utils/hooks/useSettings";
import { useGetPositions } from "@/utils/hooks/usePosition";
import InputLabel from "@mui/material/InputLabel";

const VotePage = () => {
  const { colors } = useGlobalTheme();
  const { data: candidates, isLoading } = useGetCandidates();
  const { mutateAsync: addVote, isPending } = useAddVote();
  const { user } = useAuth();
  const { data: voted, isLoading: loading } = useVoted(user._id);
  const { data: settings } = useGetSettings();
  const { data: positions } = useGetPositions();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const votes: Vote[] = [];
    for (const [key, value] of formData.entries()) {
      votes.push({
        candidateId: value as string,
        position: key,
        voterId: user._id,
        candidateUserId: value as string,
      });
    }
    if (settings?.electionStatus === "closed") {
      return toast.error("Voting is closed");
    }
    if (voted) return toast.error("You have already voted");
    customToast({
      userFunction: async () => {
        await addVote(votes);
      },
      successMessage: "Vote added successfully",
    });
  };
  if (isLoading || loading) return <div>Loading...</div>;

  return (
    <Box
      m={1}
      bgcolor={colors.surface}
      p={1}
      mb={20}
      onSubmit={submit}
      component={"form"}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Vote</Typography>
      </div>
      {positions?.map((position: IPositionFetched) => {
        const canditatesInPosition = candidates?.filter(
          (candidate) => candidate.position._id === position._id
        );
        return (
          <FormControl fullWidth key={position._id}>
            <FormLabel id={position._id}>{position.name}</FormLabel>
            <Select
              labelId={position._id}
              id={position._id}
              label={position.name}
              name={position._id}
              required
            >
              {canditatesInPosition?.map((candidate) => {
                return (
                  <MenuItem value={candidate._id} key={candidate._id}>
                    {candidate.user.displayName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      })}
      <Box mt={2} className="flex flex-col gap-5">
        <div className="w-full flex justify-end">
          <Button
            variant="contained"
            type="submit"
            disabled={isPending}
            startIcon={<AddIcon />}
          >
            Vote
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default VotePage;
