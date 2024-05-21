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
} from "firebase/auth";
import { customToast } from "@/components/helpers/functions";
import { User } from "@/types";
import axios from "axios";
import { useAddUser } from "@/utils/hooks/useUser";
import { useRouter } from "next/navigation";
const Login = () => {
  const { colors } = useGlobalTheme();
  const { mutateAsync } = useAddUser();
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString().trim();
    const password = data.get("password")?.toString().trim();
    if (!email || !password) return;
    const signIn = async () => {
      await signInWithEmailAndPassword(auth, email, password);
    };
    customToast({
      userFunction: signIn,
      successMessage: "Signed in successfully",
      errorMessage: "Something went wrong",
      successFunc: () => (window.location.href = "/voter"),
    });
  };

  return (
    <Box className="flex justify-center items-center min-h-screen ">
      <form
        onSubmit={submit}
        className="flex gap-5 flex-col items-start justify-center w-full max-w-[500px]"
      >
        <Typography color="GrayText" variant="h6">
          Voter Login
        </Typography>
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
            type="password"
          />
          {/* dont have account register (/new-voter) */}
          <Typography
            className="cursor-pointer space-x-2"
            color="skyblue"
            variant="body2"
          >
            Dont have an account?{" "}
            <Box
              component="button"
              type="button"
              onClick={() => router.push("/new-voter")}
            >
              Register
            </Box>
            <span>Or</span>
            <Box
              component="button"
              type="button"
              onClick={() => router.push("/login")}
            >
              Login As Admin
            </Box>
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            sx={{
              mt: 3,
            }}
          >
            Sign In
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default Login;
