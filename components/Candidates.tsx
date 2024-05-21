"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import {
  useDeleteCandidate,
  useGetCandidates,
} from "@/utils/hooks/useCandidates";
import { useAuth } from "@/utils/AuthContext";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { customToast, deleteFile } from "@/components/helpers/functions";
import { CandidateFetched } from "@/types";
import Modal from "@mui/material/Modal";
import { useGlobalTheme } from "@/utils/themeContext";
import { Prose } from "@/components/utils/Prose";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const Candidates = () => {
  const { data: candidates } = useGetCandidates();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const [modalOpen, setModalOpen] = React.useState(false);
  const { colors } = useGlobalTheme();
  const [filteredCandidates, setFilteredCandidates] = React.useState(
    candidates || []
  );
  React.useEffect(() => {
    setFilteredCandidates(candidates || []);
  }, [candidates]);

  const { mutateAsync: deleteCandidate } = useDeleteCandidate();
  const [candidate, setCandidate] = React.useState<CandidateFetched | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onDelete = async (id: string) => {
    customToast({
      userFunction: async () => {
        candidate && (await deleteFile(candidate?.photo));
        await deleteCandidate(id);
      },
      successMessage: "Candidate deleted successfully",
      errorMessage: "Candidate could not be deleted",
      successFunc: () => {
        setCandidate(null);
        handleClose();
        setAnchorEl(null);
      },
    });
  };

  return (
    <Box>
      <Box m={1} className="flex justify-between items-center gap-10 ">
        <Typography variant="h4">Candidates</Typography>

        <Box className="flex gap-1 items-center">
          <SearchIcon />
          <InputBase
            placeholder="Search...."
            onChange={(e) => {
              if (!candidates) return;
              const filtered = candidates.filter(
                (item) =>
                  item.user.displayName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                  item.position
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
              );
              setFilteredCandidates(filtered);
            }}
          />
        </Box>
      </Box>
      <Grid container>
        {filteredCandidates?.map((candidate) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={candidate._id} p={1}>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem
                  onClick={() => {
                    router.push(`/candidates/edit/${candidate._id}`);
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setCandidate(candidate);
                    onDelete(candidate._id);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
              <Card
                onClick={() => {
                  setCandidate(candidate);
                  setModalOpen(true);
                }}
                className="cursor-pointer"
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }}>
                      {candidate.user?.displayName?.split("")[0].toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(e);
                      }}
                      aria-label="settings"
                      disabled={!user.admin}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={candidate.user?.displayName}
                  subheader={candidate.position}
                />
                <CardMedia
                  component="img"
                  height="194"
                  className="overflow-hidden h-[250px] lg:h-[194px]"
                  image={candidate.photo}
                  alt={candidate.user?.displayName}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {candidate.bio.slice(0, 100)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setCandidate(null);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className="
          absolute top-1/2 left-1/2 transform -translate-x-1/2
           -translate-y-1/2 p-4 w-[90vw] md:w-[70vw] lg:w-[50vw] 
            max-h-[90vh] overflow-y-auto
          "
          >
            <Box
              borderRadius={1}
              bgcolor={colors.surface}
              className="overflow-hidden"
            >
              <Box p={1} className="space-y-3">
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="space-y-2">
                    <Avatar
                      alt={candidate?.user.displayName}
                      src={candidate?.photo}
                    />
                    <Chip
                      label={candidate?.position}
                      color="secondary"
                      size="small"
                    />
                  </div>

                  <Typography
                    variant="caption"
                    className="ml-2"
                    color="text.secondary"
                  >
                    {candidate?.user.displayName}
                  </Typography>
                </div>
                {/* <Box className="flex w-full justify-between">
                  <Socials
                    _id={post._id}
                    type="post"
                    owner={post.userId}
                    likes={post.likes}
                  />
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Box> */}
                <Typography variant="h5">
                  {candidate?.user.displayName}
                </Typography>

                <Box
                  className="h-[1px]"
                  bgcolor={colors.indigo[300]}
                  borderRadius={1}
                  width={"100%"}
                ></Box>
                <Typography variant="h6">Description</Typography>
                <Typography variant="body2">
                  {candidate?.story && (
                    <Prose>
                      <div
                        dangerouslySetInnerHTML={{ __html: candidate?.story }}
                      />
                    </Prose>
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </Box>
  );
};

export default Candidates;
