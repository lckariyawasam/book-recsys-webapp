'use client';
import { Poppins} from 'next/font/google';
import { createTheme } from '@mui/material/styles';

export const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets:['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "white",
          boxShadow: "none",
        }
      }
    }
  }
});

export default theme;
