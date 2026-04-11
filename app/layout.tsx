import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Logan's Portfolio",
  description: "my next.js portfolio",
  icons: {
    icon: "/Sleek%20LH%20logo%20with%20glowing%20orbit.png",
    shortcut: "/Sleek%20LH%20logo%20with%20glowing%20orbit.png",
    apple: "/Sleek%20LH%20logo%20with%20glowing%20orbit.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
