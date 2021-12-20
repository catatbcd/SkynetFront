/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-restricted-imports */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hooks/useFormData';
import { LOGIN } from '../../graphql/auth/mutations';
import { useAuth } from '../../context/authContext';

import logo from '../../assets/Skynet1.png';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();
  const [
    login,
    { data: dataMutation, loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN);

  const submitForm = e => {
    e.preventDefault();

    login({
      variables: formData,
    });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.login.error === null) {
        setToken(dataMutation.login.token);
        navigate('/');
      } else {
        toast.error(dataMutation.login.error);
      }
    }
  }, [dataMutation, setToken, navigate]);
  useEffect(() => {
    if (mutationError) {
      toast.error('Error al ingresar', mutationError);
    }
  }, [mutationError]);

  return (
    <div className='maincontainer'>
      <ToastContainer />
      <div className='container-fluid'>
        <div className='row no-gutter'>
          <div className='col-md-6 d-none d-md-flex'>
            <div className='box'>
              <img src={logo} alt='Logo' className='responsive' />
            </div>
          </div>

          <div className='col-md-6 bg-light'>
            <div className='login d-flex align-items-center py-5'>
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-10 col-xl-7 mx-auto'>
                    <h3 className='display-4'>Iniciar sesión</h3>
                    <p className='text-muted mb-4'>
                      Inicia sesion para ingresar al sistema de gestion de
                      proyectos
                    </p>
                    <form
                      className='flex flex-col'
                      onSubmit={submitForm}
                      onChange={updateFormData}
                      ref={form}
                    >
                      <div className='mb-3'>
                        <input
                          name='email'
                          type='email'
                          required
                          placeholder='Email'
                          autoFocus
                          className='form-control rounded-pill border-0 shadow-sm px-4'
                        />
                      </div>
                      <div className='mb-3'>
                        <input
                          name='clave'
                          type='password'
                          required
                          placeholder='Contraseña'
                          className='form-control rounded-pill border-0 shadow-sm px-4 text-primary'
                        />
                      </div>
                      <div className='d-grid gap-2 mt-2'>
                        <ButtonLoading
                          disabled={Object.keys(formData).length === 0}
                          loading={mutationLoading}
                          text='Iniciar Sesión'
                        />
                      </div>
                    </form>
                    <hr className='' />
                    <div className='text-center d-flex justify-content-between mt-4'>
                      <p>
                        ¿No tienes una cuenta?{' '}
                        <Link
                          to='/auth/register'
                          className='font-italic text-muted'
                        >
                          <u>Regístrate</u>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
