import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Formik, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

import LoginWrapper from './components/LoginWrapper';
import LoginContainer from './components/LoginContainer';
import LoginBox from './components/LoginBox';
import LoginFooterLink from './components/LoginFooterLink';
import LoginFeedback from './components/LoginFeedback';
import Field from '../../components/Input';
import Button from '../../components/Button';

import * as URLS from '../../constants/urls';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Login = () => {
  const navigate = useNavigate();
  const [feedbackText, setFeedbackText] = useState<string>('');

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginBox>
          <h1>Login</h1>

          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
              username: Yup.string()
                .required('Required'),
              password: Yup.string()
                .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              setFeedbackText('');
              axios.get(`http://localhost:3001/users/${values.username}`)
                .then((res) => {
                  console.log(res.status, res.statusText);
                  if (res.data?.id === values.username && res.data?.password === values.password) {
                    navigate(URLS.HOME, { replace: true });
                    return;
                  }
                  setFeedbackText('Incorrect credentials.');
                })
                .catch((e) => {
                  console.error(e);
                  setFeedbackText('Incorrect credentials.');
                })
                .finally(() => {
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

                <LoginFeedback show={feedbackText.length > 0}>{feedbackText}</LoginFeedback>
              </StyledForm>
            )}
          </Formik>

        </LoginBox>

        <LoginFooterLink>
          Don’t have an account? <Link to={URLS.SIGNUP}>Sign up</Link>
        </LoginFooterLink>
      </LoginContainer>
    </LoginWrapper>
  )
};

export default Login;