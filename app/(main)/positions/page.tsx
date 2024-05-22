"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import { format } from "timeago.js";
import CustomGrid from "@/components/utils/CustomGrid";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useGlobalTheme } from "@/utils/themeContext";
import { IPositionFetched } from "@/types";
import {
  useAddPosition,
  useDeletePosition,
  useGetPositions,
  useUpdatePosition,
} from "@/utils/hooks/usePosition";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { customToast } from "@/components/helpers/functions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const Page = () => {
  const { data, isLoading } = useGetPositions();
  const { colors } = useGlobalTheme();
  const { mutateAsync: deletePosition } = useDeletePosition();
  const [open, setOpen] = useState(false);
  const [position, setPositions] = useState<IPositionFetched | null>(null);
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },

    {
      field: "Added on",
      headerName: "Added on",
      width: 200,
      valueGetter: (params) => format(params.row.createdAt),
    },
    // edit
    {
      field: "edit",
      headerName: "Actions",
      width: 200,
      renderCell: ({ row }) => (
        <>
          <IconButton
            onClick={() => {
              setPositions(row as IPositionFetched);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              customToast({
                userFunction: async () => {
                  await deletePosition(row._id);
                },
              });
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </>
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
      <div className="flex items-center justify-between gap-3">
        <Box my={2} className="space-y-2">
          <Typography variant="h3">Positions Grid</Typography>
          <Typography variant="h5" color={colors.indigo[500]}>
            Home
            <ChevronRightIcon
              sx={{
                color: colors.indigo[500],
              }}
            />
            Positions
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Position
        </Button>
      </div>
      <EditModal setPosition={setPositions} position={position} />
      <AddPositionModal open={open} setOpen={setOpen} />
      <CustomGrid columns={columns} rows={data} isLoading={isLoading} />
    </Box>
  );
};

const EditModal = ({
  position,
  setPosition,
}: {
  position: IPositionFetched | null;
  setPosition: React.Dispatch<React.SetStateAction<IPositionFetched | null>>;
}) => {
  const { mutateAsync: editPosition } = useUpdatePosition();
  const [name, setName] = useState(position?.name || "");
  useEffect(() => {
    if (!position) return;
    setName(position.name);
  }, [position]);
  if (!position) return null;

  return (
    <Dialog
      open={!!position}
      onClose={() => {
        setPosition(null);
      }}
    >
      <DialogTitle>Position</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <FormLabel>Name</FormLabel>
          <TextField
            label="name"
            variant="outlined"
            size="small"
            color="primary"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            customToast({
              userFunction: async () => {
                await editPosition({ ...position, name });
                setPosition(null);
              },
            });
          }}
        >
          <EditIcon />
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const AddPositionModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutateAsync: addPosition } = useAddPosition();
  const [name, setName] = useState("");

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle>Position</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <FormLabel>Name</FormLabel>
          <TextField
            label="name"
            variant="outlined"
            size="small"
            color="primary"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            customToast({
              userFunction: async () => {
                await addPosition({ name });
                setOpen(false);
              },
            });
          }}
        >
          <SaveIcon />
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Page;
