/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-restricted-imports */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { Enum_Rol } from '../../utils/enums';
import DropDown from '../../components/Dropdown';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hooks/useFormData';
import { REGISTRO } from '../../graphql/auth/mutations';
import { useAuth } from '../../context/authContext';

import logo from '../../assets/Skynet1.png';

const Register = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [
    registro,
    { data: dataMutation, loading: loadingMutation, error: mutationError },
  ] = useMutation(REGISTRO);

  const submitForm = e => {
    e.preventDefault();
    registro({ variables: formData });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.registro.error === null) {
        setToken(dataMutation.registro.token);
        navigate('/');
      } else {
        toast.error(dataMutation.registro.error);
        setTimeout(() => {
          navigate('/auth/login');
        }, 5000);
      }
    }
  }, [dataMutation, setToken, navigate]);
  useEffect(() => {
    if (mutationError) {
      toast.error('Error al registrar');
      setTimeout(() => {
        navigate('/auth/login');
      }, 5000);
    }
  }, [mutationError, navigate]);

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
                    <h3 className='display-4'>Regístrate</h3>
                    <p className='text-muted mb-4'>
                      para ingresar al sistema de gestión de proyectos
                    </p>
                    <form
                      className='flex flex-col'
                      onSubmit={submitForm}
                      onChange={updateFormData}
                      ref={form}
                    >
                      <div className='mb-3'>
                        <input
                          placeholder='Nombre'
                          name='nombre'
                          type='text'
                          required
                          autoFocus
                          className='form-control rounded-pill border-0 shadow-sm px-4'
                        />
                      </div>
                      <div className='mb-3'>
                        <input
                          placeholder='Documento'
                          name='idUsuario'
                          type='number'
                          required
                          className='form-control rounded-pill border-0 shadow-sm px-4 '
                        />
                      </div>
                      <div className='mb-3'>
                        <DropDown
                          label='Rol deseado'
                          name='rol'
                          required
                          options={Enum_Rol}
                        />
                      </div>
                      <div className='mb-3'>
                        <input
                          placeholder='Correo electronico'
                          name='email'
                          type='email'
                          required
                          className='form-control rounded-pill border-0 shadow-sm px-4 '
                        />
                      </div>
                      <div className='mb-3'>
                        <input
                          placeholder='Contraseña'
                          name='clave'
                          type='password'
                          required
                          className='form-control rounded-pill border-0 shadow-sm px-4 text-primary'
                        />
                      </div>
                      <div className='d-grid gap-2 mt-2'>
                        <ButtonLoading
                          disabled={Object.keys(formData).length === 0}
                          loading={loadingMutation}
                          text='Registrarme'
                        />
                      </div>
                    </form>
                    <hr className='' />
                    <div className='text-center d-flex justify-content-between mt-4'>
                      <p>
                        ¿Ya tienes una cuenta?{' '}
                        <Link
                          to='/auth/login'
                          className='font-italic text-muted'
                        >
                          <u>Inicia sesión</u>
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

export default Register;
