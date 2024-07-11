"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
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
  const [activeSection, setActiveSection] = useState<string>("hero");

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "hero";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          currentSection = section.getAttribute("id") || currentSection;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const drawer = (
    <Box
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: 250 }}
    >
      <List>
        <ListItem>
          <a href="#hero" className={activeSection === "hero" ? "text-primary-300" : "text-secondary-100"}>
            <Typography variant="body1">Home</Typography>
          </a>
        </ListItem>
        <ListItem>
          <a href="#feature" className={activeSection === "feature" ? "text-primary-300" : "text-secondary-100"}>
            <Typography variant="body1">Features</Typography>
          </a>
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
      <AppBar position="fixed" className="bg-white">
        <Toolbar>
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
              <Box
                sx={{ display: "flex", flexGrow: 1, justifyContent: "center", ml: 12 }}
              >
                <a href="#hero" className={`mx-2 ${activeSection === "hero" ? "text-primary-300" : "text-secondary-200"}`}>
                  Home
                </a>
                <a href="#feature" className={`mx-2 ${activeSection === "feature" ? "text-primary-300" : "text-secondary-200"}`}>
                  Features
                </a>
              </Box>
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
