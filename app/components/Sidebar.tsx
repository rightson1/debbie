"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { menuType, openProps } from "@/types";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import {
  Avatar,
  Box,
  Button,
  Chip,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CelebrationIcon from "@mui/icons-material/Celebration";
import HomeIcon from "@mui/icons-material/Home";
import { useGlobalTheme } from "@/utils/themeContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "@/utils/AuthContext";
import BallotIcon from "@mui/icons-material/Ballot";
import DownloadIcon from "@mui/icons-material/Download";
const drawerWidth = "220px";

export default function Sidebar({
  open,
  setOpen,
  userType,
}: openProps & {
  userType: "admin" | "user";
}) {
  const theme = useTheme();
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();
  const [active, setActive] = React.useState("/");
  const { user } = useAuth();
  const [isInstallable, setIsInstallable] = React.useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [isAppInstalled, setIsAppInstalled] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if the app is already installed
    window.addEventListener("appinstalled", () => {
      setIsAppInstalled(true);
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleClick = () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }

      // Clear the saved prompt since it can't be used again
      setDeferredPrompt(null);
      setIsInstallable(false);
    });
  };

  React.useEffect(() => {
    setOpen(false);
    setActive(pathname);
  }, [pathname]);

  const menu: menuType[] =
    userType === "admin"
      ? [
          {
            name: "Pages",
            links: [
              {
                name: "Home",
                icon: <HomeIcon />,
                link: "/admin",
                active: active === "/admin",
              },
            ],
          },
          {
            name: "General",
            links: [
              {
                name: "Voters",
                icon: <PeopleIcon />,
                info: `11`,
                link: "/admin/voters",
                active: active === "/admin/voters",
              },
              {
                name: "Candidates",
                icon: <CelebrationIcon />,
                info: `44`,
                link: "/admin/candidates",
                active: active === "/admin/candidates",
              },
              {
                name: "Positions",
                icon: <BallotIcon />,
                info: `44`,
                link: "/admin/positions",
                active: active === "/admin/positions",
              },
            ],
          },
          {
            name: "Forms and results",
            links: [
              {
                name: "Results",
                icon: <CelebrationIcon />,
                info: `44`,
                link: "/admin/results",
                active: active === "/admin/results",
              },
            ],
          },
        ]
      : [
          {
            name: "Pages",
            links: [
              {
                name: "Home",
                icon: <HomeIcon />,
                link: "/voter",
                active: active === "/voter",
              },
            ],
          },
          {
            name: "General",
            links: [
              {
                name: "Voters",
                icon: <PeopleIcon />,
                info: `11`,
                link: "/voter/voters",
                active: active === "/voter/voters",
              },
              {
                name: "Candidates",
                icon: <CelebrationIcon />,
                info: `44`,
                link: "/voter/candidates",
                active: active === "/voter/candidates",
              },
            ],
          },
          {
            name: "Voting",
            links: [
              {
                name: "Vote",
                icon: <HowToVoteIcon />,
                info: `44`,
                link: "/voter/vote",
                active: active === "/voter/vote",
              },
            ],
          },
        ];

  const DesktopDrawer = ({ children }: { children: React.ReactNode }) => {
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {children}
      </Drawer>
    );
  };
  const DrawerContent = () => {
    return (
      <>
        <Box className="pt-10 flex justify-center items-center flex-col gap-3">
          <Avatar src={"/user.jpg"} />
          <Typography color={colors.indigo[500]} variant="h3">
            {user?.displayName || "User"}
          </Typography>
          <Typography>
            {
              <Chip
                label={userType === "admin" ? "Admin" : "Voter"}
                color="primary"
              />
            }
          </Typography>
        </Box>
        <Divider />
        {menu.map((item, index) => (
          <div key={index} className="">
            <List disablePadding>
              <ListItem>
                <ListItemText primary={item.name} />
              </ListItem>
            </List>
            <List disablePadding>
              {item.links.map((text, index) => {
                return (
                  <MenuItem
                    onClick={() => router.push(text.link)}
                    className="cursor-pointer"
                    // className="w-full fb px-4 py-1 cursor-pointer transition-all duration-300 ease-in-out"
                    sx={{
                      "&:hover": {
                        bgcolor: `${colors.active} !important`,
                      },
                      backgroundColor: `${
                        active === text.link ? colors.active : colors.surface
                      } !important`,
                      display: "flex !important",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 2,
                      py: 1,
                      width: "100%",
                    }}
                    key={text.name}
                  >
                    <Button disableRipple startIcon={text.icon}>
                      {text.name}
                    </Button>
                  </MenuItem>
                );
              })}
              {isInstallable && (
                <MenuItem
                  className="cursor-pointer"
                  // className="w-full fb px-4 py-1 cursor-pointer transition-all duration-300 ease-in-out"
                  sx={{
                    "&:hover": {
                      bgcolor: `${colors.active} !important`,
                    },
                    backgroundColor: `${colors.surface} !important`,
                    display: "flex !important",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    py: 1,
                    width: "100%",
                  }}
                >
                  <Button disableRipple startIcon={<DownloadIcon />}>
                    Download App
                  </Button>
                </MenuItem>
              )}
            </List>
            <Divider />
          </div>
        ))}
      </>
    );
  };
  return screenWidth ? (
    <DesktopDrawer>
      <DrawerContent />
    </DesktopDrawer>
  ) : (
    <Drawer
      open={open}
      anchor="left"
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <DrawerContent />
    </Drawer>
  );
}
