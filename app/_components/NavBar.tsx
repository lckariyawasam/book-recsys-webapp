"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  // Button,
  // Link,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CustomButton from "./Button";

const NavBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: 250 }}
    >
      <List>
        <ListItem>
          <Link href="/">
            <Typography variant="body1" className="text-secondary-100">
              Home
            </Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/">
            <Typography variant="body1" className="text-secondary-100">
              About
            </Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/">
            <Typography variant="body1" className="text-secondary-100">
              Features
            </Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/" className="mr-3">
            <CustomButton>Log in </CustomButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/">
            <CustomButton variant="secondary">Sign up</CustomButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Container maxWidth="xl">
      <AppBar position="static" className="bg-white">
        <Toolbar>
          {/* Left end logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="text-secondary-400"
          >
            <Link href="/">
              Book<span className="text-primary-300">Match</span>
            </Link>
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="default"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <>
              {/* Middle 3 links */}
              <Box
                sx={{ display: "flex", flexGrow: 1, justifyContent: "center" , ml:15}}
              >
                <Link href="/" className="mx-2  text-secondary-200">
                  Home
                </Link>
                <Link href="/" className="mx-2  text-secondary-200">
                  About
                </Link>
                <Link href="/" className="mx-2  text-secondary-200">
                  Features
                </Link>
              </Box>

              {/* Right end two buttons */}
              <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "end" }}>
                <Link href="/" className="mr-3">
                  <CustomButton>Log in </CustomButton>
                </Link>

                <Link href="/">
                  <CustomButton variant="secondary">Sign up</CustomButton>
                </Link>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default NavBar;
