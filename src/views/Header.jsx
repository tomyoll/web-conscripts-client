import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import logo from "../assets/images/logo.jpg";
import menuIcon from "../assets/images/menu.png";

export default function Header() {
  const navigate = useNavigate();
  return (
    <AppBar sx={{ bgcolor: "black" }}>
      <Toolbar>
        <IconButton>
          <img style={{ width: 64, height: 64 }} src={logo} alt="Logo" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button
            sx={{
              fontSize: 17,
              ":hover": {
                color: "white"
              }
            }}
            onClick={() => navigate("/")}>
            Головна
          </Button>
          <Button
            sx={{
              fontSize: 17,
              ":hover": {
                color: "white"
              }
            }}
            onClick={() => navigate("/main")}>
            Воєннозобов&apos;язані
          </Button>
          <img style={{ width: 35, height: 25, marginTop: 5 }} src={menuIcon} alt="Menu icon" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// button: {
//   backgroundColor: '#3c52b2',
//   color: '#fff',
