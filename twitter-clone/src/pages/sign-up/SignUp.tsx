import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { homeUrl, loginUrl, usersRoute } from "../../Constants";
import { setUser } from "../../redux/User";
import { Link, useNavigate } from "react-router-dom";
import * as EmailValidator from "email-validator";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userMessage, setUserMessage] = React.useState<string>("");

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .test("email", "Incorrect email format", (email) =>
        email ? EmailValidator.validate(email) : false
      )
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters long")
      .max(512, "Must be at most 512 characters long")
      .required("Password is required"),
    username: Yup.string().required("Username is required"),
    fullName: Yup.string()
      .max(512, "Must be at most 512 characters long")
      .required("Full name is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "", username: "", fullName: "" },
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);
      axios
        .post(usersRoute, {
          id: values.username,
          name: values.fullName,
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          if (response.status === 201) {
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
            setUserMessage("Something went wrong");
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
        <h1>Sign up</h1>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Stack spacing={1}>
            <TextField
              fullWidth
              id="email"
              name="email"
              type="text"
              margin="dense"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              fullWidth
              id="fullName"
              name="fullName"
              type="text"
              margin="dense"
              placeholder="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
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
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        Already have an account? <Link to={loginUrl}>Log in</Link>
      </Box>
    </Container>
  );
}
