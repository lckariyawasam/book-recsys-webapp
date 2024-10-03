import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { StyledRoot } from "./styledRoot";
import { Epilogue } from "next/font/google";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
});

export const metadata: Metadata = {
  title: "BookMatch",
  description:
    "BookMatch is a platform for book lovers to find their next favorite book.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <AppRouterCacheProvider>
        <MantineProvider theme={theme}><StyledRoot>{children}</StyledRoot></MantineProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
