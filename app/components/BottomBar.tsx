import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import * as React from "react";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { usePathname, useRouter } from "next/navigation";

export default function BottomBar() {
  const [value, setValue] = React.useState("recents");
  const pathname = usePathname();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const router = useRouter();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: {
          xs: "block",
          sm: "none",
        },
      }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          onClick={() => router.push("/")}
          //   label="Home"
          value="home"
          icon={
            <HomeIcon
              sx={{
                color: pathname === "/" ? "secondary.main" : "text.main",
              }}
            />
          }
        />
        <BottomNavigationAction
          //   label="Communities"
          value="communities"
          onClick={() => router.push("/communities")}
          icon={
            <PeopleIcon
              sx={{
                color:
                  pathname === "/communities" ? "secondary.main" : "text.main",
              }}
            />
          }
        />
        <BottomNavigationAction
          //   label="Back"
          value="back"
          onClick={() => router.back()}
          icon={<ArrowBackIosIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
