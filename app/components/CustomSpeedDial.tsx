import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CampaignIcon from "@mui/icons-material/Campaign";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { useRouter } from "next/navigation";
import Person2Icon from "@mui/icons-material/Person2";
const actions = [
  {
    name: "New Candidate",
    icon: <Person2Icon />,
    info: "3",
    link: "/new-candidate",
  },
  {
    name: "New Notification",
    icon: <CampaignIcon />,
    info: "3",
    link: "/new-notification",
  },
];
export default function CustomSpeedDial() {
  const router = useRouter();
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      className="fixed bottom-[53px] md:bottom-5 right-3 md:right-[250px] z-[100000]"
      sx={{
        position: "fixed !important",
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          onClick={() => router.push(`${action.link}`)}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
