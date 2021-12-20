/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
/* eslint-disable import/order */
/* eslint-disable no-restricted-imports */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import ButtonLoading from '../../../components/ButtonLoading';
import useFormData from '../../../hooks/useFormData';
import { GET_PROYECTO } from '../../../graphql/proyectos/queries';
import DropDown from '../../../components/Dropdown';
import { APROBAR } from '../../../graphql/proyectos/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AprobarProyecto(props) {
  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario = props._id;
  const { _id } = useParams();
  const idProyecto = _id;
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { idUsuario, idProyecto },
  });

  const [
    aprobarProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(APROBAR);

  const submitForm = e => {
    e.preventDefault();
    if (formData.respuesta === '0') {
      aprobarProyecto({
        variables: { idUsuario, idProyecto },
      });
    } else {
      window.location.href = `/proyectos/`;
    }
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto aprobado');
      setTimeout(() => {
        window.location.href = `/proyecto/${idProyecto}`;
      }, 5000);
    }
  }, [idProyecto, mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error aprobando el proyecto');
      setTimeout(() => {
        window.location.href = `/proyecto/${idProyecto}`;
      }, 5000);
    }

    if (queryError) {
      toast.error('Error consultando el proyecto');
    }
  }, [queryError, mutationError, idProyecto]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='FormCon'>
      <Link to='/proyectos/'>
        <FontAwesomeIcon icon={faArrowLeft} color='gray' />
      </Link>
      <div className='container-fluid px-1 py-5 mx-auto'>
        <div className='row d-flex justify-content-center'>
          <div className='col-xl-7 col-lg-8 col-md-9 col-11 text-center'>
            <h3>Aprobar Proyecto</h3>
            <div className='card'>
              <h5 className='text-center mb-4'>
                ¿Desea aprobar el proyecto {queryData.VerProyecto.nombre}?
              </h5>
              <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='form-card'
              >
                <div className='row justify-content-between text-left'>
                  <div className='form-group col-12 flex-column d-flex'>
                    {' '}
                    <label className='form-control-label px-3'>
                      <span className='text-danger'> *</span>
                    </label>
                    <DropDown
                      label='seleccione'
                      name='respuesta'
                      required
                      options={['Si', 'No']}
                    />
                  </div>
                </div>
                <div className='row justify-content-end'>
                  <div className='form-group col-sm-6'>
                    <ButtonLoading loading={mutationLoading} text='Confirmar' />{' '}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
