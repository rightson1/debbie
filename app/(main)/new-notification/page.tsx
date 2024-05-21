"use client";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { customToast } from "@/components/helpers/functions";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import { useAddNotification } from "@/utils/hooks/useNotifications";

const Console = () => {
  const { colors } = useGlobalTheme();
  const { mutateAsync: addNotification, isPending } = useAddNotification();
  const [values, setValues] = useState({
    title: "",
    body: "",
  });
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.title || !values.body) {
      return toast.error("Please fill all fields");
    }
    const update = async () => {
      const data = {
        body: values.body,
        title: values.title,
        views: [],
      };

      setValues({
        title: "",
        body: "",
      });
      await addNotification(data);
    };
    customToast({
      userFunction: update,
      successMessage: "Notification added successfully",
      errorMessage: "Failed to add notification",
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
        <Typography variant="h5">Add Notification</Typography>
      </div>
      <Box mt={2} className="flex flex-col gap-5">
        <FormControl fullWidth>
          <FormLabel>Title</FormLabel>
          <TextField
            label="title"
            variant="outlined"
            size="small"
            color="primary"
            name="title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Body</FormLabel>
          <TextField
            label="body"
            variant="outlined"
            size="small"
            color="primary"
            name="body"
            multiline
            rows={5}
            value={values.body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
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

export default Console;
