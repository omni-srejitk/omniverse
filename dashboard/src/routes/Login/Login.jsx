import { useMutation } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFilter } from '../../context/FilterContext/FilterContext';
import { useDispatch } from 'react-redux';
import {
  setAuthToken,
  setBrandName,
  setloginStatus,
} from '../../redux/features/authSlice';
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const loginUser = () => {
    return axios.post('https://api.omniflo.in/doauth', form);
  };
  const { mutate, data: res, isLoading } = useMutation(loginUser);
  const { filterDispatch } = useFilter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const passwordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const updateUserDetails = () => {
    const loginToast = isLoading && toast.loading('Signing you in...');
    if (!isLoading && res?.msg === 'Unauthorized') {
      toast.error(`Couldn't sign you in`, { id: loginToast });
    }
    if (!isLoading && res?.data && res?.data?.token) {
      localStorage.setItem('Token', JSON.stringify(res?.data.token));
      localStorage.setItem('Name', JSON.stringify(res?.data?.name));

      // TODO Remove this
      filterDispatch({
        type: 'SET_BRANDNAME',
        payload: res?.data?.name,
      });
      filterDispatch({ type: 'LOGIN' });

      // ? Redux Dependency
      dispatch(setloginStatus(true));
      dispatch(setAuthToken(res?.data.token));
      dispatch(setBrandName(res?.data.name));

      navigate('/dashboard');
      toast.success(`Welcome Back ${res?.data?.name}`, { id: loginToast });
    }
  };

  useEffect(() => {
    !isLoading && updateUserDetails();
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.getItem('Token') && localStorage.getItem('Name')) {
      navigate('/dashboard');
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <main className='mx-auto flex min-h-screen w-screen items-center justify-center bg-white pl-0 lg:pl-0'>
      <form className=' ' onSubmit={onSubmit}>
        <h1 className=' mb-8 text-5xl font-semibold'>Sign in</h1>
        <p className='mb-4 text-sm font-semibold'>Sign in with email address</p>
        <div className='relative my-2 w-72'>
          <input
            type={'text'}
            name='username'
            value={form.username}
            onChange={handleChange}
            placeholder={'Username'}
            className=' h-12 w-full rounded-xl border-2 border-transparent bg-gray-100 py-[10px] pl-12 font-semibold text-gray-600 placeholder:text-gray-400'
          />
          <span className='material-symbols-rounded pointer-events-none  absolute top-0 bottom-0 left-0 flex w-12 items-center justify-center text-gray-500'>
            email
          </span>
        </div>
        <div className='relative my-2 w-72'>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={form.password}
            onChange={handleChange}
            placeholder={'Password'}
            className=' h-12 w-full rounded-xl border-2 border-transparent bg-gray-100 py-[10px] pl-12 font-semibold text-gray-600 placeholder:text-gray-400'
          />
          <span className='material-symbols-rounded pointer-events-none  absolute top-0 bottom-0 left-0 flex w-12 items-center justify-center text-gray-500'>
            lock
          </span>
          <span
            onClick={() => passwordVisibility()}
            className='material-symbols-rounded absolute  top-0 bottom-0 right-0 flex w-12 cursor-pointer items-center justify-center text-gray-500'
          >
            {showPassword ? 'visibility_off' : 'visibility'}
          </span>
        </div>
        <button
          type='submit'
          className='my-2 flex w-72 cursor-pointer items-center justify-center rounded-xl border-2   border-transparent bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600'
        >
          Sign in
        </button>
      </form>
    </main>
  );
};
