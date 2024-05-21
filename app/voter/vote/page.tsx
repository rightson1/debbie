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
import { Vote, positionsType } from "@/types";
import { useAuth } from "@/utils/AuthContext";
import { useAddVote, useVoted } from "@/utils/hooks/useVotes";
import { useGetSettings } from "@/utils/hooks/useSettings";
const Console = () => {
  const { colors } = useGlobalTheme();
  const { data: candidates, isLoading } = useGetCandidates();
  const { mutateAsync: addVote, isPending } = useAddVote();
  const { user } = useAuth();
  const { data: voted, isLoading: loading } = useVoted(user._id);
  const { data: settings } = useGetSettings();

  const missRiaraCandidates =
    useMemo(
      () => candidates?.filter((voter) => voter.position === "Miss Riara"),
      [candidates]
    ) || [];
  const mrRiaraCandidates =
    useMemo(
      () => candidates?.filter((voter) => voter.position === "Mr Riara"),
      [candidates]
    ) || [];
  console.log(settings);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (settings?.electionStatus === "closed") {
      return toast.error("Voting is closed");
    }
    if (voted) return toast.error("You have already voted");

    const missRiara = e.currentTarget.missRiara.value;
    const mrRiara = e.currentTarget.mrRiara.value;

    const missRiaraCandidateUserId = missRiaraCandidates.find(
      (candidate) => candidate._id === missRiara
    )?.user._id;

    const mrRiaraCandidateUserId = mrRiaraCandidates.find(
      (candidate) => candidate._id === mrRiara
    )?.user._id;
    if (missRiaraCandidateUserId && mrRiaraCandidateUserId) {
      const missRiaraVote: Vote = {
        candidateId: missRiara,
        candidateUserId: missRiaraCandidateUserId,
        post: "Miss Riara",
        voterId: user?._id,
      };
      const mrRiaraVote: Vote = {
        candidateId: mrRiara,
        candidateUserId: mrRiaraCandidateUserId,
        post: "Mr Riara",
        voterId: user?._id,
      };
      const votes = [missRiaraVote, mrRiaraVote];
      const update = async () => {
        await addVote(votes);
      };
      customToast({
        userFunction: update,
        successMessage: "Voted successfully",
        errorMessage: "Failed to add candidate",
      });
    } else {
      toast.error("Please select a candidate");
    }
  };
  if (isLoading || loading) return <div>Loading...</div>;
  console.log(voted);
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
        <Typography variant="h5">Add Candidate</Typography>
      </div>
      <Box mt={2} className="flex flex-col gap-5">
        <FormControl fullWidth>
          <FormLabel>Mr Riara</FormLabel>
          <Select id="mrRiara" label="Candidate" name="mrRiara">
            {mrRiaraCandidates.map((candidate) => (
              <MenuItem value={candidate._id} key={candidate._id}>
                {candidate.user.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Miss Riara</FormLabel>
          <Select id="missRiara" label="Candidate" name="missRiara">
            {missRiaraCandidates.map((candidate) => (
              <MenuItem value={candidate._id} key={candidate._id}>
                {candidate.user.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

export default Console;
