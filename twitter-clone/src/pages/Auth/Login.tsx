import React from 'react';
import styled from '@emotion/styled';
import { Formik, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import LoginWrapper from './components/LoginWrapper';
import LoginContainer from './components/LoginContainer';
import LoginBox from './components/LoginBox';
import LoginFooterLink from './components/LoginFooterLink';
import Field from '../../components/Input';
import Button from '../../components/Button';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Login = () => {
  const navigate = useNavigate();

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginBox>
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
              setSubmitting(true);
              fetch(`http://localhost:3001/users/${values.username}`).then((res) => {
                console.log(res.status, res.statusText);
                if (res.status === 200) {
                  navigate('/home', {replace: true});
                }
              }).catch((e) => {
                console.error(e)
              }).finally(() => {
                setSubmitting(false);
              })
            }}
          >
            {({ isSubmitting }) => (
              <StyledForm>
                <Field type="text" name="username" placeholder='Username'/>
                <ErrorMessage name="username" component="div" />

                <Field type="password" name="password" placeholder='Password' />
                <ErrorMessage name="password" component="div" />

                <Button align='flex-end' type="submit" disabled={isSubmitting}>
                  Log in
                </Button>
              </StyledForm>
            )}
          </Formik>

        </LoginBox>

        <LoginFooterLink>
          Don’t have an account? <Link to="/sign-up">Sign up</Link>
        </LoginFooterLink>
      </LoginContainer>
    </LoginWrapper>
  )
};

export default Login;