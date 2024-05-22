"use client";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { useGlobalTheme } from "@/utils/themeContext";
import Button from "@mui/material/Button";
import { useAddUser } from "@/utils/hooks/useUser";
import { customToast } from "@/components/helpers/functions";
import { auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const { colors } = useGlobalTheme();
  const { mutateAsync } = useAddUser();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString().trim();
    const password = data.get("password")?.toString().trim();
    if (!email || !password) return;
    const signIn = async () => {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (res) => {
          const { displayName, uid, email } = res.user;
          if (email && uid) {
            await mutateAsync({
              displayName: displayName || "Admin",
              email,
              uid,
              admin: true,
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
      successFunc: () => (window.location.href = "/admin"),
    });
  };
  return (
    <Box className="w-full h-screen flex items-center justify-center p-4">
      <form
        onSubmit={submit}
        className="flex gap-5 flex-col items-start justify-center w-full max-w-[500px]"
      >
        <Typography color="GrayText" variant="h6">
          Create new Admin account
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
      </form>
    </Box>
  );
};

export default Login;
