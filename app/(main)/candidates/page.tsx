"use client";
import * as React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import { GridColDef } from "@mui/x-data-grid";
import { format } from "timeago.js";
import CustomGrid from "@/components/utils/CustomGrid";
import Image from "next/image";
import { Avatar } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditCandidate from "@/components/EditCandidate";
import NewCandidate from "@/components/NewCandidate";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const CandidatesPage = () => {
  const { data: candidates, isLoading } = useGetCandidates();
  const { colors } = useGlobalTheme();
  const { mutateAsync: deleteCandidate } = useDeleteCandidate();
  const [candidate, setCandidate] = React.useState<CandidateFetched | null>(
    null
  );
  const [open, setOpen] = React.useState(false);

  const onDelete = async (id: string) => {
    customToast({
      userFunction: async () => {
        candidate && (await deleteFile(candidate?.photo));
        await deleteCandidate(id);
      },
      successMessage: "Candidate deleted successfully",
      errorMessage: "Candidate could not be deleted",
    });
  };
  const columns: GridColDef[] = [
    {
      field: "user",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <Box className="flex justify-center items-center gap-4">
          <Avatar src={params.row.photo} alt={params.row.user.displayName} />
          <Typography variant="h6">{params.row.user.displayName}</Typography>
        </Box>
      ),
    },
    {
      field: "position",
      headerName: "Position",

      renderCell: (params) => {
        return <Typography>{params.row.position.name}</Typography>;
      },
    },
    {
      field: "Joined",
      headerName: "Joined",
      width: 200,
      valueGetter: (params) => format(params.row.createdAt),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box className="flex justify-center items-center gap-4">
          {/* icon button for delte and edit, dont use more */}
          <IconButton
            onClick={() => {
              onDelete(params.row._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setCandidate(params.row);
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <Box
      m={2}
      pt={{
        xs: 0,
        lg: 0.6,
      }}
    >
      <EditModal candidate={candidate} setCandidate={setCandidate} />
      <div className="flex justify-between items-center">
        <Box my={2} className="space-y-2">
          <Typography variant="h3">Candidates Grid</Typography>
          <Typography variant="h5" color={colors.indigo[500]}>
            Home
            <ChevronRightIcon
              sx={{
                color: colors.indigo[500],
              }}
            />
            Candidates
          </Typography>
        </Box>
        <Box ml="auto">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add Candidate
          </Button>
          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <DialogTitle>Candidate</DialogTitle>
            <DialogContent>
              <Box className="w-[90vw] md:w-[50vw]">
                <NewCandidate />
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </div>
      <CustomGrid columns={columns} rows={candidates} isLoading={isLoading} />
    </Box>
  );
};

export const EditModal = ({
  candidate,
  setCandidate,
}: {
  candidate: CandidateFetched | null;
  setCandidate: React.Dispatch<React.SetStateAction<CandidateFetched | null>>;
}) => {
  if (!candidate) return null;
  return (
    <Dialog
      open={!!candidate}
      onClose={() => {
        setCandidate(null);
      }}
    >
      <DialogTitle>Candidate</DialogTitle>
      <DialogContent>
        <EditCandidate id={candidate._id} />
      </DialogContent>
    </Dialog>
  );
};

export default CandidatesPage;
