import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { StyledRoot } from "./styledRoot";
import {Epilogue} from 'next/font/google';

const epilogue = Epilogue({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "BookMatch",
  description: "BookMatch is a platform for book lovers to find their next favorite book.",
};

export default function RootLayout(props : { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={epilogue.className}>
         <AppRouterCacheProvider>
            <StyledRoot>
             {children}
            </StyledRoot>
         </AppRouterCacheProvider>
      </body>
    </html>
  );
}
