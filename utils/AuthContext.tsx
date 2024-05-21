"use client";
import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "./firebase";
import axios from "axios";
import { useState } from "react";
import { Admin, User, UserFetched } from "@/types";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | {} | null>({});
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const fetchUser = async (uid: string) => {
    await axios
      .get(`/api/user?uid=${uid}`)
      .then((res) => {
        const user = res.data;
        if (user) {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.removeItem("user");
          setUser(null);
          setAdmin(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" && localStorage.getItem("user");
    const localUser: User | null = userString ? JSON.parse(userString) : null;
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdmin({
          uid: user.uid,
          email: user.email,
          displayNavme: user.displayName,
          photoURL: user.photoURL,
        });
        if (localUser?.uid === user.uid) {
          setUser(localUser);
        } else {
          fetchUser(user.uid);
        }
      } else {
        setAdmin(null);
        setUser(null);
      }
    });
    // setLoading(false);
    return () => {
      unsub();
    };
  }, []);
  const logout = async () => {
    const log = async () => {
      localStorage.removeItem("user");
      localStorage.removeItem("path");
      router.push("/login");
      await auth.signOut();
    };
    toast.promise(log(), {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Could not log out, you stuck here forever",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        fetchUser,
        logout,
        admin,
        setUser,
        setAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface AuthContextProps {
  user: UserFetched;
  admin: Admin;
  fetchUser: (uid: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | {} | null>>;
}

export const useAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext) as AuthContextProps;
  return authContext;
};
