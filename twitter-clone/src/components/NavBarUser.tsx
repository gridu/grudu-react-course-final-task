import React from "react";
import Avatar from "react-avatar";
import { User } from "../redux/User";
import * as paths from "../Constants";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export interface NavBarUserProps {
  user: User;
}

export function NavBarUser(props: NavBarUserProps) {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate(paths.loginUrl);
  };

  const navigateToSignup = () => {
    navigate(paths.signUpUrl);
  };

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
        />
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
