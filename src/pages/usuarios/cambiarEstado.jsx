/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
/* eslint-disable no-restricted-imports */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReactLoading from 'react-loading';
import { GET_USUARIO } from '../../graphql/usuarios/queries';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hooks/useFormData';
import { CAMBIAR_ESTADO_USUARIO } from '../../graphql/usuarios/mutations';
import DropDown from '../../components/Dropdown';
import { Enum_EstadoUsuario } from '../../utils/enums';

export default function CambiarEstadoUsuario(props) {
  const { form, formData, updateFormData } = useFormData(null);
  let { _id } = useParams();
  const usuario = _id;
  _id = props._id;
  const { rol } = props;
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id, usuario },
  });

  const [
    cambiarEstado,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CAMBIAR_ESTADO_USUARIO);

  const submitForm = e => {
    e.preventDefault();
    if (formData.estado === '0') {
      formData.estado = 'Pendiente';
    } else if (formData.estado === '1') {
      formData.estado = 'Autorizado';
    }
    const { estado } = formData;
    cambiarEstado({
      variables: { _id, usuario, estado },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
      setTimeout(() => {
        window.location.href = `/usuarios`;
      }, 5000);
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
      setTimeout(() => {
        window.location.href = `/usuarios`;
      }, 5000);
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
      setTimeout(() => {
        window.location.href = `/usuarios`;
      }, 5000);
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <ReactLoading type='bubbles' color='blue' />;
  return (
    <div className='FormCon'>
      <Link to='/usuarios/'>
        <FontAwesomeIcon icon={faArrowLeft} color='gray' />
      </Link>
      <div className='row d-flex justify-content-center'>
        <div className='col-xl-7 col-lg-8 col-md-9 col-11 text-center'>
          <h3>Cambiar Estado Del Usuario</h3>

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
                    Nombre del usuario:
                  </label>{' '}
                  <span className='noEdit'>{queryData.Usuario.nombre}</span>{' '}
                </div>
                <div className='form-group col-sm-6 flex-column d-flex'>
                  {' '}
                  <label className='form-control-label px-3'>
                    Email del usuario:
                  </label>
                  <span className='noEdit'>{queryData.Usuario.email}</span>
                </div>
              </div>
              <div className='row justify-content-between text-left'>
                <div className='form-group col-sm-6 flex-column d-flex'>
                  {' '}
                  <label className='form-control-label px-3'>
                    Identificación del usuario:
                  </label>
                  <span className='noEdit'>{queryData.Usuario.idUsuario}</span>
                </div>
                <div className='form-group col-sm-6 flex-column d-flex'>
                  {' '}
                  <label className='form-control-label px-3'>
                    Rol del usuario:
                  </label>{' '}
                  <span className='noEdit'> {queryData.Usuario.rol}</span>
                </div>
              </div>
              <div className='row justify-content-between text-left'>
                <div className='form-group col-12 flex-column d-flex'>
                  {' '}
                  <label className='form-control-label px-3'>
                    Estado del usuario:<span className='text-danger'> *</span>
                  </label>
                  <DropDown
                    label='seleccione el estado'
                    name='estado'
                    defaultValue={Enum_EstadoUsuario[queryData.Usuario.estado]}
                    required
                    options={
                      rol === 'Administrador'
                        ? Enum_EstadoUsuario
                        : ['Pendiente', 'Autorizado']
                    }
                  />
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
