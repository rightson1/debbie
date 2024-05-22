"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/utils/themeContext";
import { AuthProvider } from "@/utils/AuthContext";
export const dynamic = "force-dynamic";

export default function Client({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <ThemeProvider>{children}</ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  );
}
