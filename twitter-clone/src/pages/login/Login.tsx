import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usersRoute, homeUrl, signUpUrl } from "../../Constants";
import { setUser } from "../../redux/User";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Alert, Box, Container, Grid, Stack, TextField } from "@mui/material";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userMessage, setUserMessage] = React.useState<string>("");

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      console.info(values);
      actions.setSubmitting(true);
      axios
        .get(usersRoute + "/" + values.username)
        .then((response) => {
          if (
            response.status === 200 &&
            response.data?.id === values.username &&
            response.data?.password === values.password
          ) {
            dispatch(
              setUser({
                id: response.data.id,
                name: response.data.name,
                loggedIn: true,
              })
            );
            navigate(homeUrl);
          } else {
            actions.setSubmitting(false);
            setUserMessage("Invalid email or password");
          }
        })
        .catch((error) => {
          actions.setSubmitting(false);
          console.error(error);
          setUserMessage("Something went wrong");
        });
    },
  });

  return (
    <Container
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          boxSizing: "border-box",
          padding: "10px",
          position: "center",
          width: "520px",
          height: "auto",
          background: "#FFFFFF",
          border: "1px solid #42434B",
          borderRadius: "8px",
          boxShadow: 1,
        }}
      >
        <h1>Log in</h1>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Stack spacing={1}>
            <TextField
              fullWidth
              id="username"
              name="username"
              type="text"
              margin="dense"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              margin="dense"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Grid
              container
              spacing={2}
              justifyContent="space-around"
              alignItems="stretch"
            >
              <Grid item xs={8}>
                {userMessage.length > 0 ? (
                  <Alert severity="error" hidden={userMessage.length === 0}>
                    {userMessage}
                  </Alert>
                ) : null}
              </Grid>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        Don’t have an account? <Link to={signUpUrl}>Sign up</Link>
      </Box>
    </Container>
  );
}
