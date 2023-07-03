import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Login = () => {
  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardContent>
        <Typography variant="h5">Log in</Typography>
      </CardContent>
    </Card>
  );
};

export default Login;