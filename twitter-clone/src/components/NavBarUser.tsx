import React from "react";
import Avatar from "react-avatar";
import { unsetUser, User } from "../redux/User";
import * as paths from "../Constants";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";

export interface NavBarUserProps {
  user: User;
}

export function NavBarUser(props: NavBarUserProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigateToLogin = () => {
    navigate(paths.loginUrl);
  };

  const navigateToSignup = () => {
    navigate(paths.signUpUrl);
  };

  function handleOpenUserMenu(event: React.SyntheticEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  function handleLogOut() {
    dispatch(unsetUser());
    handleCloseUserMenu();
    navigateToLogin();
  }

  if (props.user.loggedIn) {
    return (
      <Stack
        direction="row"
        spacing="2"
        justifyContent="center"
        alignItems="center"
      >
        <span className="username">{props.user.name}</span>
        <Avatar
          name={props.user.id}
          round
          size="64"
          style={{ marginLeft: "1rem" }}
          onClick={handleOpenUserMenu}
        />
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key="logout" onClick={handleLogOut}>
            Log out
          </MenuItem>
        </Menu>
      </Stack>
    );
  } else {
    return (
      <Stack
        direction="row"
        spacing="2"
        justifyContent="center"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Button color="inherit" onClick={navigateToLogin}>
          Log in
        </Button>
        <Button color="inherit" onClick={navigateToSignup}>
          Sign up
        </Button>
      </Stack>
    );
  }
}
