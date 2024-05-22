import { Metadata, Viewport } from "next";
import "./globals.css";
import "./loading.css";
import Client from "@/components/Client";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Debbie",
  description: "Debbie",
  manifest: "/manifest.json",
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#Fafafa" },
  ],
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="__next">
        <Client>{children}</Client>
      </body>
    </html>
  );
}
