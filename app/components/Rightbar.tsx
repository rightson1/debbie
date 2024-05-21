import { useGlobalTheme } from "@/utils/themeContext";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
import { useGetCandidates } from "@/utils/hooks/useCandidates";
import toast from "react-hot-toast";
const UserRight = () => {
  const theme = useTheme();
  const { colors } = useGlobalTheme();
  const { user } = useAuth();
  const router = useRouter();
  const { data: candidates } = useGetCandidates();
  const isCandidate = candidates?.find(
    (candidate) => candidate.userId === user._id
  );
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));

  const drawerWidth = "240px";
  return (
    <Drawer
      variant={screenWidth ? "persistent" : "temporary"}
      anchor="right"
      open={screenWidth}
      sx={{
        width: screenWidth ? drawerWidth : 0,
        flexShrink: 0,
        // height: "100vh",
        // overflow: "hidden !important",
        "& .MuiDrawer-paper": {
          width: screenWidth ? drawerWidth : 240,
          boxSizing: "border-box",
          height: "100vh",
          overflow: "hidden !important",
        },
      }}
    >
      <div className="flex flex-col items-center gap-5 px-2 py-4 w-full justify-between">
        <div className="w-full flex  justify-between items-center">
          <Button variant="text">Profile</Button>
          <Button
            variant="contained"
            onClick={() => {
              isCandidate
                ? router.push("/voter/profile")
                : toast.error("You are not a candidate");
            }}
          >
            Edit
          </Button>
        </div>
        <div className="w-full flex flex-col items-center mt-2 items-center gap-1">
          <div className="flex flex-col items-center">
            <div className={`p-[9px] ring-[.5px] ring-[#005161] rounded-full`}>
              <div className={`p-[6px] ring-[1px] ring-[#005161] rounded-full`}>
                <div
                  className={`p-1 ring-[2px] ring-[#005161] rounded-full flex items-center justify-center w-[55px] h-[55px]`}
                >
                  <Avatar
                    sx={{
                      height: "50px",
                      width: "50px",
                    }}
                    src={"/user.jpg"}
                    className="shadow-md"
                  />
                </div>
              </div>
            </div>
            <Typography variant="h6" className="text-white">
              {user?.displayName}
            </Typography>
            <Typography variant="body2" className="text-white">
              {user.email}
            </Typography>
          </div>

          <Box
            py={2}
            px={0.1}
            className={`flex-col-start w-full `}
            sx={{
              borderRadius: 1,
            }}
          >
            <Typography variant="h5" pb={1}>
              Recent Candidates
            </Typography>
            <div className="flex flex-col gap-2 h-full overflow-auto">
              {candidates?.slice(0, 3).map((candidate, i) => (
                <Box
                  border={1}
                  borderColor={colors.active}
                  bgcolor={colors.surface}
                  key={i}
                  className="
              h-[220px]
              w-full p-1 overflow-hidden shadow -lg "
                >
                  <Box
                    src={candidate.photo}
                    className=" h-[180px] w-full  object-cover"
                    component="img"
                  />
                  <Typography variant="h5">
                    {candidate.user.displayName}
                  </Typography>
                </Box>
              ))}
            </div>
          </Box>
        </div>
      </div>
    </Drawer>
  );
};

export default UserRight;
