import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { homeUrl, usersRoute } from "../../Constants";
import { setUser } from "../../redux/User";
import { useNavigate } from "react-router-dom";
import * as EmailValidator from "email-validator";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .test("email", "Incorrect email format", (email) =>
        email ? EmailValidator.validate(email) : false
      )
      .required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters long")
      .max(512, "Must be at most 512 characters long")
      .required("Required"),
    username: Yup.string().required("Required"),
    fullName: Yup.string()
      .max(512, "Must be at most 512 characters long")
      .required("Required"),
  });

  return (
    <div>
      <h1>Sign up</h1>
      <Formik
        initialValues={{ email: "", password: "", username: "", fullName: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          console.info(values);
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
                    loggedIn: true,
                  })
                );
                actions.setSubmitting(false);
                navigate(homeUrl);
              } else {
                actions.setSubmitting(false);
              }
            })
            .catch((error) => {
              actions.setSubmitting(false);
              console.error(error);
            });
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <Field type="text" name="email" placeholder="Email" />
            {errors.email ? <div>{errors.email}</div> : null}
            <Field type="password" name="password" placeholder="Password" />
            {errors.password ? <div>{errors.password}</div> : null}
            <Field type="text" name="username" placeholder="Username" />
            {errors.username ? <div>{errors.username}</div> : null}
            <Field type="text" name="fullName" placeholder="Full Name" />
            {errors.fullName ? <div>{errors.fullName}</div> : null}
            <button type="submit" disabled={isSubmitting}>
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
