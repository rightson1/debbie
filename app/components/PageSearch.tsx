import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { openProps } from "@/types";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "react";
import { ListItemButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
import { uselinks } from "@/components/helpers/functions";

export default function PageSearch({ open, setOpen }: openProps) {
  const handleOpen = () => setOpen(true);
  const { user } = useAuth();
  const links = uselinks(user);
  const [filteredLinks, setFilteredLinks] = useState(links);
  const [search, setSearch] = useState("");
  const handleClose = () => setOpen(false);

  const router = useRouter();

  useHotkeys("s", () => setOpen(true), [open]);
  React.useEffect(() => {
    if (!search) {
      setFilteredLinks(links);
      return;
    } else {
      setFilteredLinks(
        links.filter((link) =>
          link.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    }
  }, [search]);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Box sx={style} className="br w-[90%] sm:w-[500px] absolute">
        <Box className="flex flex-between items-center shadow-md p-2 w-full">
          <Box className="flex gap-1 items-center w-full">
            <SearchIcon />
            <InputBase
              placeholder="Search...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <Chip
            label="esc"
            variant="outlined"
            size="small"
            className="cursor-pointer"
            onClick={handleClose}
          />
        </Box>

        <List
          sx={{
            mt: 2,
            height: {
              xs: "40vh",
              sm: "200px",
            },
            overflow: "auto",
          }}
          subheader={
            <Typography variant="h6" component="div" className="p-2">
              Quick Page Links
            </Typography>
          }
        >
          {filteredLinks.map((link, index) => {
            return (
              <ListItemButton
                key={index}
                onClick={() => {
                  handleClose();
                  router.push(link.link);
                }}
              >
                <ListItemText primary={link.name} secondary={link.link} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 2,
};
