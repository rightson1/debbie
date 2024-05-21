/* eslint-disable @next/next/no-img-element */
import React, { use } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useGlobalTheme } from "@/utils/themeContext";
import TextField from "@mui/material/TextField";
import { useAuth } from "@/utils/AuthContext";
import toast from "react-hot-toast";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
export const ImageField = ({
  selectedImage,
  setSelectedImage,
  name,
}: {
  selectedImage: File | null;
  name: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  const { colors } = useGlobalTheme();
  const handleImageClear = () => {
    setSelectedImage(null);
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <Box
      component={selectedImage ? "div" : "label"}
      borderRadius={1}
      htmlFor={name}
      className={`w-full p-4 text-center cursor-pointer`}
      sx={{
        border: selectedImage ? "none" : "2px dashed",
        borderColor: colors.textSecondary,
      }}
    >
      {selectedImage ? (
        <Box className="relative">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded"
            className="max-w-full max-h-32"
          />
          <ClearIcon
            fontSize="small"
            className="absolute top-0 right-0 cursor-pointer"
            onClick={handleImageClear}
          />
        </Box>
      ) : (
        <>
          <CloudUploadIcon fontSize="large" color="action" />
          <Typography variant="body2" color="textSecondary">
            Click to upload
          </Typography>
        </>
      )}
      <input
        type="file"
        //onlyimage
        accept="image/*"
        id={name}
        className="hidden"
        onChange={handleImageUpload}
      />
    </Box>
  );
};
