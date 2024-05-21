"use client";
import { ReactElement, useEffect, useMemo, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  customToast,
  deleteFile,
  uploadFile,
} from "@/components/helpers/functions";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useGetVoters } from "@/utils/hooks/useUser";
import { positions } from "@/constants";
import Editor from "@/app/components/Editor";
import { ImageField } from "@/components/utils/inputs";
import toast from "react-hot-toast";
import {
  useAddCandidate,
  useGetCandidate,
  useUpdateCandidate,
} from "@/utils/hooks/useCandidates";
import { positionsType } from "@/types";
import { useParams } from "next/navigation";
const EditCandidate = ({ id }: { id: string }) => {
  const { colors } = useGlobalTheme();
  const { data: voters, isLoading } = useGetVoters();
  const { mutateAsync: editCandidate, isPending } = useUpdateCandidate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { data: candidate } = useGetCandidate(id);
  const [editorValue, setEditorValue] = useState("");

  const [values, setValues] = useState({
    candidate: "",
    bio: "",
    position: "",
    story: "",
  });
  useEffect(() => {
    if (candidate) {
      setValues({
        candidate: candidate.user._id,
        bio: candidate.bio,
        position: candidate.position,
        story: candidate.story || "",
      });
      setEditorValue(candidate.story || "");
    }
  }, [candidate]);
  const votersData = useMemo(
    () =>
      voters?.map((voter) => ({ label: voter.displayName, value: voter._id })),
    [voters]
  );
  if (!candidate) return <div>Loading...</div>;
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = "";
    const update = async () => {
      const data = {
        userId: values.candidate,
        bio: values.bio,
        position: values.position as positionsType,
        photo: "",
        story: editorValue,
        _id: candidate._id,
      };
      if (selectedImage) {
        await deleteFile(candidate.photo);
        url = await uploadFile(selectedImage, `candidates/${values.candidate}`);
      }
      data.photo = url;
      await editCandidate({
        ...data,
        photo: url || candidate.photo,
      });
    };
    customToast({
      userFunction: update,
      errorFunc: () => deleteFile(url),
      successMessage: "Candidate edited successfully",
      errorMessage: "Failed to add candidate",
    });
  };

  return (
    <Box
      m={1}
      bgcolor={colors.surface}
      p={1}
      mb={20}
      onSubmit={submit}
      component={"form"}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Edit Candidate</Typography>
      </div>
      <Box mt={2} className="flex flex-col gap-5">
        <FormControl fullWidth>
          <FormLabel>Bio</FormLabel>
          <TextField
            label="bio"
            variant="outlined"
            size="small"
            color="primary"
            name="bio"
            multiline
            rows={5}
            value={values.bio}
            onChange={(e) => setValues({ ...values, bio: e.target.value })}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Position</FormLabel>
          <Select
            label="PositionType"
            name="positionType"
            color="info"
            required
            value={values.position}
            onChange={(e) => setValues({ ...values, position: e.target.value })}
          >
            {positions?.map((position) => (
              <MenuItem value={position} key={position}>
                {position}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Story</FormLabel>
          <Editor initialText={editorValue} setText={setEditorValue} />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Photo</FormLabel>
          <ImageField
            {...{
              selectedImage: selectedImage,
              setSelectedImage: setSelectedImage,
              name: "photo",
            }}
          />
        </FormControl>

        <div className="w-full flex justify-end">
          <Button
            variant="contained"
            type="submit"
            disabled={isPending}
            startIcon={<AddIcon />}
          >
            Save
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default EditCandidate;
