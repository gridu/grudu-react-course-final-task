// TODO: order of imports. absolute imports first, then relative imports
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './LoginForm.css';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { User } from '../../types/user';
import { userAuth } from '../../recoil/atom';
import _ from 'lodash';
import { useRecoilState } from 'recoil';



const LoginForm: React.FC = () => {
  // TODO: format this file to follow the same style as the rest of the project
  const { register, handleSubmit, formState: { errors } } = useForm<User>({ criteriaMode: "all" });
  const [auth, setAuth] = useRecoilState(userAuth) // TODO: auth state could be moved into a custom hook
  const [isError, setIsError] = useState(false);
  const [isError404, setIsError404] = useState(false); // TODO: redundant, 404 could be handled in the same way as other errors

  async function checkAuth(id: string, password: string) {  // TODO: this logic should be moved out of this component
    try {
      const res = await axios.get('http://localhost:3001/users/' + id);
      const user = res.data;
      if (user && user.password === password) {
        setAuth({
          isAuthenticated: true,
          user: user
        })
      }
      else {
        setIsError404(true);
        setTimeout(() => {
          setIsError404(false);
        }, 3000);
      }
    }
    catch (error: any) {
      if (error.response.status === 404) {
        setIsError404(true);
        setTimeout(() => { // TODO: not clear why we need these timesouts
          setIsError404(false);
        }, 3000);
      }
      else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    }
  }

  const onSubmit = async (data: User) => {
    checkAuth(data.id, data.password)
  }

  if (auth.isAuthenticated) {
    return <Navigate to='/tweets' />
  }

  if (isError) {
    return <Navigate to='/error' />
  }

  return (
    <div className='login-form-container'>
      <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
        <h2>Log in</h2>
        <input
          type='text'
          {...register("id", { required: 'This is required' })}
          placeholder='Username'
        />
        <ErrorMessage
          errors={errors}
          name="id"
          render={({ messages }) => {
            return messages
              ? _.entries(messages).map(([type, message]) => (
                <p key={type} className='invalid-input'>{message}</p>
              ))
              : null;
          }}
        />
        <input // TODO: add validation for fields (as in RegisterForm)
          type='password'
          {...register("password", { required: 'This is required' })}
          placeholder='Password'
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ messages }) => {
            return messages
              ? _.entries(messages).map(([type, message]) => (
                <p key={type} className='invalid-input' id='last-input'>{message}</p>
              ))
              : null;
          }}
        />

        {isError404 && <p className='invalid-input'>Invalid email or password</p>}
        <div className='button-login'>
          <button type='submit'>Login</button>
        </div>
      </form>
      <p>Don't have an account? <Link to='/register'>Sign up</Link></p>
    </div>
  );
};

export default LoginForm;