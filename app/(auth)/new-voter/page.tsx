"use client";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { useGlobalTheme } from "@/utils/themeContext";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { auth } from "@/utils/firebase";
import { toast } from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { customToast } from "@/components/helpers/functions";
import { User } from "@/types";
import axios from "axios";
import { useAddUser } from "@/utils/hooks/useUser";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/navigation";
const Login = () => {
  const { colors } = useGlobalTheme();
  const { mutateAsync } = useAddUser();
  const provider = new GoogleAuthProvider();
  const [viewPassword, setViewPassword] = React.useState(false);
  const router = useRouter();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString().trim();
    const password = data.get("password")?.toString().trim();
    const displayName = data.get("displayName")?.toString().trim();
    if (!email || !password || !displayName) return;
    const signIn = async () => {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (res) => {
          const { uid, email } = res.user;
          if (email && uid) {
            await mutateAsync({
              displayName,
              email,
              uid,
              admin: false,
              photoURL: "",
            });
          } else {
            throw new Error("Could not sign in");
          }
        }
      );
    };
    customToast({
      userFunction: signIn,
      successMessage: "Signed in successfully",
      errorMessage: "Something went wrong",
      successFunc: () => (window.location.href = "/voter"),
    });
  };
  return (
    <Box className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={submit}
        className="flex gap-5 flex-col items-start justify-center w-full max-w-[500px]"
      >
        <Typography color="GrayText" variant="h6">
          Create a new account
        </Typography>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <TextField name="displayName" required label="DisplayName" />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <TextField name="email" required label="Email" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <TextField
            name="password"
            required
            label="Password"
            type={viewPassword ? "text" : "password"}
          />
        </FormControl>
        {/* view password check */}
        <Box className="flex items-center">
          <Checkbox
            defaultChecked
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            onChange={() => setViewPassword(!viewPassword)}
          />
          <FormLabel>Show Password</FormLabel>
        </Box>
        <Typography
          className="cursor-pointer"
          onClick={() => router.push("/voter-login")}
          color="skyblue"
          variant="body2"
        >
          Already have an account?{" "}
          <Box component="button" type="button">
            Login
          </Box>
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          sx={{
            mt: 1,
          }}
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default Login;
