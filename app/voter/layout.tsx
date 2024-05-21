"use client";
import React, { useEffect, useState } from "react";
import { childrenProps, menuType } from "@/types";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useGlobalTheme } from "@/utils/themeContext";
import Box from "@mui/material/Box";
import BottomBar from "../components/BottomBar";
import { useAuth } from "@/utils/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import UserRight from "../components/UserRight";
import { useGetNotifications } from "@/utils/hooks/useNotifications";

const Layout = ({ children }: childrenProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));
  const { colors } = useGlobalTheme();
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    const data = localStorage.getItem("path");
    setLoaded(true);
  }, []);
  const { admin, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!admin) {
      localStorage.setItem("path", pathname);
      router.push("/voter-login");
    }
  }, [admin, pathname, router, user]);
  const { data: notifications } = useGetNotifications(user?._id);
  if (!user) {
    return (
      <Box className="flex items-center justify-center w-screen h-screen">
        <div className="loading-container">
          <div className="loading"></div>
          <div id="loading-text">loading</div>
        </div>
      </Box>
    );
  }
  return (
    <Box>
      <Sidebar {...{ open, setOpen, userType: "user" }} />
      <Navbar
        {...{ open, setOpen, notifications: notifications?.length || 0 }}
      />
      <Box
        sx={{
          mt: "70px",
          ml: screenWidth ? "220px" : 0,
          mr: screenWidth ? "240px" : 0,
        }}
      >
        {children}
      </Box>
      <Rightbar />
    </Box>
  );
};

export default Layout;
