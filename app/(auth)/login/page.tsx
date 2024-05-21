"use client";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { useGlobalTheme } from "@/utils/themeContext";
import Button from "@mui/material/Button";
import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { customToast } from "@/components/helpers/functions";
import { useRouter } from "next/navigation";
const Login = () => {
  const { colors } = useGlobalTheme();
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
      successFunc: () => (window.location.href = "/"),
    });
  };
  const router = useRouter();
  return (
    <form
      onSubmit={submit}
      className="flex flex-col justify-center items-center min-h-screen w-full p-4"
    >
      <Box className="w-full md:max-w-[800px]">
        <Typography color="GrayText" variant="h6">
          Admin Dashboard
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
        <Typography
          className="cursor-pointer space-x-2"
          color="skyblue"
          variant="body2"
        >
          <Box
            component="button"
            type="button"
            onClick={() => router.push("/voter-login")}
          >
            Login As Voter
          </Box>
        </Typography>
      </Box>
    </form>
  );
};

export default Login;
