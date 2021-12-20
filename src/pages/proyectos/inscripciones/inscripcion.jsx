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
import { INSCRIPCION } from '../../../graphql/proyectos/mutations';
import DropDown from '../../../components/Dropdown';

export default function Inscripcion(props) {
  const { form, formData, updateFormData } = useFormData(null);
  const idEstudiante = props.idUsuario;
  const { _id } = useParams();
  const idProyecto = _id;

  const [
    inscribirse,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(INSCRIPCION);

  const submitForm = e => {
    e.preventDefault();
    if (formData.respuesta === '0') {
      const inscripcion = { estudiante: idEstudiante };

      inscribirse({
        variables: { idProyecto, inscripcion },
      });
    } else {
      window.location.href = `/proyecto/${idProyecto}`;
    }
  };
  useEffect(() => {
    if (mutationData) {
      toast.success('Se realizó la inscripción correctamente');

      setTimeout(() => {
        window.location.href = `/proyecto/${idProyecto}`;
      }, 5000);
    }
  }, [idProyecto, mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error realizando la inscripción');
      setTimeout(() => {
        window.location.href = `/proyecto/${idProyecto}`;
      }, 5000);
    }
  }, [idProyecto, mutationError]);

  return (
    <div className='FormCon'>
      <Link to={`/proyecto/${idProyecto}`}>
        <FontAwesomeIcon icon={faArrowLeft} color='gray' />
      </Link>
      <div className='container-fluid px-1 py-5 mx-auto'>
        <div className='row d-flex justify-content-center'>
          <div className='col-xl-7 col-lg-8 col-md-9 col-11 text-center'>
            <h3>Inscribirse</h3>
            <div className='card'>
              <h5 className='text-center mb-4'>
                ¿Desea inscribirse al proyecto?
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
