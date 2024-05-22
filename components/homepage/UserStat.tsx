import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React from "react";
import { useGlobalTheme } from "../../utils/themeContext";
import Box from "@mui/material/Box";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import { useGetVoters } from "@/utils/hooks/useUser";
import { useGetCandidates } from "@/utils/hooks/useCandidates";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useGetPositions } from "@/utils/hooks/usePosition";
import PersonIcon from "@mui/icons-material/Person";
const UserStat = () => {
  const { colors } = useGlobalTheme();
  const { data: voters, isLoading } = useGetVoters();
  const { data: candidates } = useGetCandidates();
  const { data: positions } = useGetPositions();
  const Stat = ({
    icon,
    bgcolor,
    title,
    sub,
  }: {
    icon: React.ReactNode;
    bgcolor: string;
    title: string;
    sub: string;
  }) => {
    return (
      <Box
        p={4}
        className="flex flex-col items-start w-full h-full
        gap-2 start"
        bgcolor={colors.card}
      >
        <Fab
          sx={{
            bgcolor: bgcolor + "!important",
            zIndex: "10 !important",
          }}
          size="medium"
        >
          {icon}
        </Fab>
        <Typography variant="h4">{title}</Typography>
        <Typography
          sx={{
            fontSize: "15px",
            color: colors.active[100],
            fontWeight: 300,
          }}
        >
          {sub}
        </Typography>
      </Box>
    );
  };
  return (
    <Box
      className="h-full w-full flex gap-2
      flex-col md:flex-row 
       items-center "
    >
      <Stat
        icon={<HowToVoteIcon />}
        bgcolor={colors.indigo[500]}
        title={`${voters?.length || 0} Voters`}
        sub={
          "Registered Voters are those who have registered to vote in the election"
        }
      />
      <Stat
        icon={<HowToRegIcon />}
        bgcolor={colors.green[500]}
        title={`${candidates?.length || 0} Candidates`}
        sub={
          "Candidates are those who have registered to contest in the election"
        }
      />
      <Stat
        icon={<PersonIcon />}
        bgcolor={colors.red[500]}
        title={`${positions?.length || 0} Positions`}
        sub={
          "Positions are the roles that candidates are contesting for in the election"
        }
      />
    </Box>
  );
};

export default UserStat;
