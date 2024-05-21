"use client";
import "./globals.css";
import "./loading.css";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Plus_Jakarta_Sans, Bubblegum_Sans } from "next/font/google";
import { ThemeProvider } from "@/utils/themeContext";
import { AuthProvider } from "@/utils/AuthContext";
export const dynamic = "force-dynamic";
const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext", "vietnamese", "latin"],
  variable: "--font-jakarta",
});
const bubblegum_sans = Bubblegum_Sans({
  weight: ["400"],
  subsets: ["latin-ext", "latin"],
  variable: "--font-bubblegum",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        id="__next"
        className={` ${plus_jakarta_sans.variable} font-jakarta ${bubblegum_sans.variable} 
         `}
      >
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <ThemeProvider>{children}</ThemeProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
