import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { usersRoute, homeUrl } from "../../Constants";
import { setUser } from "../../redux/User";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
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
              console.error(error);
            });
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <Field type="text" name="username" placeholder="Username" />
            {errors.username ? <div>{errors.username}</div> : null}
            <Field type="password" name="password" placeholder="Password" />
            {errors.password ? <div>{errors.password}</div> : null}
            <button type="submit" disabled={isSubmitting}>
              Log in
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
