/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
/* eslint-disable no-restricted-imports */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ButtonLoading from '../../../components/ButtonLoading';
import useFormData from '../../../hooks/useFormData';
import { ADD_AVANCE } from '../../../graphql/proyectos/mutations';

export default function AgregarAvance(props) {
  const { form, formData, updateFormData } = useFormData(null);
  const idEstudiante = props._id;
  const { _id } = useParams();
  const idProyecto = _id;

  const [
    EditarEstado,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_AVANCE);

  const submitForm = e => {
    e.preventDefault();
    delete formData.rol;
    const avance = formData;
    EditarEstado({
      variables: { idEstudiante, idProyecto, avance },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Avance agregado correctamente');
      setTimeout(() => {
        window.location.href = `/proyecto/${idProyecto}`;
      }, 5000);
    }
  }, [idProyecto, mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error agregando el avance');
      setTimeout(() => {
        window.location.href = `/proyecto/${idProyecto}`;
      }, 5000);
    }
  }, [idProyecto, mutationError]);

  return (
    <div className='FormCon'>
      <Link to='/proyectos/avances'>
        <FontAwesomeIcon icon={faArrowLeft} color='gray' />
      </Link>
      <div className='row d-flex justify-content-center'>
        <div className='col-xl-7 col-lg-8 col-md-9 col-11 text-center'>
          <h3>Agregar Avance</h3>

          <div className='card'>
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
                    Descripción del Avance:
                    <span className='text-danger'> *</span>
                  </label>
                  <textarea type='text' name='descripcion' required />{' '}
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
