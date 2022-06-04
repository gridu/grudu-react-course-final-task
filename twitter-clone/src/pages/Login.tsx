import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  return (
    <div className="login">
      <div className='login-container'>

        <div className='login-box'>
          <h1>Login</h1>

          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
              username: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
              password: Yup.string()
                .max(8, 'Must be 8 characters or less')
                .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="text" name="username" />
                <ErrorMessage name="username" component="div" />

                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />

                <button type="submit" disabled={isSubmitting}>
                  Log in
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
};

export default Login;