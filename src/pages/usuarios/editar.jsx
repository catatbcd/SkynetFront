/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-restricted-imports */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GET_USUARIO } from '../../graphql/usuarios/queries';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hooks/useFormData';
import { EDITAR_USUARIO } from '../../graphql/usuarios/mutations';

export default function EditarUsuario(props) {
  const { form, formData, updateFormData } = useFormData(null);
  let { _id } = useParams();
  const usuario = _id;
  _id = props._id;
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id, usuario },
  });

  const [
    editarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_USUARIO);

  const submitForm = e => {
    e.preventDefault();
    if (formData.clave === '') {
      delete formData.clave;
    }

    editarUsuario({
      variables: { _id, usuario, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
      setTimeout(() => {
        window.location.href = `/usuario`;
      }, 5000);
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
      setTimeout(() => {
        window.location.href = `/usuario`;
      }, 5000);
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <ReactLoading type='bubbles' color='blue' />;
  return (
    <div className='FormCon'>
      <Link to='/usuarios/'>
        <FontAwesomeIcon icon={faArrowLeft} />
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <div className='row d-flex justify-content-center'>
        <div className='col-xl-7 col-lg-8 col-md-9 col-11 text-center'>
          <h3>Editar Usuario</h3>

          <div className='card'>
            <form
              onSubmit={submitForm}
              onChange={updateFormData}
              ref={form}
              className='form-card'
            >
              <div className='row justify-content-between text-left'>
                <div className='form-group col-sm-6 flex-column d-flex'>
                  {' '}
                  <label className='form-control-label px-3'>
                    Nombre de la persona:
                  </label>{' '}
                  <input
                    name='nombre'
                    defaultValue={queryData.Usuario.nombre}
                    required
                    type='text'
                  />{' '}
                </div>
                <div className='form-group col-sm-6 flex-column d-flex'>
                  {' '}
                  <label className='form-control-label px-3'>
                    Email de la persona:
                  </label>{' '}
                  <input
                    type='email'
                    name='email'
                    defaultValue={queryData.Usuario.email}
                    required
                  />{' '}
                </div>
              </div>
              <div className='row justify-content-between text-left'>
                <div className='form-group col-sm-6 flex-column d-flex'>
                  {' '}
                  <label className='form-control-label px-3'>
                    Identificación de la persona:
                  </label>{' '}
                  <input
                    type='text'
                    name='idUsuario'
                    defaultValue={queryData.Usuario.idUsuario}
                    required
                  />{' '}
                </div>
                <div className='form-group col-sm-6 flex-column d-flex'>
                  {' '}
                  <label className='form-control-label px-3'>
                    Contraseña:
                  </label>{' '}
                  <input type='password' name='clave' />{' '}
                </div>
              </div>
              <div className='row justify-content-between text-left'>
                <div className='form-group col-sm-6 flex-column d-flex'>
                  {' '}
                  <label className='form-control-label px-3'>
                    Rol del usuario:
                  </label>{' '}
                  <span className='noEdit'> {queryData.Usuario.rol}</span>
                </div>
              </div>

              <div className='row justify-content-end'>
                <div className='form-group col-sm-6'>
                  <ButtonLoading
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar'
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
