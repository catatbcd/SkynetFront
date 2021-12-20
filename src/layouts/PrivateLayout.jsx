/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/order */
/* eslint-disable no-restricted-imports */
import Navigation from '../components/Navigation';
import { Outlet } from 'react-router';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { REFRESH_TOKEN } from '../graphql/auth/mutations';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import PrivateRoute from '../components/PrivateRoute';
import { useAuth } from '../context/authContext';

const PrivateLayout = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [
    refreshToken,
    { data: dataMutation, loading: loadingMutation, error: mutationError },
  ] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.refreshToken.token) {
        setToken(dataMutation.refreshToken.token);
      } else {
        setToken(null);
        navigate('/auth/login');
      }
      setLoadingAuth(false);
    }
  }, [dataMutation, setToken, loadingAuth, navigate]);
  useEffect(() => {
    if (mutationError) {
      toast.error('Error al ingresar', mutationError);
    }
  }, [mutationError]);

  if (loadingMutation || loadingAuth)
    return <ReactLoading type='bubbles' color='blue' />;

  return (
    <PrivateRoute roleList={['Administrador', 'Lider', 'Estudiante']}>
      <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
        <Navigation />
        <div className='flex w-full h-full'>
          <div className='w-full h-full  overflow-y-scroll'>
            <Outlet />
          </div>
        </div>
        <ToastContainer />
      </div>
    </PrivateRoute>
  );
};

export default PrivateLayout;
