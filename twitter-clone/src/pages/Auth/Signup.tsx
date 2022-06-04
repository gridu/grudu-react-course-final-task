import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Formik, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import LoginWrapper from './components/LoginWrapper';
import LoginContainer from './components/LoginContainer';
import LoginBox from './components/LoginBox';
import LoginFooterLink from './components/LoginFooterLink';
import LoginFeedback from './components/LoginFeedback';
import Field from '../../components/Input';
import Button from '../../components/Button';

import * as URLS from '../../constants/urls';
import axios from 'axios';


const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Signup = () => {
  const navigate = useNavigate();
  const [feedbackText, setFeedbackText] = useState<string>('');

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginBox>
          <h1>Sign Up</h1>

          <Formik
            initialValues={{ email: '',  password: '', id: '', name: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Please use email format')
                .required('Required'),
              name: Yup.string()
                .min(8, 'Must be 8 characters at least')
                .required('Required'),
              id: Yup.string()
                .required('Required'),
              password: Yup.string()
                .min(8, 'Must be 8 characters at least')
                .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              setFeedbackText('');
              axios.post(`http://localhost:3001/users`, {...values})
                .then((res) => {
                  console.log(res.status, res.statusText);
                  if (res.status === 201) {
                    setFeedbackText('User created. You are being redirected to home page.');
                    setTimeout(() => {
                      navigate(URLS.HOME, {replace: true});
                    }, 3000);
                    return;
                  }
                  setFeedbackText('Something went wrong.');
                })
                .catch((e) => {
                  console.error(e)
                  setFeedbackText('Something went wrong.');
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <StyledForm>
                <Field type="email" name="email" placeholder='Email'/>
                <ErrorMessage name="email" component="div" />

                <Field type="password" name="password" placeholder='Password' />
                <ErrorMessage name="password" component="div" />

                <Field type="text" name="id" placeholder='Username'/>
                <ErrorMessage name="id" component="div" />

                <Field type="text" name="name" placeholder='Full name'/>
                <ErrorMessage name="name" component="div" />

                <Button align='flex-end' type="submit" disabled={isSubmitting}>
                  Sign up
                </Button>

                <LoginFeedback show={feedbackText.length > 0}>{feedbackText}</LoginFeedback>
              </StyledForm>
            )}
          </Formik>

        </LoginBox>

        <LoginFooterLink>
          Already have an account? <Link to={URLS.LOGIN}>Log in</Link>
        </LoginFooterLink>
      </LoginContainer>
    </LoginWrapper>
  )
};

export default Signup;