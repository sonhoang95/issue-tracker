import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import NavBar from "./NavBar";
import { Theme, ThemePanel } from "@radix-ui/themes";

const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open_sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={open_sans.variable}>
      <body>
        <Theme appearance="light" accentColor="violet">
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
