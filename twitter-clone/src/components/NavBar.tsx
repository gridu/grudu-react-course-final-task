import React from "react";
import { useSelector } from "react-redux";
import { User } from "../redux/User";
import { NavBarUser } from "./NavBarUser";
import AppBar from "@mui/material/AppBar";
import { Box, Toolbar } from "@mui/material";
import logo from "../logo/duck.png";

export default function NavBar() {
  const user: User = useSelector((state: any) => state.user);

  return (
    <AppBar position="static" sx={{ height: "auto", padding: "5px" }}>
      <Toolbar>
        <Box sx={{ marginRight: "1rem" }}>
          <img src={logo} alt="Logo" width="60px" height="60px" />
        </Box>
        <Box sx={{ flexGrow: 1 }}>Another Twitter Clone</Box>
        <NavBarUser user={user} />
      </Toolbar>
    </AppBar>
  );
}
